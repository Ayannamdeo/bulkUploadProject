import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";


import { HomePage, RegisterPage, LoginPage, Blogs } from "./pages/";

import { Mycontext } from "./store/CreateContext";
import { Privateroutes } from "./feature/PrivateRoutes";

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  // const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <Mycontext.Provider value={{ userName, setUserName, userEmail, setUserEmail, userId, setUserId }}>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/blogs/" element={<Privateroutes />} >
              <Route path="/blogs/" element={<Blogs />} />
              { /*<Route path="/blogs/:id" element={<ArticleDetailPage />} />*/}
            </Route>

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Toaster />
        </div>
      </Mycontext.Provider>
    </>
  );
}

export default App;
