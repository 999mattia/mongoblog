import React, { useState } from "react";
import { createComment } from "./utils/fetch";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Comment } from "./utils/types";

export default function CreateComment() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [comment, setComment] = useState<Comment>({
		id: "",
		author: "",
		text: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setComment({
			...comment,
			[name]: value,
		});
	};

	async function handleSubmit() {
		await createComment(id!, comment);
		navigate(`/posts/${id}`);
	}

	return (
		<div>
			<span>Text</span>
			<input
				type="text"
				placeholder="Enter your text..."
				name="text"
				value={comment.text}
				onChange={handleChange}
			/>
			<span>Author</span>
			<input
				type="text"
				placeholder="Enter your username..."
				name="author"
				value={comment.author}
				onChange={handleChange}
			/>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}
