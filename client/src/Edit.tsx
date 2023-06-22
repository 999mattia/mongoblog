import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "./utils/types";
import { getPostById } from "./utils/fetch";
import { updatePost } from "./utils/fetch";
import { useNavigate } from "react-router-dom";

const defaultModel: Post = {
	id: "",
	title: "",
	author: "",
	content: "",
	comments: [],
};

export default function Edit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [post, setPost] = useState<Post>(defaultModel);

	useEffect(() => {
		async function fetch() {
			const post = await getPostById(id!);
			setPost(post);
		}
		fetch();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setPost({
			...post,
			[name]: value,
		});
	};

	async function handleSubmit() {
		if (post.author === "" || post.title === "" || post.content === ""){
			alert("Please fill out all fields!")
			return;
		}
		else {
			await updatePost(post);
			navigate("/posts/" + id);
		}
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
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}
