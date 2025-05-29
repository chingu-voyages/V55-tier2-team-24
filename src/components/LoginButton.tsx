import { auth, provider } from "../../utils/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const LoginButton = () => {
  const [userName, setUserName] = useState<string>(
    () => localStorage.getItem("name") || ""
  );
  const [avatar, setAvatar] = useState<string>(
    () => localStorage.getItem("avatar") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("name");
  });
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user.displayName);

      const displayName = result.user.displayName;
      const photoURL = result.user.photoURL;

      if (displayName) {
        setUserName(userName);
        localStorage.setItem("name", displayName);
      }
      if (photoURL) {
        setAvatar(photoURL);
        localStorage.setItem("avatar", photoURL);
      }
      setIsLoggedIn(true);
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    setIsLoggedIn(false);
    setAvatar("");
    setUserName("");
    console.log("User signed out successfully.");
  };

  const toggleDropdown = () => {
    setShowDropdown(prev =>!prev);
  };

  return (
    <div className="items-center sm:space-x-3">
      {!isLoggedIn ? (
        <button
          onClick={handleLogin}
          className="text-xs sm:text-sm px-3 py-1 mr-4 mt-2 sm:px-4 sm:py-2 rounded-full border-2 border-neutral-50 text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 focus:border-neutral-300 focus:outline-none dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
          type="button"
          aria-label="Login with Google"
        >
          LOGIN
        </button>
      ) : (
        <>
        <button
          onClick={toggleDropdown}
          
          type="button"
          aria-label="User logout menu"
        >
          <img 
           src={avatar}
           alt="user's avatar"
           className="block w-10 h-15 sm:w-30 md:w-15 rounded-full mr-4 overflow-hidden border-2 border-gray-500 focus:outline-none focus:border-white"
           />
        
        </button>
       <div className="rounded-lg mr-4 mt-1 flex flex-col items-center absolute right-0 bg-white shadow-lg">
      {showDropdown && (
        <div>
          <button 
            onClick={handleLogout}
            className="block rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-400 hover:text-white"
            >
              LOGOUT
              </button>
          </div>
      )}
      </div>
      </>
  )}
    
    </div>
  );
};
