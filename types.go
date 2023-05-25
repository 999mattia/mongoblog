package main

// Post represents a blog post
type Post struct {
	ID       string    `bson:"_id,omitempty"`
	Title    string    `bson:"title"`
	Content  string    `bson:"content"`
	Author   string    `bson:"author"`
	Comments []Comment `bson:"comments"`
}

// Comment represents a comment on a blog post
type Comment struct {
	CommentID int    `bson:"commentId"`
	Text      string `bson:"text"`
	Author    string `bson:"author"`
}
