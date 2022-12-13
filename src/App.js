import DrawerAppBar from './components/Drawer';
import { Routes, Route, HashRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/index";
import Home from "./pages/Home/index";
import About from './pages/About/index';
import Contact from "./pages/Contact/index";
import Playlist from "./pages/Playlist/index";
import Footer from "./components/Footer/index";

function App() {
  return (
    <HashRouter>
      <div style={{ height: "116px" }}>
        <DrawerAppBar />
      </div>
      <div className='m-0 bg-black'>
        <Routes>
          <Route path="/" element={<Home />}errorElement={<ErrorPage />} />
          <Route path="/about" element={<About />}errorElement={<ErrorPage />} />
          <Route path="/playlist" element={<Playlist />}errorElement={<ErrorPage />}/>
          <Route path="/contact"element={<Contact />}errorElement={<ErrorPage />}/>
        </Routes>
      </div>
      <div className="bg-black" style={{ height: "75px" }}>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
