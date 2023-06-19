import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Create from "./Create.tsx";
import Details from "./Details.tsx";
import Edit from "./Edit.tsx";
import CreateComment from "./CreateComment.tsx";
import EditComment from "./EditComment.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/create",
		element: <Create />,
	},
	{
		path: "/posts/:id",
		element: <Details />,
	},
	{
		path: "/posts/:id/edit",
		element: <Edit />,
	},
	{
		path: "/posts/:id/comments/create",
		element: <CreateComment />,
	},
	{
		path: "/posts/:id/comments/:commentId/edit",
		element: <EditComment />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
