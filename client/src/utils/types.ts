export interface Comment {
    id: string;
    text: string;
    author: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    comments: Comment[];
}