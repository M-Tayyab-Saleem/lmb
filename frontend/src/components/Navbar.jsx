import React, { useEffect, useState } from "react";
import "./Navbar.css";
import menu_icon from "../assets/menu-icon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://bookify-cfly.onrender.com/api/authstatus", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.isAuthenticated);
      })
      .catch((error) => {
        console.error(error);
        navigate("/login");
      });
  }, [navigate]);

  const [mobileMenu, setmobileMenu] = useState(false);

  let toggleMenu = () => {
    mobileMenu ? setmobileMenu(false) : setmobileMenu(true);
  };

  //To protect create event page
  let protectPath = (url) => {
    if (!isAuthenticated) {
      toast.error("Unauthorized, LogIn First", {
        position: "top-right",
        onClose: () => {
          navigate("/login");
        },
        autoClose: 2000,
      });
    } else {
      navigate(url);
    }
  };

  //Logout Handle
  const handleLogout = async () => {
    try {
      await axios.get("https://bookify-cfly.onrender.com/api/logout", {
        withCredentials: true, 
      });
      toast.success("You LogOut successfully!", {
              position: "top-right",
              onClose: () => {
                navigate('/login');
                },
              autoClose: 2000,
          });
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <nav className={`container`}>
      <Link to="/">
        <p className="logo hover:cursor-pointer">𝔹𝕠𝕠𝕜𝕚𝕗𝕪</p>
      </Link>
      <ul className={mobileMenu ? "open-menu" : ""}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li onClick={()=>protectPath("/createEvent")}>Create Event</li>
        <li onClick={()=>protectPath("/bookedEvents")}>
          My Bookings
        </li>
      </ul>
      {isAuthenticated ? (
        <button className="btn" onClick={handleLogout}>LogOut</button>
      ) : (
        <div className="flex gap-2">
          <Link to="/signup">
            <button className="btn">SignUp</button>{" "}
          </Link>
          <Link to="/login">
            <button className="btn">LogIn</button>
          </Link>
        </div>
      )}
      <img src={menu_icon} alt="" className="menu-icon" onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;
