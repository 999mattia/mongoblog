import { Post } from "./types";

export async function getAllPosts(): Promise<Post[]> {
  const response = await fetch('https://mongoblog-api.onrender.com/posts');
  return response.json();
}