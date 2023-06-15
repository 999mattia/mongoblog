import { deletePost } from "../utils/fetch";

export default function PostCard(props: any) {
	let detailLink = "/posts/" + props.post.id;
	let editLink = "/posts/" + props.post.id + "/edit";
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{props.post.title}</h5>
				<h6 className="card-subtitle mb-2 text-body-secondary">
					{props.post.author}
				</h6>
				<p className="card-text">{props.post.content}</p>
				<a
					href={detailLink}
					className="card-link"
				>
					Read more
				</a>
				<a
					href={editLink}
					className="card-link"
				>
					Edit
				</a>
				<a
					href="/"
					onClick={() => deletePost(props.post.id)}
					className="card-link"
				>
					Delete
				</a>
			</div>
		</div>
	);
}
