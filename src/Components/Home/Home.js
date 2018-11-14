import React from "react";
import { useEffect, useState } from "react";
import List from "./List/List";

function renderLists(bookList, lists) {
	if (lists && bookList) {
		return <List bookList={bookList} listTitle={lists[0].Name} />;
	} else {
		return "Loading...";
	}
}

function setListMap(bookList, lists) {
	const listMap = new Map();

	if (bookList && lists) {
		bookList.forEach(book => {
			let bookArray = listMap.get(book.List.Id) || [];
			if (bookArray) {
				bookArray.push(book.Book);
			}
			listMap.set(book.List.Id, bookArray);
		});
	}

	return listMap;
}

function Home() {
	const url = "http://127.0.0.1:8080/api/";
	// let listMap = new Map();
	const [bookList, setBookList] = useState(null);
	const [lists, setLists] = useState(null);

	useEffect(() => {
		getBookList();
		getLists();
	}, []);

	const getBookList = async () => {
		let result = await fetch(url + "BookList");
		let r = await result.json();
		setBookList(r);
	};

	const getLists = async () => {
		let result = await fetch(url + "Lists");
		let r = await result.json();
		setLists(r);
	};

	return <pre className="home">{renderLists(bookList, lists)}</pre>;
}

export default Home;
