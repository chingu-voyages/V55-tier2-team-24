import { auth, provider } from '../../utils/firebase' 
import { signInWithPopup } from 'firebase/auth';

export const LoginButton = () => {
const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }     
}


return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      type="button"
      aria-label="Login with Google"
    >
      Login 
    </button>
)
}

