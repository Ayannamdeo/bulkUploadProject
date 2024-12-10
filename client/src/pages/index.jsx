import { lazy } from "react";

// import { Financials } from "./financials/Financials";
// import { HomePage } from "./home/HomePage";
// import { LoginPage } from "./login/LoginPage";
// import { RegisterPage } from "./register/RegisterPage";
// import { UploadFile } from "./uploadFile/UploadFile";
// import { FileReport } from "./fileReport/FileReport";
// import { ErrorReport } from "./errorReport/ErrorReport";

const HomePage = lazy(() => import('./home/HomePage').then(module => ({default: module.HomePage})));
const RegisterPage = lazy(() => import('./register/RegisterPage').then(module => ({default: module.RegisterPage})));
const LoginPage = lazy(() => import('./login/LoginPage').then(module => ({default: module.LoginPage})));
const Financials = lazy(() => import('./financials/Financials').then(module => ({default: module.Financials})));
const UploadFile = lazy(() => import('./uploadFile/UploadFile').then(module => ({default: module.UploadFile})));
const FileReport = lazy(() => import('./fileReport/FileReport').then(module => ({default: module.FileReport})));
const ErrorReport = lazy(() => import('./errorReport/ErrorReport').then(module => ({default: module.ErrorReport})));

export {
  Financials,
  HomePage,
  LoginPage,
  RegisterPage,
  UploadFile,
  FileReport,
  ErrorReport,
};
