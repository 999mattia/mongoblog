package main

// Post represents a blog post
type Post struct {
	ID       string    `bson:"_id,omitempty" json:"id"`
	Title    string    `bson:"title" json:"title"`
	Content  string    `bson:"content" json:"content"`
	Author   string    `bson:"author" json:"author"`
	Comments []Comment `bson:"comments" json:"comments"`
	Additional string  `bson:"additional" json:"additional"`
}

// Comment represents a comment on a blog post
type Comment struct {
	CommentID string `bson:"_id,omitempty" json:"id"`
	Text      string `bson:"text" json:"text"`
	Author    string `bson:"author" json:"author"`
	Additional string  `bson:"additional" json:"additional"`
}
