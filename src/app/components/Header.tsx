"use client";

import Link from "next/link";
import { useNotification } from "./Notification";
import { signOut, useSession } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function Header() {
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch (error) {
      showNotification("Failed to sign out", "error");
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Home */}
        <Link
          href="/"
          onClick={() => showNotification("Welcome to ImageKit ReelsPro", "info")}
          className="flex items-center gap-2 text-xl font-bold hover:text-gray-300 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Video with AI</span>
        </Link>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-700 transition"
            aria-label="User menu"
          >
            <User className="w-5 h-5" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
              {session ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600">
                    {session.user?.email?.split("@")[0]}
                  </div>
                  <hr className="border-gray-200" />
                  <Link
                    href="/upload"
                    onClick={() => {
                      setDropdownOpen(false);
                      showNotification("Welcome to Admin Dashboard", "info");
                    }}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    Video Upload
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm cursor-pointer text-red-800 hover:bg-gray-100 transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => {
                    setDropdownOpen(false);
                    showNotification("Please sign in to continue", "info");
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
