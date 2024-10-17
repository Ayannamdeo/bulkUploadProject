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
    removeToken();
    navigate('/login');
  };

  return (
    <Card className="h-screen w-full max-w-[17rem] p-4 shadow-xl shadow-blue-gray-900/10">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Navigation
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
