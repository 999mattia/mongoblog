import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Create from "./Create.tsx";
import Details from "./Details.tsx";
import Edit from "./Edit.tsx";
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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
