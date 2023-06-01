package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var PostsCollection *mongo.Collection

func InitDB() {
	Client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("DBURL")))
	if err != nil {
		panic(err)
	}

	PostsCollection = Client.Database("mongoblog").Collection("posts")
}


func CreateExamplePosts() {
	numberOfPosts := 1000 // Change this value to adjust the number of posts

	for i := 0; i < numberOfPosts; i++ {
		post := Post{
			Title:   fmt.Sprintf("Post %d", i+1),
			Content: fmt.Sprintf("Content of Post %d", i+1),
			Author:  fmt.Sprintf("Author %d", i+1),
		}

		numberOfComments := rand.Intn(1000) // Random number of comments per post

		for j := 0; j < numberOfComments; j++ {
			comment := Comment{
				Text:   fmt.Sprintf("Comment %d of Post %d", j+1, i+1),
				Author: fmt.Sprintf("Comment Author %d", j+1),
			}
			post.Comments = append(post.Comments, comment)
		}

		_, err := PostsCollection.InsertOne(context.Background(), post)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Post %d created successfully!\n", i+1)
	}

	fmt.Println("Posts and comments created successfully!")
}

func CleanDB() {
	_, err := PostsCollection.DeleteMany(context.Background(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Database cleaned successfully!")
}