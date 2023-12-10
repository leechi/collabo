import './App/App.scss'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./routes/Create-acount";
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import {auth} from './firebase'
import ProtectedRoute from './components/ProtectedRoute';
import Team from './routes/Team';
import BookMarks from './routes/BookMarks';

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "bookmarks",
        element: <BookMarks />,
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
    await auth.authStateReady();
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
