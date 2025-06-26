"use client"
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { FaGoogle, FaSignOutAlt, FaVenus, FaMars } from "react-icons/fa";

// TODO: Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDJPEu6j4LSv4vI43G-Cbr9_iKtErb9pnM",
    authDomain: "roastmyessay.firebaseapp.com",
    projectId: "roastmyessay",
    appId: "1:871652459681:web:e7bd3a6ad20bf05477dce0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const masculineTheme = {
  bg: "bg-gradient-to-br from-dark via-dark-lighter to-dark-light",
  card: "bg-[#2d2d2d]/80 border border-[#404040]",
  primary: "#ff4d4d",
  accent: "#ff6b6b",
  text: "text-white",
  border: "border-[#404040]",
  button: "bg-[#ff4d4d] hover:bg-[#ff6b6b]",
  input: "bg-[#2d2d2d] border-[#404040] text-white",
};
const feminineTheme = {
  bg: "bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900",
  card: "bg-[rgba(79,70,229,0.2)] border border-[#818cf8]",
  primary: "#e879f9",
  accent: "#a855f7",
  text: "text-white",
  border: "border-[#818cf8]",
  button: "bg-[#e879f9] hover:bg-[#a855f7]",
  input: "bg-[rgba(79,70,229,0.2)] border-[#818cf8] text-white",
};

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isMasculineTheme, setIsMasculineTheme] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const theme = isMasculineTheme ? masculineTheme : feminineTheme;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) onAuth(user);
    });
    return () => unsubscribe();
  }, [onAuth]);

  const getFriendlyError = (err) => {
    if (!err || !err.code) return err.message || 'An error occurred.';
    switch (err.code) {
      case 'auth/user-not-found':
        return 'No account found with this email. Want to sign up instead?';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'This email is already in use. Want to log in instead?';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was cancelled.';
      case 'auth/invalid-credential':
        return 'Invalid credentials. Please check your email and password or try another login method.';
      case 'auth/email-not-verified':
        return 'Please verify your email before logging in. Check your inbox.';
      default:
        return 'Something went wrong. Please try again or contact support.';
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result.user.emailVerified) {
        setError('Your Google account email is not verified.');
        await signOut(auth);
        setLoading(false);
        return;
      }
      onAuth(result.user);
    } catch (err) {
      setError(getFriendlyError(err));
    }
    setLoading(false);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setVerificationSent(false);
    setPendingVerification(false);
    try {
      let userCred;
      if (isLogin) {
        userCred = await signInWithEmailAndPassword(auth, email, password);
        if (!userCred.user.emailVerified) {
          setPendingVerification(true);
          await signOut(auth);
          throw { code: 'auth/email-not-verified', message: 'Please verify your email address. Check your inbox for a verification link.' };
        }
      } else {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCred.user);
        setVerificationSent(true);
        setPendingVerification(true);
        await signOut(auth);
        setLoading(false);
        return;
      }
      onAuth(userCred.user);
    } catch (err) {
      setError(getFriendlyError(err));
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    onAuth(null);
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${theme.bg} transition-all duration-500`}>
      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 items-center">
        {user && !user.emailVerified && (
          <span className="text-yellow-400 font-semibold">Verify your email to continue</span>
        )}
        {user && !pendingVerification && !verificationSent && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-lighter hover:bg-dark-light text-white border border-gray-700 shadow transition-all duration-300"
            title="Logout"
          >
            <FaSignOutAlt className="text-lg" /> Logout
          </button>
        )}
        <button
          onClick={() => setIsMasculineTheme(!isMasculineTheme)}
          className={`p-3 rounded-full transition-all duration-300 border-2 ${isMasculineTheme ? 'bg-[#2d2d2d] border-[#404040] text-[#ff4d4d]' : 'bg-[rgba(79,70,229,0.2)] border-[#818cf8] text-[#e879f9]'}`}
          title={isMasculineTheme ? "Switch to Feminine Theme" : "Switch to Masculine Theme"}
        >
          {isMasculineTheme ? <FaMars className="text-xl" /> : <FaVenus className="text-xl" />}
        </button>
      </div>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg ${theme.card} border-2 transition-all duration-500`} style={{boxShadow: `0 8px 40px 0 ${theme.primary}33`}}>
        <h2 className={`text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r ${isMasculineTheme ? 'from-[#ff4d4d] to-[#ff6b6b]' : 'from-[#e879f9] via-[#a855f7] to-[#818cf8]'}`}
          style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          {isLogin ? "Login to RoastMyEssay" : "Sign Up for RoastMyEssay"}
        </h2>
        {verificationSent && (
          <div className="mb-4 text-green-400 text-center font-semibold bg-green-900/20 rounded-lg py-2 px-3">
            Account created! Please verify your email by visiting your inbox before logging in.
          </div>
        )}
        {pendingVerification && (
          <div className="mb-4 text-yellow-400 text-center font-semibold bg-yellow-900/20 rounded-lg py-2 px-3">
            Please verify your email before logging in.
          </div>
        )}
        <button
          onClick={handleGoogle}
          className={`w-full py-2 mb-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg ${theme.button} text-white transition-all duration-300`}
          disabled={loading}
        >
          <FaGoogle className="text-lg" /> Continue with Google
        </button>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${theme.primary}] ${theme.input} transition-all duration-300`}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${theme.primary}] ${theme.input} transition-all duration-300`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            disabled={loading}
          />
          {error && <div className="text-red-400 text-sm text-center font-semibold bg-red-900/20 rounded-lg py-2 px-3">{error}</div>}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg ${theme.button} text-white transition-all duration-300`}
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            className={`font-semibold ${isMasculineTheme ? 'text-[#ff4d4d]' : 'text-[#e879f9]'} hover:underline transition-all duration-300`}
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
} 
