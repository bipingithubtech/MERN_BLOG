import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./component/Navbar";

import { UserProvider } from "./context/Context";
import Register from "./component/Register";
import Login from "./component/Login";
import Home from "./component/home";
import Footer from "./component/footer";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
