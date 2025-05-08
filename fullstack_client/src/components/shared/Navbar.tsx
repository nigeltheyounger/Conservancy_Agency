import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src="/logo.svg" alt="Logo" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:ml-10 lg:flex lg:space-x-8">
              <NavLink 
                to="/"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 
                  ${isActive ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/about"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 
                  ${isActive ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/wildlife"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 
                  ${isActive ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                }
              >
                Wildlife
              </NavLink>
              <NavLink 
                to="/gallery"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 
                  ${isActive ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                }
              >
                Gallery
              </NavLink>
              <NavLink 
                to="/contact"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 
                  ${isActive ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                }
              >
                Contact
              </NavLink>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {user ? (
              <>
                <NavLink
                  to={user.user_metadata.role === 'admin' ? '/admin/dashboard' : '/shareholder/dashboard'}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={() => signOut()}
                  className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1 bg-white border-b border-gray-100">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${isActive ? 'border-green-600 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${isActive ? 'border-green-600 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/wildlife"
            className={({ isActive }) =>
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${isActive ? 'border-green-600 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`
            }
          >
            Wildlife
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${isActive ? 'border-green-600 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${isActive ? 'border-green-600 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`
            }
          >
            Contact
          </NavLink>
          {user ? (
            <>
              <NavLink
                to={user.user_metadata.role === 'admin' ? '/admin/dashboard' : '/shareholder/dashboard'}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => signOut()}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;