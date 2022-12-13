import DrawerAppBar from './components/Drawer';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from "./pages/Error/index";
import Home from "./pages/Home/index";
import About from './pages/About/index';
import Contact from "./pages/Contact/index";
import Playlist from "./pages/Playlist/index";
import Footer from "./components/Footer/index";

const router = createBrowserRouter([
  {
    path: '/',
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

function App() {
  return (
    <>
      <div style={{height: "116px"}}>
        <DrawerAppBar />
      </div>
      <div className='m-0 bg-black'>
        <RouterProvider router={router} />
      </div>
      <div className="bg-black" style={{height: "75px"}}>
        <Footer />
      </div>

    </>
  );
}

export default App;
