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

	//CleanDB()
	//CreateExamplePosts()

	r := gin.Default()

	r.Use(CORS)

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	r.GET("/posts", GetAllPosts)
	r.GET("/posts/:id", GetPostByID)
	r.POST("/posts", CreatePost)
	r.PATCH("/posts/:id", UpdatePost)
	r.DELETE("/posts/:id", DeletePost)

	r.GET("/posts/:id/comments/:commentID", GetCommentByID)
	r.POST("/posts/:id/comments", CreateComment)
	r.DELETE("/posts/:id/comments/:commentID", DeleteComment)

	r.Run()
}
