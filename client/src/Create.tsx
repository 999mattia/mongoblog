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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setPost({
			...post,
			[name]: value,
		});
		console.log(post);
	};

	async function handleSubmit() {
		await createPost(post);
		navigate("/");
	}

	return (
		<div className="input-group mb-3">
			<span
				className="input-group-text"
				id="basic-addon1"
			>
				Title
			</span>
			<input
				type="text"
				className="form-control"
				placeholder="Enter your title..."
				name="title"
				value={post.title}
				onChange={handleChange}
			/>
			<span
				className="input-group-text"
				id="basic-addon1"
			>
				Content
			</span>
			<input
				type="text"
				className="form-control"
				placeholder="Enter your content..."
				name="content"
				value={post.content}
				onChange={handleChange}
			/>
			<span
				className="input-group-text"
				id="basic-addon1"
			>
				Author
			</span>
			<input
				type="text"
				className="form-control"
				placeholder="Enter your username..."
				name="author"
				value={post.author}
				onChange={handleChange}
			/>
			<button
				type="submit"
				className="btn btn-primary"
				onClick={handleSubmit}
			>
				Submit
			</button>
		</div>
	);
}
