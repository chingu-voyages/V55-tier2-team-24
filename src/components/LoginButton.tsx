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

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user.displayName);

      const displayName = result.user.displayName;
      const photoURL = result.user.photoURL;

      if (displayName) {
        setUserName(displayName);
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

  return (
    <div className="flex items-center sm:space-x-3">
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-neutral-50 text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 focus:border-neutral-300 focus:outline-none dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
          type="button"
          aria-label="Login with Google"
        >
          LOGOUT
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-neutral-50 text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 focus:border-neutral-300 focus:outline-none dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
          type="button"
          aria-label="Logout"
        >
          LOGIN
        </button>
      )}
      {userName && (
        <div className="mr-4 flex items-center">
          <img
            src={avatar}
            alt="User's avatar"
            className="w-25 sm:w-30 md:w-15 m-2 aspect-square object-cover rounded-full "
          />
        </div>
      )}
    </div>
  );
};
