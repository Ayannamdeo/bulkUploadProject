import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

import { HomePage, RegisterPage, LoginPage, Financials, UploadFile, FileReport, ErrorReport } from "./pages/";
import { MainLayout } from "./layouts/MainLayout";

import { Mycontext } from "./store/CreateContext";
import { Privateroutes } from "./feature/PrivateRoutes";

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserId = localStorage.getItem("userId");
    setUserName(storedUserName);
    setUserEmail(storedUserEmail);
    setUserId(storedUserId);
  }, []);

  return (
    <>
      <Mycontext.Provider value={{ userName, setUserName, userEmail, setUserEmail, userId, setUserId }}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route element={<Privateroutes />}>
              <Route path="/table" element={<Financials />} />
              <Route path="/uploadfile" element={<UploadFile />} />
              <Route path="/filereport" element={<FileReport />} />
              <Route path="/errorreport/:logId" element={<ErrorReport />} />
            </Route>
          </Route>

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Toaster />
      </Mycontext.Provider>
    </>
  );
}

export default App;
