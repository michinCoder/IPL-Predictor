import React, {useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//react-router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//firebase
// import firebase from "firebase/compat/app";
import "firebase/auth";


//importing components
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PageNotFound from "./Pages/PageNotFound";

// importing context
import { UserContext } from "./context/UserContext";



// import firebaseconfig
// import firebaseconfig from "./config/firebaseConfig";


//init firebase
// firebase.initializeApp(firebaseconfig);





function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
