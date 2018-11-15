import React from "react";
import { useEffect, useState } from "react";
import List from "./List/List";

export default function Home() {
	const url = "http://127.0.0.1:8080/api/";
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

function renderLists(bookList, lists) {
	const listMap = createListMap(bookList);

	if (listMap.size > 0 && lists) {
		let arr = [];
		listMap.forEach((value, key) => {
			let title;
			lists.forEach(list => {
				if (list.Id == key) {
					title = list.Name;
				}
			});
			arr.push(<List key={key} bookList={value} listTitle={title} />);
		});
		return arr;
	} else {
		return "Loading...";
	}
}

function createListMap(bookList) {
	const listMap = new Map();

	if (bookList) {
		bookList.forEach(book => {
			let bookArray = listMap.get(book.ListId) || [];

			if (bookArray) {
				bookArray.push(book.Book);
			}

			listMap.set(book.ListId, bookArray);
		});
	}

	return listMap;
}
