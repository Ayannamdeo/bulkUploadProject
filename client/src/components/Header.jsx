import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated, removeToken } from "../utils/helpers/auth";

const navItemsInfo = [
  { name: "Home", link: "/" },
  { name: "Blogs", link: "/blogs" },
  { name: "MyPosts", link: "/myposts" },
  { name: "CreateBlog", link: "/create" },
];

const NavItem = ({ name, link }) => {
  console.log("name:", name);
  return (
    <li className=" relative group">
      <Link to={link} className="px-4 py-2">
        {name}
      </Link>
      <span className="text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
        /
      </span>
    </li>
  );
};

const Header = () => {
  const isAuth = isAuthenticated();
  console.log("/////////////isAuth:", isAuth);
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/register")
  }

  const handleSignOut = () => {
    sessionStorage.removeItem("JWT");
    sessionStorage.removeItem("tokenExpiry");
    removeToken();
    navigate("/login");
  }

  return (
    <section>
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <div className="">
          <p>
            Ayan's Blog
          </p>
        </div>
        <div className="flex gap-x-9 items-center">
          <ul className="flex gap-x-2 font-semibold ">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} name={item.name} link={item.link} />
            ))}
          </ul>
          {isAuth ?
            <button onClick={handleSignOut} className="border-2 border-indigo-500 px-6 py-2 rounded-full text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300">
              Sign Out
            </button>
            :
            <button onClick={handleSignin} className="border-2 border-indigo-500 px-6 py-2 rounded-full text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300">
              Sign In
            </button>
          }
        </div>
      </header>
    </section>
  );
}

const MemoizedHeader = React.memo(Header);

export { MemoizedHeader as Header };
