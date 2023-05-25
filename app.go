package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	InitDB()

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	r.Run()

	// post := Post{
	// 	Title:   "Sample Blog Post",
	// 	Content: "This is the content of the blog post.",
	// 	Author:  "John Doe",
	// 	Comments: []Comment{
	// 		{
	// 			CommentID: 1,
	// 			Text:      "Great post!",
	// 			Author:    "Jane Smith",
	// 		},
	// 		{
	// 			CommentID: 2,
	// 			Text:      "I found it very helpful. Thanks!",
	// 			Author:    "Mike Johnson",
	// 		},
	// 	},
	// }

	// // Insert the blog post into the collection
	// _, err = postsCollection.InsertOne(context.Background(), post)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// fmt.Println("Example post inserted successfully!")

	// cursor, err := PostsCollection.Find(context.Background(), bson.D{})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer cursor.Close(context.Background())

	// // Iterate over the cursor and decode each document into a Post struct
	// var posts []Post
	// for cursor.Next(context.Background()) {
	// 	var post Post
	// 	err := cursor.Decode(&post)
	// 	if err != nil {
	// 		log.Fatal(err)
	// 	}
	// 	posts = append(posts, post)
	// }

	// // Check for any errors during cursor iteration
	// if err := cursor.Err(); err != nil {
	// 	log.Fatal(err)
	// }

	// // Print the retrieved posts
	// for _, post := range posts {
	// 	fmt.Printf("Post ID: %s\n", post.ID)
	// 	fmt.Printf("Title: %s\n", post.Title)
	// 	fmt.Printf("Content: %s\n", post.Content)
	// 	fmt.Printf("Author: %s\n", post.Author)
	// 	fmt.Println("Comments:")
	// 	for _, comment := range post.Comments {
	// 		fmt.Printf("- Comment ID: %d\n", comment.CommentID)
	// 		fmt.Printf("  Text: %s\n", comment.Text)
	// 		fmt.Printf("  Author: %s\n", comment.Author)
	// 	}
	// 	fmt.Println("------")
	// }
}
