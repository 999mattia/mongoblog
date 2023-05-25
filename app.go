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

	r.GET("/api", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	r.GET("/api/posts", GetAllPosts)

	r.GET("/api/posts/example", CreateExamplePost)

	r.Run()

}
