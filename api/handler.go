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

func UpdatePost(c *gin.Context) {
	id, _ := primitive.ObjectIDFromHex(c.Param("id"))

	filter := bson.M{"_id": id}

	var post Post
	err := c.BindJSON(&post)
	if err != nil {
		log.Fatal(err)
	}

	update := bson.M{
		"$set": bson.M{"title": post.Title, "author": post.Author, "content": post.Content},
	}

	result, err := PostsCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, result)
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

func CreateComment(c *gin.Context) {
	id, _ := primitive.ObjectIDFromHex(c.Param("id"))

	filter := bson.M{"_id": id}

	var post Post
	err := PostsCollection.FindOne(context.Background(), filter).Decode(&post)
	if err != nil {
		c.JSON(404, gin.H{"message": "Post not found"})
		return
	}

	var comment Comment
	err = c.BindJSON(&comment)
	if err != nil {
		log.Fatal(err)
	}

	comment.CommentID = primitive.NewObjectID().Hex()

	post.Comments = append(post.Comments, comment)

	update := bson.M{
		"$set": bson.M{"comments": post.Comments},
	}

	result, err := PostsCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, result)
}

func GetCommentByID(c *gin.Context) {
	postID, _ := primitive.ObjectIDFromHex(c.Param("id"))
	commentID := c.Param("commentID")

	filter := bson.M{"_id": postID}

	var post Post
	err := PostsCollection.FindOne(context.Background(), filter).Decode(&post)
	if err != nil {
		c.JSON(404, gin.H{"message": "Post not found"})
		return
	}

	var comment Comment
	for _, comment = range post.Comments {
		if comment.CommentID == commentID {
			break
		}
	}

	c.JSON(200, comment)
}

func UpdateComment(c *gin.Context) {
	postID, _ := primitive.ObjectIDFromHex(c.Param("id"))
	commentID := c.Param("commentID")

	filter := bson.M{"_id": postID}

	var post Post
	err := PostsCollection.FindOne(context.Background(), filter).Decode(&post)
	if err != nil {
		c.JSON(404, gin.H{"message": "Post not found"})
		return
	}

	var comment Comment
	err = c.BindJSON(&comment)
	if err != nil {
		log.Fatal(err)
	}

	var comments []Comment
	for _, oldComment := range post.Comments {
		if oldComment.ID == commentID {
			oldComment.Text = comment.Text
			oldComment.Author = comment.Author
		}
		comments = append(comments, oldComment)
	}

	update := bson.M{
		"$set": bson.M{"comments": comments},
	}

	result, err := PostsCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, result)
}

func DeleteComment(c *gin.Context) {
	postID, _ := primitive.ObjectIDFromHex(c.Param("id"))
	commentID := c.Param("commentID")

	filter := bson.M{"_id": postID}

	var post Post
	err := PostsCollection.FindOne(context.Background(), filter).Decode(&post)
	if err != nil {
		c.JSON(404, gin.H{"message": "Post not found"})
		return
	}

	var comments []Comment
	for _, comment := range post.Comments {
		if comment.CommentID != commentID {
			comments = append(comments, comment)
		}
	}

	update := bson.M{
		"$set": bson.M{"comments": comments},
	}

	result, err := PostsCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, result)
}
