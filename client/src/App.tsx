import './App.css'
import { useState, useEffect } from 'react'
import { getAllPosts } from './utils/fetch'
import { Post } from './utils/types'

function App() {
const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		async function fetch() {
			const posts = await getAllPosts()
			setPosts(posts)
		}
		fetch()
	}, [])

	useEffect(() => {
		console.log(posts)
	}, [posts])


  return (
    <>
    Hello World!
</>
  )
}

export default App
