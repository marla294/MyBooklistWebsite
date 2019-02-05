import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./GlobalStyles";
import List from "./List";
import TabBar from "./TabBar";
import SignInPage from "./SignInPage";
import EditUserInfo from "./EditUserInfo";

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
	cursor: pointer;
	:hover {
		color: ${props => props.theme.darkorange};
	}
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

export default function Home(props) {
	// const url = "http://127.0.0.1:8080/api/";
	const url = "https://www.axequest.com/booklist/api/";
	const [bookList, setBookList] = useState(null);
	const [lists, setLists] = useState(null);
	const [selectedList, setSelectedList] = useState(0);
	const [pageLoaded, setPageLoaded] = useState(false);
	const [userName, setUserName] = useState("");
	const [showModal, setShowModal] = useState(false);

	// Only runs on first time page load
	// If the user is already signed in, load all their stuff
	// If not then, sign them out
	useEffect(async () => {
		if (await checkUserFn()) {
			await setFirstNameByUserToken();
			const userLists = await refreshBooklist();
			setSelectedList(getFirstListId(userLists));
		}
		// For display purposes - will show a Loading status if the page isn't loaded
		setPageLoaded(true);
	}, []);

	// Check to make sure the user on the token exists in the database
	// If not then sign them out (aka delete the cookie)
	// Returns null if user is invalid, userToken if valid
	const checkUserFn = async () => {
		// 1. Check if the userToken is in the db (if it isn't you'll get null back)
		const user = await fetchGetUserFromCookie();

		// 2. If the user doesn't exist in the db, user === null so sign them out
		if (!user) {
			signOut();
		}

		// 3. Return the userToken (or null if token is invalid)
		return user ? user.Token : null;
	};

	// returns the userLists in case you need them
	const refreshBooklist = async () => {
		let userLists = await fetchGetListsByUser();

		// If lists couldn't be fetched then just return
		if (userLists === null) {
			return null;
		}

		// If the user has no lists, create one and add it to the user lists
		if (userLists.length === 0) {
			const listId = await fetchCreateNewList("Click to Rename Me");
			userLists = await fetchGetListsByUser();
			setSelectedList(parseInt(listId));
		}

		setLists(userLists);
		await getBookList();
		return userLists;
	};

	const getBookList = async () => {
		await fetching(async () => {
			const result = await fetch(url + "BookList");
			const r = await result.json();
			setBookList(r);
		});
	};

	// Mapping the user's lists to books
	const createListMap = () => {
		const listMap = new Map();

		if (bookList) {
			bookList.forEach(book => {
				const books = listMap.get(book.ListId) || [];
				books.push(book.Book);
				listMap.set(book.ListId, books);
			});
		}

		return listMap;
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
	// Sign in/out methods
	// *******

	const signIn = async userToken => {
		addTokenToCookie(userToken);

		await setFirstNameByUserToken(userToken);

		const userLists = await refreshBooklist();
		setSelectedList(getFirstListId(userLists));
	};

	const signOut = () => {
		removeUserTokenFromCookie();
	};

	// *******
	// List Methods
	// *******

	// Handles all actions around creating a new list
	const createNewList = async name => {
		const listId = await fetchCreateNewList(name);
		setSelectedList(listId);
		await refreshBooklist();
		// return the listId in case this is the user's first list
		return listId;
	};

	// Handles all actions around updating a list name
	const updateListName = async (listId, listName) => {
		await fetchUpdateListName(listId, listName);
		await refreshBooklist();
	};

	// Handles all actions around deleting lists
	const deleteList = async listId => {
		await fetchDeleteList(listId);
		// since the list is gone, set selectedList to a new list
		setSelectedList(getDifferentListId(listId));
		await refreshBooklist();
	};

	// Creates a new list on the db for a user
	// Returns the listId
	const fetchCreateNewList = async name => {
		return await fetching(async userToken => {
			const res = await fetch(url + "Lists", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, userToken })
			});
			return await res.json();
		});
	};

	// Returns the lists on the db per user
	const fetchGetListsByUser = async () => {
		return await fetching(async userToken => {
			const result = await fetch(url + `Lists/${userToken}`);
			return await result.json();
		});
	};

	const fetchUpdateListName = async (listId, listName) => {
		await fetching(async () => {
			await fetch(url + `Lists/${listId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: listName })
			});
		});
	};

	const fetchDeleteList = async listId => {
		await fetching(async () => {
			await fetch(url + `Lists/${listId}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
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
		const bookId = await fetchCreateNewBook(title.trim(), author.trim());
		await fetchAddBookToList(bookId, listId);
		await refreshBooklist();
	};

	const deleteBook = async (bookId, listId) => {
		await fetchDeleteBookFromList(bookId, listId);
		await fetchDeleteBook(bookId);
		await refreshBooklist();
	};

	// Creates a new book in the Books table on the database
	// Returns id of added book
	const fetchCreateNewBook = async (title, author) => {
		return await fetching(async () => {
			const res = await fetch(url + "Books", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, author })
			});

			const bookId = await res.json();
			return parseInt(bookId);
		});
	};

	// Adds a book to a list (by adding to the booklist table on the db)
	const fetchAddBookToList = async (bookId, listId) => {
		await fetching(async () => {
			await fetch(url + "BookList", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ bookId, listId })
			});
		});
	};

	// Deletes a book from the Books table on the db
	const fetchDeleteBook = async bookId => {
		await fetching(async () => {
			await fetch(url + `Books/${bookId}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		});
	};

	// Deletes a book from a list (by deleting from the booklist table on the db)
	const fetchDeleteBookFromList = async (bookId, listId) => {
		await fetching(async () => {
			const bookListId = bookList.find(item => {
				return item.Book.Id === bookId && item.ListId === listId;
			}).Id;

			await fetch(url + `BookList/${bookListId}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		});
	};

	// *******
	// User methods
	// *******

	const setFirstNameByUserToken = async userToken => {
		const user = await fetchGetUserFromCookie();

		setUserName(user.Name);
	};

	// gets the user from the database that uses this token
	// returns the user
	// if the result from the db is null, sign the user out and return null
	const fetchGetUserFromCookie = async () => {
		const userToken = getUserTokenFromCookie();

		if (userToken) {
			const result = await fetch(url + `Users/${userToken}`);
			const user = await result.json();

			if (!user) {
				signOut();
				return null;
			} else {
				return user;
			}
		}
	};

	// creates a new user in the database
	// returns the new userToken
	const fetchCreateNewUser = async (name, username, password) => {
		return await fetchPostUser(name, username, password);
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

	// Updates the user name on the db
	const fetchUpdateFirstName = async firstName => {
		await fetching(async userToken => {
			await fetch(url + `Users/${userToken}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: firstName })
			});
		});
	};

	// *******
	// General Fetching methods
	// *******

	const fetching = async fn => {
		const userToken = await checkUserFn();
		return userToken ? await fn(userToken) : null;
	};

	// *******
	// Render
	// *******

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
					<Header onClick={() => setShowModal(true)}>
						{userName !== "" ? `${userName}'s Books!` : "My Books!"}
					</Header>
					<TabBar
						createNewList={createNewList}
						lists={lists || []}
						selectedList={selectedList}
						setSelected={setSelectedList}
						updateListName={updateListName}
						deleteList={deleteList}
						getUserTokenFromCookie={getUserTokenFromCookie}
					/>
					<List
						key={selectedList}
						id={selectedList}
						books={createListMap().get(selectedList) || []}
						createNewBook={createNewBook}
						deleteBook={deleteBook}
						pageLoaded={pageLoaded}
					/>
					<EditUserInfo
						show={showModal}
						close={() => setShowModal(false)}
						updateFirstName={fetchUpdateFirstName}
						getUserTokenFromCookie={getUserTokenFromCookie}
						fetchGetUserByUserToken={fetchGetUserFromCookie}
					/>
					<GlobalStyle />
				</HomeWrapper>
			</SignInPage>
		</ThemeProvider>
	);
}
