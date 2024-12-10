import { Outlet } from "react-router-dom";
import { Sidebar, TopNavbar } from "../components";

export function MainLayout() {
    return (
        <div className="flex h-max bg-gray-100">
            <Sidebar />
            <div className="flex flex-col w-screen ">
                <TopNavbar />
                <div className="my-4 justify-center flex items-center " > {/* Adjust bg-color as needed */}
                    <Outlet />
                </div>
            </div>
        </div>);
}

// <div className="flex h-screen">
//     <Sidebar />
//     <div className="flex-1 overflow-auto">
//         {children}
//     </div>
// </div>
