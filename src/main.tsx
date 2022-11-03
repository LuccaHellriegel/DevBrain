import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import {Plan} from "./feature/Plan/Plan";
import {Snapshots} from "./feature/Snapshots/Snapshots";

//TODO: need Back/Forward buttons

const router = createBrowserRouter([
  {
    path: "/",
    element: <Snapshots />,
  },
  {
    path: "/:snapshotId",
    element: <Plan />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
