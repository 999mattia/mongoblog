package main

import (
	"context"
	"os"

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
