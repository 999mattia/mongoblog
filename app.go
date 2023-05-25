package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	fmt.Println(os.Getenv("DBURL"))

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("DBURL")))
	if err != nil {
		panic(err)
	}

	posts := client.Database("mongoblog").Collection("posts")

	post := Post{
		Title:   "Sample Blog Post",
		Content: "This is the content of the blog post.",
		Author:  "John Doe",
		Comments: []Comment{
			{
				CommentID: 1,
				Text:      "Great post!",
				Author:    "Jane Smith",
			},
			{
				CommentID: 2,
				Text:      "I found it very helpful. Thanks!",
				Author:    "Mike Johnson",
			},
		},
	}

	// Insert the blog post into the collection
	_, err = posts.InsertOne(context.Background(), post)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Example post inserted successfully!")
}
