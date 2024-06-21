import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../utils/helpers/auth";

export function Hero() {
  // const isAuth = isAuthenticated();

  return (
    <div className="p-8">
      <h1>Welcome this HomePage</h1>
    </div>
  );
}


// <div className="bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] py-52 px-8 relative overflow-hidden">
//
//   <div className="max-w-2xl mx-auto text-center">
//     <h1 className="font-bold text-white mb-6 text-6xl">Bulk Upload Project</h1>
//     <p className="text-gray-100 leading-8 mb-10 text-xl">
//       Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
//     </p>
//     <div className="flex justify-center gap-6">
//       <Link to={isAuth ? "/blogs" : "/login"} className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-500 transition-colors duration-300">
//         Get started
//       </Link>
//     </div>
//   </div>
// </div>
