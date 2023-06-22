import React, { useState } from "react";
import { createComment } from "./utils/fetch";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Comment } from "./utils/types";
import "./Create.css"

export default function CreateComment() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [comment, setComment] = useState<Comment>({
		id: "",
		author: "",
		text: "",
	});
	const [additionalName, setAdditionalName] = useState<string>("");
	const [additionalValue, setAdditionalValue] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setComment({
			...comment,
			[name]: value,
		});
	};

	const handleAdditionalNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const target = e.target;
		const value = target.value;
		setAdditionalName(value);
		setComment({
			...comment,
			additional: additionalName + ": " + additionalValue,
		});
	};

	const handleAdditionalvalueChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const target = e.target;
		const value = target.value;
		setAdditionalValue(value);
		setComment({
			...comment,
			additional: additionalName + ": " + additionalValue,
		});
	};

	async function handleSubmit() {
		await createComment(id!, comment);
		navigate(`/posts/${id}`);
	}

	return (
		<div className="containerCreateForm">
			<div>
				<span>Text</span>
				<input
					type="text"
					placeholder="Enter your text..."
					name="text"
					value={comment.text}
					onChange={handleChange}
				/>
			</div>
			
			<div>
				<span>Author</span>
				<input
					type="text"
					placeholder="Enter your username..."
					name="author"
					value={comment.author}
					onChange={handleChange}
				/>{" "}
			</div>
			
			<div>
				<span>Additional Info</span><br/>
				<input
					type="text"
					placeholder=""
					name="author"
					value={additionalName}
					onChange={handleAdditionalNameChange}
				/>
				<input
					type="text"
					placeholder=""
					name="author"
					value={additionalValue}
					onChange={handleAdditionalvalueChange}
				/>
			</div>
			
			<button className="buttonForm" onClick={handleSubmit}>Submit</button>
		</div>
	);
}
