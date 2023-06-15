import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "./utils/types";
import { getPostById, deleteComment } from "./utils/fetch";
import { useNavigate } from "react-router-dom";

export default function Details() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [post, setPost] = useState<Post | null>(null);

	const url = `/posts/${id}`;

	useEffect(() => {
		load();
	}, []);

	async function load() {
		const post = await getPostById(id!);
		setPost(post);
	}

	async function handleDeleteComment(commentId: string) {
		console.log(1);
		await deleteComment(id!, commentId);
		console.log(2);
		await load();
	}

	return (
		<>
			<h1>{post?.title}</h1>
			<h2>{post?.author}</h2>
			<p>{post?.content}</p>

			{post?.comments?.map((comment) => {
				return (
					<div key={comment.id}>
						<h3>{comment.text}</h3>
						<h4>{comment.author}</h4>
						<button
							onClick={async () =>
								await handleDeleteComment(comment.id)
							}
						>
							Delete
						</button>
					</div>
				);
			})}
		</>
	);
}
