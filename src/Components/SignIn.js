import React from "react";

export default function SignIn(props) {
	if (!props.getToken()) return <div>Please sign in</div>;
	else return <div>{props.children}</div>;
}
