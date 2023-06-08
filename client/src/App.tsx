import { useState, useEffect } from "react";
import { getAllPosts } from "./utils/fetch";
import { Post } from "./utils/types";
import PostCard from "./components/PostCard";
import { useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		async function fetch() {
			const posts = await getAllPosts();
			setPosts(posts);
		}
		fetch();
	}, []);

	useEffect(() => {
		console.log(posts);
	}, [posts]);

	return (
		<>
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => navigate("/create")}
			>
				Create Post
			</button>
			{posts.map((post) => {
				return <PostCard post={post}></PostCard>;
			})}
		</>
	);
}

export default App;
