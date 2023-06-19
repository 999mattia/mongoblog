package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func CreateExamplePosts(amount int) {

	for i := 0; i < amount; i++ {
		post := Post{
			Title:   fmt.Sprintf("Post %d", i+1),
			Content: fmt.Sprintf("Content %d", i+1),
			Author:  fmt.Sprintf("Author %d", i+1),
		}

		for j := 0; j < amount; j++ {
			comment := Comment{
				Text:      fmt.Sprintf("Comment %d", j+1),
				Author:    fmt.Sprintf("Comment Author %d", j+1),
				CommentID: primitive.NewObjectID().Hex(),
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

func LoadMockData() {
	data, err := ioutil.ReadFile("mock.json")
	if err != nil {
		log.Fatal(err)
	}

	var posts []Post
	err = json.Unmarshal(data, &posts)
	if err != nil {
		log.Fatal(err)
	}

	for _, post := range posts {
		_, err := PostsCollection.InsertOne(context.Background(), post)
		if err != nil {
			log.Fatal(err)
		}
	}

	fmt.Println("Mock data loaded successfully!")
}
