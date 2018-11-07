import React from "react";

class Home extends React.Component {
	componentDidMount() {
		fetch("http://127.0.0.1:8080/api/BookList").then(res => {
			res.json().then(r => console.log(r));
		});
	}

	render() {
		return (
			<div className="home">
				<p>Hi</p>
			</div>
		);
	}
}

export default Home;
