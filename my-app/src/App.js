import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./component/Navbar";

import { UserProvider } from "./context/Context";
import Register from "./component/Register";
import Login from "./component/Login";
import Home from "./component/home";
import Footer from "./component/footer";
import CreatePost from "./component/CreatePost";
import Profile from "./component/Profile";
import Navbar from "./component/Navbar";
import HomePost from "./component/HomePost";
import Edit from "./component/Edit";
import FirstPage from "./component/FirstPage";
import Userpost from "./component/Userpost";
import About from "./component/About";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* <Route path="/" element={<FirstPage />}></Route> */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/post" element={<CreatePost />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="posts/:id" element={<HomePost />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/userPost" element={<Userpost />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
