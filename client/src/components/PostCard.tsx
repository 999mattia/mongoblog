import { deletePost } from "../utils/fetch";

export default function PostCard(props: any) {
	let detailLink = "/posts/" + props.post.id;
	let editLink = "/posts/" + props.post.id + "/edit";
	return (
		<div>
			<div>
				<h5>{props.post.title}</h5>
				<h6>{props.post.author}</h6>
				<p>{props.post.content}</p>
				<a href={detailLink}>Read more</a>
				<a href={editLink}>Edit</a>
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
