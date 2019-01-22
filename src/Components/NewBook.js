import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

NewBook.propTypes = {
	displayNewBook: PropTypes.bool.isRequired,
	setDisplayNewBook: PropTypes.func.isRequired,
	createNewBook: PropTypes.func.isRequired,
	listId: PropTypes.number.isRequired
};

const BookWrapper = styled.div`
	padding: ${props => props.theme.S05};

	background: ${props => props.theme.yellow};

	border: 0.3rem solid ${props => props.theme.orange};

	display: ${props => (props.displayNewBook ? "grid" : "none")};
	grid-template-columns: 5fr 1fr;
`;

const TitleAuthorWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: ${props => props.theme.S02};

	input {
		background: ${props => props.theme.yellow};

		border: 1px solid ${props => props.theme.orange};
		outline: none;
	}

	input::placeholder {
		color: ${props => props.theme.orange};
		font-style: italic;
	}

	@media only screen and (max-width: 400px) {
		max-width: 220px;
	}
`;

const Title = styled.input`
	border-radius: 0;

	color: ${props => props.theme.darkorange};

	font-size: ${props => props.theme.F04};
	font-weight: 900;
`;

const Author = styled.input`
	border-radius: 0;

	color: ${props => props.theme.orange};

	font-size: ${props => props.theme.F03};
	font-weight: 900;
`;

const SubmitForm = styled.button`
	color: ${props => props.theme.yellow};
	background-color: ${props => props.theme.darkorange};

	border: 4px solid ${props => props.theme.darkorange};

	font-size: ${props => props.theme.F04};
	font-weight: 900;

	-webkit-transition: color 0.2s; /* Safari */
	transition: color 0.2s;
	-webkit-transition: background-color 0.2s; /* Safari */
	transition: background-color 0.2s;

	:hover {
		color: ${props => props.theme.darkorange};
		background-color: ${props => props.theme.yellow};
	}
`;

const CloseForm = styled.button`
	-webkit-appearance: none;

	height: 19px;
	width: 19px;

	padding: 0;
	margin: 0;

	color: ${props => props.theme.darkorange};
	background-color: ${props => props.theme.yellow};

	border: none;
	outline: none;

	font-size: ${props => props.theme.F08};
	line-height: 0;

	align-self: start;
	justify-self: end;
`;

const ErrorField = styled.div`
	justify-self: center;

	display: ${props => (props.displayError ? "grid" : "none")};

	color: red;

	font-size: ${props => props.theme.F03};
	font-weight: 900;
`;

export default function NewBook(props) {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [displayError, setDisplayError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = e => {
		const { name, value } = e.target;

		// Want to keep the allowed title and author under 120 characters
		const slicedValue = value.slice(0, 120);

		if (name === "title") setTitle(slicedValue);
		if (name === "author") setAuthor(slicedValue);
	};

	return (
		<BookWrapper displayNewBook={props.displayNewBook}>
			<form
				onSubmit={async e => {
					e.preventDefault();

					const authorAllowedRegEx = /^[a-zA-Z\s]*$/g;

					if (!authorAllowedRegEx.test(author)) {
						console.log("not allowed");
					} else {
						await props.createNewBook(
							props.listId,
							title.trim(),
							author.trim()
						);
						props.setDisplayNewBook(false);
						setTitle("");
						setAuthor("");
					}
				}}
			>
				<TitleAuthorWrapper>
					<Title
						type="text"
						id="title"
						name="title"
						required
						placeholder="Title"
						value={title}
						onChange={handleChange}
					/>
					<Author
						type="text"
						id="author"
						name="author"
						required
						placeholder="Author"
						value={author}
						onChange={handleChange}
					/>
					<SubmitForm type="submit">Submit</SubmitForm>
					<ErrorField displayError={displayError}>
						{errorMessage}
					</ErrorField>
				</TitleAuthorWrapper>
			</form>
			<CloseForm onClick={() => props.setDisplayNewBook(false)}>
				&times;
			</CloseForm>
		</BookWrapper>
	);
}
