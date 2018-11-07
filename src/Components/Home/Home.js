import React from "react";
import List from "./List/List";

class Home extends React.Component {
	componentDidMount() {
		fetch("http://127.0.0.1:8080/api/BookList").then(res => {
			res.json().then(r => console.log(r));
		});
	}

	render() {
		return (
			<pre className="home">
				<List />
			</pre>
		);
	}
}

export default Home;
