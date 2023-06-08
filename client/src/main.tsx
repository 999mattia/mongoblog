import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Create from "./Create.tsx";
import Details from "./Details.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
