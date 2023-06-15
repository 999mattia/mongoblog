import { deletePost } from "../utils/fetch";
import { useNavigate } from "react-router-dom";

export default function PostCard(props: any) {
	const navigate = useNavigate();
	return (
		<div>
			<div>
				<h5>{props.post.title}</h5>
				<h6>{props.post.author}</h6>
				<p>{props.post.content}</p>
				<button onClick={() => navigate(`/posts/${props.post.id}`)}>
					Read more
				</button>
				<button
					onClick={() => navigate(`/posts/${props.post.id}/edit`)}
				>
					Edit
				</button>
				<button
					onClick={async () => {
						await deletePost(props.post.id);
						await props.load();
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
