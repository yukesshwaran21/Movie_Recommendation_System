import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import axios from 'axios';  // You need axios to make the API call
import './style.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // New state for loading
  const { isLoggedIn, userId, logout } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const fetchUsername = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/getname/${userId}`);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchUsername();
    } else {
      setLoading(false); // Stop loading if not logged in
    }
  }, [isLoggedIn, userId]);

  return (
    <div className="fixed w-full top-0 bg-black z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="logo text-5xl font-bold text-white">
            MoVIENesT
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            <Link to="/movies" className="text-white text-4xl hover:text-red-600">
              Movies
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/favourites">
                  <button className="text-white text-4xl hover:text-red-600">Favorites</button>
                </Link>
                <div className="flex items-center">
                  <FaUserCircle className="text-white text-4xl hover:text-red-600" />
                  {loading ? (
                    <span className="ml-2 text-white text-2xl">Loading...</span>
                  ) : (
                    username && <span className="ml-2 text-white text-2xl hover:text-red-600">{username}</span>
                  )}
                </div>
                <button onClick={logout} className="text-white text-4xl hover:text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-white text-4xl hover:text-red-600">Login</button>
                </Link>
                <Link to="/admin">
                  <button className="text-white text-4xl hover:text-red-600 ml-4">Admin Login</button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white text-4xl">
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black text-white">
          <Link to="/movies" onClick={toggleMenu}>
            <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Movies</button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/favourites" onClick={toggleMenu}>
                <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Favorites</button>
              </Link>
              <div className="flex items-center text-2xl py-2 px-4 hover:bg-red-600">
                <FaUserCircle className="mr-2" />
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  username && <span>{username}</span>
                )}
              </div>
              <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu}>
                <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Login</button>
              </Link>
              <Link to="/admin" onClick={toggleMenu}>
                <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Admin Login</button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
