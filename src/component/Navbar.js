import React from 'react';
import { Navbar, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <Navbar fluid rounded className="bg-gray-900 text-white shadow-xl">
      {/* Logo */}
      <Navbar.Brand>
        <Link to="/" className="">
          <span className="flex">
            <img
              alt="Flowbite React Logo"
              className="mr-3 h-12 w-14 sm:h-9"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgxnqDgK96020wjWtRNIoAZDf-eYf6ylYE7OCW-12bw&usqp=CAU&ec=48600112"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-black">
              Movieflix- Pj
            </span>
          </span>
        </Link>
      </Navbar.Brand>

      {/* Search Bar */}
      <div className="ml-auto">
        <Link to="/search">
          <img
            alt="search icon"
            src="https://cdn-icons-png.flaticon.com/512/122/122932.png"
            className="w-12 h-12"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to="/favorite">Favorite</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
