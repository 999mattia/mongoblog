import React, { useState } from "react";
import { Post } from "./utils/types";
import { createPost } from "./utils/fetch";
import { useNavigate } from "react-router-dom";

export default function Create() {
	const navigate = useNavigate();
	const [post, setPost] = useState<Post>({
		id: "",
		title: "",
		content: "",
		author: "",
		comments: [],
	});
	const [additionalName, setAdditionalName] = useState<string>("");
	const [additionalValue, setAdditionalValue] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setPost({
			...post,
			[name]: value,
		});
	};

	const handleAdditionalNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const target = e.target;
		const value = target.value;
		setAdditionalName(value);
		setPost({
			...post,
			additional: additionalName + ":" + additionalValue,
		});
	};

	const handleAdditionalvalueChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const target = e.target;
		const value = target.value;
		setAdditionalValue(value);
		setPost({
			...post,
			additional: additionalName + ":" + additionalValue,
		});
	};

	async function handleSubmit() {
		await createPost(post);
		navigate("/");
	}

	return (
		<div>
			<span>Title</span>
			<input
				type="text"
				placeholder="Enter your title..."
				name="title"
				value={post.title}
				onChange={handleChange}
			/>
			<span>Content</span>
			<input
				type="text"
				placeholder="Enter your content..."
				name="content"
				value={post.content}
				onChange={handleChange}
			/>
			<span>Author</span>
			<input
				type="text"
				placeholder="Enter your username..."
				name="author"
				value={post.author}
				onChange={handleChange}
			/>
			<span>Additional Info</span>
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
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}
