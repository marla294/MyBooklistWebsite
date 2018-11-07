import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";

const Router = props => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/Home" component={Home} />
		</Switch>
	</BrowserRouter>
);

export default Router;
