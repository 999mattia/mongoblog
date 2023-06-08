import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "./utils/types";
import { getPostById } from "./utils/fetch";

export default function Details() {
	const { id } = useParams();
	const [post, setPost] = useState<Post | null>(null);

	useEffect(() => {
		async function fetch() {
			const post = await getPostById(id!);
			setPost(post);
		}
		fetch();
	}, []);

	useEffect(() => {
		console.log(post);
	}, [post]);
	return (
		<>
			<h1>{post?.title}</h1>
			<h2>{post?.author}</h2>
			<p>{post?.content}</p>
			{post?.comments.map((comment) => {
				return (
					<>
						<h3>{comment.text}</h3>
						<h4>{comment.author}</h4>
					</>
				);
			})}
		</>
	);
}
