import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import CourseHarborLogo from "../../assets/Logo/Logo-Full-Light.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { IoIosArrowDown } from "react-icons/io";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {
    setLoading(true);
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allCategories);
    } catch (error) {
      console.log("Navbar, Could not fetch the category list");
      console.log("Error -> ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="h-14 border-b border-richBlack-700">
      <div className="flex w-11/12 h-full max-w-maxContent items-center justify-between mx-auto">
        <Link to={"/"}>
          <img src={CourseHarborLogo} alt="logo" height={40} width={170} loading="lazy" />
        </Link>

        <nav className="flex gap-7 text-richBlack-25 justify-between">
          {NavbarLinks.map((link, index) => (
            <div key={index}>
              {
                //CATALOG
                link.title === "Catalog" ? (
                  <div className="group relative flex gap-1 items-center hover:cursor-pointer">
                    {link.title}
                    <IoIosArrowDown className="text-lg" />

                    <div className="absolute z-10 top-10 left-[50%] translate-x-[-50%] transition-all duration-200 bg-richBlack-5 rounded-lg lg:w-[300px] p-4 pt-[17px] invisible group-hover:visible opacity-0 group-hover:opacity-100">
                      <div
                        className="absolute rotate-45 bg-richBlack-5 w-6 h-6 -top-[10px]
                                            right-[107px] rounded-[4px]"
                      ></div>

                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                key={i}
                              >
                                <p className="rounded-lg text-richBlack-900 bg-transparent py-4 pl-4 hover:bg-richBlack-50">{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`${
                      matchRoute(link?.path) ? "text-yellow-50" : ""
                    }`}
                  >
                    {link.title}
                  </Link>
                )
              }
            </div>
          ))}
        </nav>

        {/* Cart / Login / Signup / profilePicture */}
        <div className="flex gap-4 items-center">
          {/* cart icon + number */}
          {/* agar user ka data mil jata h to token bhi definitely hoga, bcoz. user logged in h */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-richBlack-100 text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-1 text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token == null && (
            <Link to={"/login"}>
              <button
                className="text-richBlack-100 font-medium text-base bg-richBlack-800 py-2 px-3
                                 rounded-lg border-richBlack-700 border"
              >
                Log in
              </button>
            </Link>
          )}

          {token == null && (
            <Link to={"/signup"}>
              <button
                className="text-richBlack-100 font-medium text-base bg-richBlack-800 py-2 px-3
                                 rounded-lg border-richBlack-700 border"
              >
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />} 
        </div>
      </div>
    </div>
  );
};

export default Navbar;
