package main

import (
	"context"
	"log"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func GetAllPosts(c *gin.Context) {
	cursor, err := PostsCollection.Find(context.Background(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.Background())

	var posts []Post
	for cursor.Next(context.Background()) {
		var post Post
		err := cursor.Decode(&post)
		if err != nil {
			log.Fatal(err)
		}
		posts = append(posts, post)
	}

	if err := cursor.Err(); err != nil {
		log.Fatal(err)
	}

	c.JSON(200, posts)
}

func CreateExamplePost(c *gin.Context) {
	c.JSON(201, gin.H{"message": "Post created successfully!"})
}
