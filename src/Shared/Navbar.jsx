import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("Logout");
        Swal.fire({
          title: "Success!",
          text: "Log out Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate("/");
      })
      .catch();
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addProduct">Add Product</NavLink>
      </li>
      <li>
        <NavLink to="/cart">Cart</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div>
          <Link to={"/"}>
            <div className="flex justify-center items-center">
              <div>
                <img src="/vite.svg" className="md:w-10 rounded-full" />
              </div>
              <div>
                <p className="font-bold text-xl md:pl-2">
                  Wear
                  <span className="text-[#005AE5]">Hub</span>
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center justify-center">
          <div>
            {user ? (
              <button onClick={handleSignOut} className="btn btn-neutral">
                Log Out
              </button>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary text-white font-bold">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
