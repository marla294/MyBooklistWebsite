import React from "react";
import { useEffect, useState } from "react";
import List from "./List/List";

function Home() {
	const [bookList, setBookList] = useState([]);

	useEffect(() => {
		fetch("http://127.0.0.1:8080/api/BookList").then(res => {
			res.json().then(r => setBookList(r));
		});
	}, []);

	return (
		<pre className="home">
			<List bookList={bookList} listTitle={"Want To Read"} />
		</pre>
	);
}

export default Home;
