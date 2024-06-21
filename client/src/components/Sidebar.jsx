import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../utils/helpers/auth';

import { Card, Typography, List, ListItem, ListItemPrefix, } from "@material-tailwind/react";
import { HomeIcon, TableCellsIcon, ArrowUpOnSquareIcon, InboxIcon, PowerIcon, UserPlusIcon } from "@heroicons/react/24/solid";

const navItemsInfo = [
  { name: 'Home', link: '/', icon: <HomeIcon className="h-5 w-5" /> },
  { name: 'Financials', link: '/table', icon: <TableCellsIcon className="h-5 w-5" /> },
  { name: 'File Report', link: '/filereport', icon: <InboxIcon className="h-5 w-5" /> },
  { name: 'Upload File', link: '/uploadfile', icon: <ArrowUpOnSquareIcon className="h-5 w-5" /> },
];

const Sidebar = () => {
  const isAuth = isAuthenticated();
  const navigate = useNavigate();

  const handleSignin = () => navigate('/register');
  const handleSignOut = () => {
    sessionStorage.removeItem('JWT');
    sessionStorage.removeItem('tokenExpiry');
    removeToken();
    navigate('/login');
  };

  return (
    <Card className="h-screen w-full max-w-[17rem] p-4 shadow-xl shadow-blue-gray-900/10">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>

      <List>
        {navItemsInfo.map((item, index) => {
          return (
            <ListItem key={index} onClick={() => navigate(item.link)}>
              <ListItemPrefix>
                {item.icon}
              </ListItemPrefix>
              {item.name}
            </ListItem>
          );
        })}
        {isAuth ? (
          <ListItem onClick={handleSignOut}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        ) : (
          <ListItem onClick={handleSignin}>
            <ListItemPrefix>
              <UserPlusIcon className="h-5 w-5" />
            </ListItemPrefix>
            Sign In
          </ListItem>
        )}      </List>
    </Card>
  );
};

const MemoizedSidebar = React.memo(Sidebar);

export { MemoizedSidebar as Sidebar };
// <div className={`${isOpen ? 'w-60' : 'w-fit'} hidden sm:block relative h-screen duration-300 border-r border-gray-600 p-5 bg-slate-800`}>
//   <BsArrowLeftCircle
//     className={`${!isOpen && 'rotate-180'} absolute text-3xl rounded-full cursor-pointer top-9 -right-4 fill-gray-400 bg-gray-800`}
//     onClick={() => setIsOpen(!isOpen)}
//   />
//   <Link to='/'>
//     <div className={`flex ${isOpen && 'gap-x-4'} items-center`}>
//       <h1>Heading</h1>
//       {isOpen && (
//         <span className='text-xl font-medium whitespace-nowrap text-white'>
//           Goal Quest
//         </span>
//       )}
//     </div>
//   </Link>
//   <ul className='pt-6'>
//     {navItemsInfo.map((item) => (
//       <NavItem key={item.name} name={item.name} link={item.link} isOpen={isOpen} />
//     ))}
//   </ul>
//   <div className='p-4'>
//     {isAuth ? (
//       <button
//         onClick={handleSignOut}
//         className='w-full border-2 border-indigo-500 px-6 py-2 rounded-full text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300'
//       >
//         Sign Out
//       </button>
//     ) : (
//         <button
//           onClick={handleSignin}
//           className='w-full border-2 border-indigo-500 px-6 py-2 rounded-full text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300'
//         >
//           Sign In
//         </button>
//       )}
//   </div>
// </div>
//
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { isAuthenticated, removeToken } from "../utils/helpers/auth";
//
// import { BsArrowLeftCircle } from 'react-icons/bs'
// // import { AiFillPieChart } from 'react-icons/ai'
// // import { SiFuturelearn } from 'react-icons/si'
// // import { SiOpenaccess } from 'react-icons/si'
// // import { CgProfile } from 'react-icons/cg'
//
// const navItemsInfo = [
//   { name: "Home", link: "/" },
//   { name: "Financials", link: "/table" },
//   { name: "File Report", link: "/filereport" },
//   { name: "Upload File", link: "/uploadfile" },
// ];
//
// const NavItem = ({ name, link }) => (
//   <Link to={link} >
//     <li className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer text-white hover:bg-gray-700 `} >
//       <span className={`${!open && 'hidden'} origin-left duration-300 hover:block`} >
//         {name}
//       </span>
//     </li>
//   </Link>
//
//   // <span className='text-2xl'>{menu.src}</span>
//
//
//   // <li className="relative group my-2">
//   //   <Link to={link} className="block px-4 py-2 hover:bg-indigo-500 hover:text-white transition-all duration-300">
//   //     {name}
//   //   </Link>
//   //   <span className="text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
//   //     /
//   //   </span>
//   // </li>
// );
//
// const Sidebar = () => {
//   const [open, setOpen] = useState(false);
//   const isAuth = isAuthenticated();
//   const navigate = useNavigate();
//
//   const handleSignin = () => navigate("/register");
//
//   const handleSignOut = () => {
//     sessionStorage.removeItem("JWT");
//     sessionStorage.removeItem("tokenExpiry");
//     removeToken();
//     navigate("/login");
//   };
//
//   // const toggleSidebar = () => setIsOpen(!isOpen);
//
//   return (
//     <div className={`${open ? 'w-60' : 'w-fit'} hidden sm:block relative h-screen duration-300  border-r  border-gray-600 p-5 bg-slate-800`} >
//       <BsArrowLeftCircle
//         className={`${!open && 'rotate-180'
//           } absolute text-3xl rounded-full cursor-pointer top-9 -right-4 fill-gray-400 bg-gray-800`}
//         onClick={() => setOpen(!open)}
//       />
//       <Link to='/'>
//         <div className={`flex ${open && 'gap-x-4'} items-center`}>
//           <h1>heading</h1>
//           {open && (
//             <span className='text-xl font-medium whitespace-nowrap text-white'>
//               Goal Quest
//             </span>
//           )}
//         </div>
//       </Link>
//
//       <ul className='pt-6'>
//         {navItemsInfo.map((item, index) => (
//           <NavItem key={item.name} name={item.name} link={item.link} />
//         ))}
//       </ul>
//       <div className="p-4">
//         {isAuth ? (
//           <button
//             onClick={handleSignOut}
//             className="w-full border-2 border-indigo-500 px-6 py-2 rounded-full text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300"
//           >
//             Sign Out
//           </button>
//         ) : (
//           <button
//             onClick={handleSignin}
//             className="w-full border-2 border-indigo-500 px-6 py-2 rounded-full text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300"
//           >
//             Sign In
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };
//
// const MemoizedSidebar = React.memo(Sidebar);
//
// export { MemoizedSidebar as Sidebar };

// <div className="w-64 h-full bg-gray-800 text-white fixed md:relative md:flex flex-col justify-between z-50">
//   <div className="p-4">
//     <div className="text-2xl font-bold mb-6">Ayan's Blog</div>
//     <ul className="font-semibold">
//       {navItemsInfo.map((item) => (
//         <NavItem key={item.name} name={item.name} link={item.link} />
//       ))}
//     </ul>
//   </div>
//   <div className="p-4">
//     {isAuth ? (
//       <button
//         onClick={handleSignOut}
//         className="w-full border-2 border-indigo-500 px-6 py-2 rounded-full text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300"
//       >
//         Sign Out
//       </button>
//     ) : (
//         <button
//           onClick={handleSignin}
//           className="w-full border-2 border-indigo-500 px-6 py-2 rounded-full text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300"
//         >
//           Sign In
//         </button>
//       )}
//   </div>
// </div>
