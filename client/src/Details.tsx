import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "./utils/types";
import { getPostById, deleteComment } from "./utils/fetch";
import { useNavigate } from "react-router-dom";

export default function Details() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState<Post | null>(null);

	useEffect(() => {
		load();
	}, []);

	async function load() {
		const post = await getPostById(id!);
		setPost(post);
	}

	async function handleDeleteComment(commentId: string) {
		await deleteComment(id!, commentId);
		await load();
	}

	return (
		<>
			<h1>{post?.title}</h1>
			<h2>{post?.author}</h2>
			<p>{post?.content}</p>

			<button
				onClick={() => navigate("/posts/" + id + "/comments/create")}
			>
				Create Comment
			</button>

			{post?.comments?.map((comment) => {
				return (
					<div key={comment.id}>
						<h3>{comment.text}</h3>
						<h4>{comment.author}</h4>
						<button
							onClick={async () => {
								navigate(
									"/posts/" +
										id +
										"/comments/" +
										comment.id +
										"/edit"
								);
							}}
						>
							Edit
						</button>
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
