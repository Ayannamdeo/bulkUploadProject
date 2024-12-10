import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
const Toaster = lazy(() => import('react-hot-toast').then(module => ({default: module.Toaster})));
import { useState, useEffect } from "react";

import { HomePage, RegisterPage, LoginPage, Financials, UploadFile, FileReport, ErrorReport } from "./pages";

const MainLayout = lazy(() => import('./layouts/MainLayout').then(module => ({default: module.MainLayout})));
// import { MainLayout } from "./layouts/MainLayout";
import { Mycontext } from "./store/CreateContext";
import { Privateroutes } from "./feature/PrivateRoutes";
import ErrorBoundary from "./feature/ErrorBoundary";

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
        <ErrorBoundary>
        {/* Suspense helps to show a fallback while the component is being lazy-loaded */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/table" element={<Financials />} />
              <Route path="/filereport" element={<FileReport />} />
              <Route path="/errorreport/:logId" element={<ErrorReport />} />
              
              <Route element={<Privateroutes />}>
                <Route path="/uploadfile" element={<UploadFile />} />
              </Route>
            </Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
        <Toaster />
      </Mycontext.Provider>
    </>
  );
}

export default App;
// import { Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { useState, useEffect, Suspense} from "react";
//
// import { ErrorMessage } from "./components";
// import { HomePage, RegisterPage, LoginPage, Financials, UploadFile, FileReport, ErrorReport } from "./pages/lazyLoadPages";
// import { MainLayout } from "./layouts/MainLayout";
// import { Mycontext } from "./store/CreateContext";
// import { Privateroutes } from "./feature/PrivateRoutes";
//
// function App() {
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userId, setUserId] = useState("");
//
//   useEffect(() => {
//     const storedUserName = localStorage.getItem("userName");
//     const storedUserEmail = localStorage.getItem("userEmail");
//     const storedUserId = localStorage.getItem("userId");
//     setUserName(storedUserName);
//     setUserEmail(storedUserEmail);
//     setUserId(storedUserId);
//   }, []);
//
//   return (
//     <>
//       <Mycontext.Provider value={{ userName, setUserName, userEmail, setUserEmail, userId, setUserId }}>
//         <Suspense fallback={<div>loading..</div>}>
//           <Routes>
//             <Route element={<MainLayout />}>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/table" element={<Financials />} />
//               <Route path="/filereport" element={<FileReport />} />
//               <Route path="/errorreport/:logId" element={<ErrorReport />} />
//
//               <Route element={<Privateroutes />}>
//                 <Route path="/uploadfile" element={<UploadFile />} />
//               </Route>
//             </Route>
//
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/login" element={<LoginPage />} />
//
//             {/* Catch-all route for undefined routes */}
//             <Route path="*" element={<ErrorMessage />} />
//           </Routes>
//         </Suspense>
//         <Toaster />
//       </Mycontext.Provider>
//     </>
//   );
// }
//
// export default App;
