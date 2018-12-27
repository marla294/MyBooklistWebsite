import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";
import Home from "./Home";

const Router = props => (
	<BrowserRouter>
		<Switch>
			<Route
				exact
				path="/"
				render={() => <Home cookies={props.cookies} />}
			/>
			<Route
				exact
				path="/Home"
				render={() => <Home cookies={props.cookies} />}
			/>
		</Switch>
	</BrowserRouter>
);

export default withCookies(Router);
