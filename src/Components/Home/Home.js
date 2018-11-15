import React from "react";
import { useEffect, useState } from "react";
import List from "./List/List";
import styled from "styled-components";

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

	return <pre className="home">{loadLists(bookList, lists)}</pre>;
}

function loadLists(bookList, lists) {
	if (!lists || !bookList) {
		return "Loading...";
	}

	const listMap = createListMap(bookList);

	if (listMap && listMap.size > 0) {
		return renderLists(listMap, lists);
	} else {
		return "Create a new list to get started!";
	}
}

function createListMap(bookList) {
	const listMap = new Map();

	if (bookList) {
		bookList.forEach(book => {
			const bookArray = listMap.get(book.ListId) || [];

			if (bookArray) {
				bookArray.push(book.Book);
			}

			listMap.set(book.ListId, bookArray);
		});
	}

	return listMap;
}

function renderLists(listMap, lists) {
	const renderArray = [];

	listMap.forEach((value, key) => {
		const listName = getListNameById(lists, key);
		renderArray.push(
			<List key={key} bookList={value} listTitle={listName || ""} />
		);
	});

	return renderArray;
}

function getListNameById(lists, id) {
	return lists.find(list => list.Id === id).Name;
}
