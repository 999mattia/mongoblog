import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComment } from "./utils/fetch";
import { Comment } from "./utils/types";

export default function CommentDetails() {
	const [comment, setComment] = useState<Comment | null>(null);
	const params = useParams();

	useEffect(() => {
		load();
	}, []);

	async function load() {
		const comment = await getComment(params.id!, params.commentId!);
		setComment(comment);
	}

	return (
		<>
			<p>{comment?.text}</p>
			<p>{comment?.author}</p>
			<p>{comment?.additional}</p>
		</>
	);
}
