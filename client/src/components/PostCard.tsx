export default function PostCard(props: any) {
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{props.post.title}</h5>
				<h6 className="card-subtitle mb-2 text-body-secondary">
					{props.post.author}
				</h6>
				<p className="card-text">{props.post.content}</p>
				<a
					href="#"
					className="card-link"
				>
					Read more
				</a>
				<a
					href="#"
					className="card-link"
				>
					Edit
				</a>
			</div>
		</div>
	);
}
