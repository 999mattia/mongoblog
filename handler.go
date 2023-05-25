package main

import (
	"context"
	"log"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func GetPostByID(c *gin.Context) {
	id, _ := primitive.ObjectIDFromHex(c.Param("id"))

	filter := bson.M{"_id": id}

	var post Post
	err := PostsCollection.FindOne(context.Background(), filter).Decode(&post)
	if err != nil {
		c.JSON(404, gin.H{"message": "Post not found"})
		return
	}
	c.JSON(200, post)
}

func CreatePost(c *gin.Context) {
	var post Post
	err := c.BindJSON(&post)
	if err != nil {
		log.Fatal(err)
	}

	result, err := PostsCollection.InsertOne(context.Background(), post)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(201, result)
}

func DeletePost(c *gin.Context) {
	id, _ := primitive.ObjectIDFromHex(c.Param("id"))

	filter := bson.M{"_id": id}

	result, err := PostsCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, result)
}

func CreateExamplePost(c *gin.Context) {
	c.JSON(201, gin.H{"message": "Post created successfully!"})
}
