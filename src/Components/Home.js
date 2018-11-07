import React from "react";
import Book from "./Book";

class Home extends React.Component {
	componentDidMount() {
		fetch("http://127.0.0.1:8080/api/BookList").then(res => {
			res.json().then(r => console.log(r));
		});
	}

	render() {
		return (
			<div className="home">
				<Book />
			</div>
		);
	}
}

export default Home;
