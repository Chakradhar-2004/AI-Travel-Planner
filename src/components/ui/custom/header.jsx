import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import AuthModal from "../../../constants/authModel.jsx";
import { auth } from "../../../constants/firebase.jsx";
import { Link } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const firebaseAuth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center bg-gradient-to-r from-[#ddb4f6] to-[#8dd0fc]">
      <Link to="/">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="h-[70px] w-[70px] rounded-lg cursor-pointer"
        />
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="flex gap-3">
              <a
                href="/take-ai-help"
                className="no-underline text-inherit focus:outline-none"
              >
                <Button
                  variant="outline"
                  className="rounded-full border-gray-500 hover:border-gray-700 focus:ring-0 focus:outline-none font-bold"
                >
                  Take AI Help 😊
                </Button>
              </a>
              <a
                href="/create-trip"
                className="no-underline text-inherit focus:outline-none"
              >
                <Button
                  variant="outline"
                  className="rounded-full border-gray-500 hover:border-gray-700 focus:ring-0 focus:outline-none font-bold"
                >
                  + Create Trip
                </Button>
              </a>
              <a
                href="/my-trips"
                className="no-underline text-inherit focus:outline-none"
              >
                <Button
                  variant="outline"
                  className="rounded-full border-gray-500 hover:border-gray-700 focus:ring-0 focus:outline-none font-bold"
                >
                  My Trips
                </Button>
              </a>
            </div>
            <span className="text-gray-700">Hello, {user.email}</span>
            <Button onClick={handleLogout} className="bg-black-500">
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-black-500"
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
