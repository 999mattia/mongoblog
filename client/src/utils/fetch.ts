import { Post, Comment } from "./types";

export async function getAllPosts(): Promise<Post[]> {
	const response = await fetch("https://mongoblog-api.onrender.com/posts");
	return response.json();
}

export async function getPostById(id: string): Promise<Post> {
	const response = await fetch(
		`https://mongoblog-api.onrender.com/posts/${id}`
	);
	return response.json();
}

export async function createPost(post: Post): Promise<void> {
	await fetch("https://mongoblog-api.onrender.com/posts", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(post),
	});
}

export async function deletePost(id: string): Promise<void> {
	await fetch(`https://mongoblog-api.onrender.com/posts/${id}`, {
		method: "DELETE",
	});
}

export async function updatePost(post: Post): Promise<void> {
	await fetch(`https://mongoblog-api.onrender.com/posts/${post.id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(post),
	});
}

export async function createComment(
	id: string,
	comment: Comment
): Promise<void> {
	await fetch(`https://mongoblog-api.onrender.com/posts/${id}/comments`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(comment),
	});
}

export async function deleteComment(
	postId: string,
	commentId: string
): Promise<void> {
	await fetch(
		`https://mongoblog-api.onrender.com/posts/${postId}/comments/${commentId}`,
		{
			method: "DELETE",
		}
	);
}

export async function getComment(
	postId: string,
	commentId: string
): Promise<Comment> {
	const response = await fetch(
		`https://mongoblog-api.onrender.com/posts/${postId}/comments/${commentId}`
	);
	return response.json();
}

export async function updateComment(
	postId: string,
	commentId: string,
	comment: Comment
) {
	await fetch(
		`https://mongoblog-api.onrender.com/posts/${postId}/comments/${commentId}`,
		{
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(comment),
		}
	);
}
