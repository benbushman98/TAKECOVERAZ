import DrawerAppBar from './components/Drawer';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from "./pages/Error/index";
import Home from "./pages/Home/index";
import About from './pages/About/index';
import Contact from "./pages/Contact/index";
import Playlist from "./pages/Playlist/index";

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/playlist",
    element: <Playlist />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
]);

const style = {
  height: "160px"
}

function App() {
  return (
    <>
      <div style={style}>
        <DrawerAppBar />
      </div>
      <div className='m-0 bg-black'>
        <RouterProvider router={router} />
      </div>

    </>
  );
}

export default App;
