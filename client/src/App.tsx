import { useState, useEffect } from "react";
import { getAllPosts } from "./utils/fetch";
import { Post } from "./utils/types";
import PostCard from "./components/PostCard";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
	const navigate = useNavigate();
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		load();
	}, []);

	async function load() {
		const posts = await getAllPosts();
		setPosts(posts);
	}

	return (
		<>
			<center>
				<button
					className="btn"
					onClick={() => navigate("/create")}
				>
					Create Post
				</button>
			</center>
			<div className="postsContainer">
				{posts.map((post) => {
					return (
						<PostCard
							post={post}
							load={load}
							key={post.id}
						></PostCard>
					);
				})}
			</div>
		</>
	);
}

export default App;
