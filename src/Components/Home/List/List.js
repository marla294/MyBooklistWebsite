import React from "react";
import Book from "./Book/Book";

class List extends React.Component {
	render() {
		return (
			<pre className="list">
				<Book />
			</pre>
		);
	}
}

export default List;
