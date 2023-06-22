export interface Comment {
	id: string;
	text: string;
	author: string;
	additional?: string;
}

export interface Post {
	id: string;
	title: string;
	content: string;
	author: string;
	comments: Comment[];
	additional?: string;
}
