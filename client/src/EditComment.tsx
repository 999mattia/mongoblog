import React, { useEffect, useState } from "react";
import { getComment, updateComment } from "./utils/fetch";
import { useParams } from "react-router-dom";
import { Comment } from "./utils/types";
import { useNavigate } from "react-router-dom";

export default function EditComment() {
	const navigate = useNavigate();
	const params = useParams();
	const [comment, setComment] = useState<Comment>({
		id: "",
		author: "",
		text: "",
	});

	async function load() {
		setComment(await getComment(params.id!, params.commentId!));
	}

	useEffect(() => {
		load();
	}, []);

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
		await updateComment(params.id!, params.commentId!, comment);
		navigate("/posts/" + params.id);
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
