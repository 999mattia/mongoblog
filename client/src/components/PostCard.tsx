import { deletePost } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

export default function PostCard(props: any) {
	const navigate = useNavigate();
	return (
		<center
			className="container"
			onClick={() => navigate(`/posts/${props.post.id}`)}
		>
			<h5>{props.post.title}</h5>
			<h6>{props.post.author}</h6>
			<button
				className="btn"
				onClick={() => navigate(`/posts/${props.post.id}/edit`)}
			>
				Edit
			</button>
			<button
				className="btn"
				onClick={async () => {
					await deletePost(props.post.id);
					await props.load();
				}}
			>
				Delete
			</button>
		</center>
	);
}
