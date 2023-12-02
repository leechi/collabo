import './App/App.scss'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./routes/Create-acount";
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
])

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () =>{
    // wait for firebase
    setLoading(false);
  };
  useEffect(()=>{
    init();
  }, []);
  return (
    <>
     
    {isLoading ? <LoadingScreen /> : <RouterProvider router={router}/>}
    </>
  )
}

export default App
