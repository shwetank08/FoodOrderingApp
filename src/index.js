import React, { Children } from "react";
import ReactDOM from "react-dom/client";

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import App from "./App";
import Body from "./components/Body";
import About from "./components/About";
import ErrorElement from "./components/ErrorElement";
import Contact from "./components/Contact";
import Menu from "./components/Menu";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorElement/>,
      children:[
        {
          path: "/",
          element: <Body/>
        },
        {
          path:"/about",
          element: <About/>
        },
        {
          path:"/contact",
          element: <Contact/>
        },
        {
          path: "/menu/:resId",
          element: <Menu />,
        },
      ]
    },
    
    
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);