import { lazy } from "react";

// import { ErrorMessage } from "./ErrorMessage";
// import { Sidebar } from "./Sidebar";
// import { SkeletonArticleCard } from "./SkeletonArticleCard";
// import { TopNavbar } from "./TopNavbar";
//
// import Modal from "./Modal";
// import { TableComponent } from "./TableComponent";
// import { PageSizeMenu } from "./PageSizeMenu";
// import { PaginationNav } from "./PaginationNav";

// const SkeletonArticleCard = lazy(() => import("./SkeletonArticleCard").then(module => ({ default: module.SkeletonArticleCard })));
const ErrorMessage = lazy(() => import("./ErrorMessage").then(module => ({ default: module.ErrorMessage })));
const Sidebar = lazy(() => import("./Sidebar").then(module => ({ default: module.Sidebar })));
const TopNavbar = lazy(() => import("./TopNavbar").then(module => ({ default: module.TopNavbar })));
const Modal = lazy(() => import("./Modal"));
const TableComponent = lazy(() => import("./TableComponent").then(module => ({ default: module.TableComponent })));
const PageSizeMenu = lazy(() => import("./PageSizeMenu").then(module => ({ default: module.PageSizeMenu })));
const PaginationNav = lazy(() => import("./PaginationNav").then(module => ({ default: module.PaginationNav })));

export { ErrorMessage, Sidebar, TopNavbar, Modal, TableComponent, PaginationNav, PageSizeMenu };
