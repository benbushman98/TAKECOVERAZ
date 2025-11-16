import DrawerAppBar from "./components/Drawer";
import { Routes, Route, HashRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/index";
import Home from "./pages/Home/index";
import About from "./pages/About/index";
import Contact from "./pages/Contact/index";
import Playlist from "./pages/Playlist/index";
import Calendar from "./pages/Calendar/index";
import Login from "./pages/Login/index";
import Admin from "./pages/Admin/index";
import Footer from "./components/Footer/index";

function App() {
  const isLoggedIn = !!localStorage.getItem("session");
  return (
    <HashRouter>
      {/* Full-height flex container */}
      <div className="d-flex flex-column min-vh-100 bg-black">
        {/* Header */}
        <div>
          <DrawerAppBar />
        </div>

        {/* Main Content (pushes footer only when tall enough) */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
            <Route
              path="/about"
              element={<About />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/calendar"
              element={<Calendar />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/playlist"
              element={<Playlist />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/contact"
              element={<Contact />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/login"
              element={<Login />}
              errorElement={<ErrorPage />}
            />
            <Route path="/admin" element={isLoggedIn ? <Admin /> : <Login />} />
          </Routes>
        </div>

        {/* Footer stays at bottom if content is short */}
        <div className="bg-black" style={{ height: "75px" }}>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
