import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./GlobalStyles";
import List, { ListWrapper } from "./List";
import TabBar from "./TabBar";
import SignInPage from "./SignInPage";

export const HomeWrapper = styled.div`
	display: grid;
`;

export const Header = styled.h1`
	display: grid;
	align-items: center;
	justify-items: center;

	padding: ${props => props.theme.S05} 0;

	color: ${props => props.theme.orange};

	font-size: ${props => props.theme.F09};

	cursor: default;
`;

const LogOut = styled.button`
	width: 100px;

	margin: 0;
	padding: 0;

	justify-self: end;

	background: none;
	color: ${props => props.theme.gray};

	border: none;

	font-size: ${props => props.theme.F04};
	font-weight: 900;

	:hover {
		color: ${props => props.theme.orange};
	}
`;

const Loading = styled.h2`
	color: ${props => props.theme.orange};
`;

export default function Home(props) {
	// const url = "http://127.0.0.1:8080/api/";
	const url = "https://www.axequest.com/booklist/api/";
	const [bookList, setBookList] = useState(null);
	const [lists, setLists] = useState(null);
	const [selectedList, setSelected] = useState(null);
	const [pageLoaded, setPageLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

	// Only runs if the user is logged in
	useEffect(async () => {
		const userToken = getUserTokenFromCookie();
		if (userToken) {
			await setCurrentUserByUserToken(userToken);
			const userLists = await refreshBooklist(userToken);
			setSelected(getFirstListId(userLists));
		}
		setPageLoaded(true);
	}, []);

	// returns the userLists in case you need them
	const refreshBooklist = async userToken => {
		let userLists = await fetchGetListsByUser(userToken);

		// If the user has no lists, create one and add it to the user lists
		if (userLists.length === 0) {
			const listId = await fetchCreateNewList(
				"Click to Rename Me",
				userToken
			);
			userLists = await fetchGetListsByUser(userToken);
			setSelected(parseInt(listId));
		}

		setLists(userLists);
		await getBookList();
		return userLists;
	};

	const getBookList = async () => {
		const result = await fetch(url + "BookList");
		const r = await result.json();
		setBookList(r);
	};

	// *******
	// List Methods
	// *******

	// Handles all actions around creating a new list
	const createNewList = async (name, userToken) => {
		const listId = await fetchCreateNewList(name, userToken);
		// set the selected list to the newly created list
		setSelected(parseInt(listId));
		await refreshBooklist(currentUser.Token);
		// return the listId in case this is the user's first list
		return parseInt(listId);
	};

	// Handles all actions around updating a list name
	const updateListName = async (listId, listName) => {
		await fetchUpdateListName(listId, listName);
		await refreshBooklist(currentUser.Token);
	};

	// Handles all actions around deleting lists
	const deleteList = async listId => {
		await fetchDeleteList(listId);
		// since the list is gone, set selectedList to a new list
		setSelected(getDifferentListId(listId));
		await refreshBooklist(currentUser.Token);
	};

	// Creates a new list on the db for a user
	// Returns the listId
	const fetchCreateNewList = async (name, userToken) => {
		const res = await fetch(url + "Lists", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, userToken })
		});

		return await res.json();
	};

	// Gets the lists on the db per user
	// Returns the lists collected
	const fetchGetListsByUser = async userToken => {
		const result = await fetch(url + `Lists/${userToken}`);
		return await result.json();
	};

	// Updates the list name on the db
	const fetchUpdateListName = async (listId, listName) => {
		await fetch(url + `Lists/${listId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: listName })
		});
	};

	// Deletes a list on the db
	const fetchDeleteList = async listId => {
		await fetch(url + `Lists/${listId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		});
	};

	const getFirstListId = userLists => {
		if (userLists && userLists[0]) return userLists[0].Id;
		else return null;
	};

	// Gets a different list id close to the given one
	// Use for deleting lists
	const getDifferentListId = listId => {
		const index = lists.findIndex(list => list.Id === listId);
		if (lists.length <= 1) return null;
		if (index === lists.length - 1) return lists[index - 1].Id;
		return lists[index + 1].Id;
	};

	// *******
	// Book Methods
	// *******

	const createNewBook = async (listId, title, author) => {
		// First create the new book in the database
		const bookId = await fetchCreateNewBook(title, author);
		// Then add the new book to the list
		await fetchAddBookToList(bookId, listId);
		await refreshBooklist(currentUser.Token);
	};

	const deleteBook = async (bookId, listId) => {
		// First delete the book from the list
		await fetchDeleteBookFromList(bookId, listId);
		// Then delete the book from the books table
		await fetchDeleteBook(bookId);
		await refreshBooklist(currentUser.Token);
	};

	// Creates a new book in the Books table on the database
	// Returns id of added book
	const fetchCreateNewBook = async (title, author) => {
		const res = await fetch(url + "Books", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, author })
		});

		const bookId = await res.json();
		return parseInt(bookId);
	};

	// Adds a book to a list (by adding to the booklist table on the db)
	const fetchAddBookToList = async (bookId, listId) => {
		await fetch(url + "BookList", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ bookId, listId })
		});
	};

	// Deletes a book from the Books table on the db
	const fetchDeleteBook = async bookId => {
		await fetch(url + `Books/${bookId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		});
	};

	// Deletes a book from a list (by deleting from the booklist table on the db)
	const fetchDeleteBookFromList = async (bookId, listId) => {
		// Get the bookListId to delete
		const bookListId = bookList.find(item => {
			return item.Book.Id === bookId && item.ListId === listId;
		}).Id;

		await fetch(url + `BookList/${bookListId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		});
	};

	// *******
	// Sign in/out methods
	// *******

	const signIn = async userToken => {
		// Add userToken to the cookie
		addTokenToCookie(userToken);

		// Set the current user to the signed-in user
		await setCurrentUserByUserToken(userToken);

		// Get the site displaying correctly
		const userLists = await refreshBooklist(userToken);
		setSelected(getFirstListId(userLists));
	};

	const signOut = () => {
		// Remove the token cookie, which will sign the user out
		removeUserTokenFromCookie();

		// Reset the app state
		setCurrentUser(null);
		setSelected(null);
	};

	// *******
	// Cookie methods
	// *******

	const addTokenToCookie = token => {
		props.cookies.set("token", token, {
			maxAge: 60 * 60 * 24 * 365 // one year cookie
		});
	};

	const getUserTokenFromCookie = () => {
		return props.cookies.get("token");
	};

	const removeUserTokenFromCookie = () => {
		props.cookies.remove("token");
	};

	// *******
	// User methods
	// *******

	const setCurrentUserByUserToken = async userToken => {
		const user = await fetchGetUserByUserToken(userToken);
		setCurrentUser(user);
	};

	// creates a new user in the database
	// returns the new userToken
	const fetchCreateNewUser = async (name, username, password) => {
		return await fetchPostUser(name, username, password);
	};

	// gets the user from the database that uses this token
	// returns the user
	const fetchGetUserByUserToken = async userToken => {
		const result = await fetch(url + `Users/${userToken}`);
		return await result.json();
	};

	// validates whether the user is valid or not on the database
	// returns the userToken as a string if it is found, null if not found
	const fetchValidateUser = async (username, password) => {
		return await fetchPostUser("", username, password);
	};

	// does the fetch Post action on the server for the above 2 methods,
	// fetchCreateNewUser and fetchValidateUser
	const fetchPostUser = async (name, username, password) => {
		const result = await fetch(url + "Users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name,
				username: username.toLowerCase(),
				password
			})
		});

		return await result.json();
	};

	return (
		<ThemeProvider theme={theme}>
			<SignInPage
				getToken={getUserTokenFromCookie}
				addNewUser={fetchCreateNewUser}
				signIn={signIn}
				validateUser={fetchValidateUser}
			>
				<HomeWrapper>
					<LogOut onClick={signOut}>Log out</LogOut>
					<Header>
						{currentUser
							? `${currentUser.Name}'s Books!`
							: "My Books!"}
					</Header>
					<TabBar
						createNewList={createNewList}
						lists={lists || []}
						selectedList={selectedList || 0}
						setSelected={setSelected}
						updateListName={updateListName}
						deleteList={deleteList}
						currentUser={currentUser}
						fetchCreateNewList={fetchCreateNewList}
					/>
					{loadLists()}
					<GlobalStyle />
				</HomeWrapper>
			</SignInPage>
		</ThemeProvider>
	);

	function loadLists() {
		if (pageLoaded) {
			return renderList();
		} else {
			return (
				<ListWrapper>
					<Loading>Loading...</Loading>
				</ListWrapper>
			);
		}
	}

	function createListMap() {
		const listMap = new Map();

		if (bookList) {
			bookList.forEach(book => {
				const books = listMap.get(book.ListId) || [];
				books.push(book.Book);
				listMap.set(book.ListId, books);
			});
		}

		return listMap;
	}

	function renderList() {
		if (selectedList) {
			const books = createListMap().get(selectedList);

			return (
				<List
					key={selectedList}
					id={selectedList}
					books={books || []}
					createNewBook={createNewBook}
					deleteBook={deleteBook}
				/>
			);
		}
	}
}
