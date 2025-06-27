'use client'

import { useState, useEffect } from 'react'
import RoastMyEssay from './components/RoastMyEssay'
import { FaVenus, FaMars } from 'react-icons/fa'
import AuthPage from './components/AuthPage'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

export default function Home() {
  const [isMasculineTheme, setIsMasculineTheme] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <AuthPage onAuth={setUser} />
  }

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
  };

  return (
    <main className={`min-h-screen transition-all duration-500 ${
      isMasculineTheme 
        ? 'bg-gradient-to-br from-dark via-dark-lighter to-dark-light' 
        : 'bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900'
    }`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isMasculineTheme ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isMasculineTheme ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-fuchsia-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Theme toggle and logout */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 items-center">
        <button
          onClick={() => setIsMasculineTheme(!isMasculineTheme)}
          className={`p-3 rounded-full transition-all duration-300 ${
            isMasculineTheme 
              ? 'bg-dark-lighter text-primary hover:bg-dark-light' 
              : 'bg-indigo-800 text-fuchsia-400 hover:bg-indigo-700'
          }`}
          title={isMasculineTheme ? "Switch to Feminine Theme" : "Switch to Masculine Theme"}
        >
          {isMasculineTheme ? <FaMars className="text-xl" /> : <FaVenus className="text-xl" />}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-lighter hover:bg-dark-light text-white border border-gray-700 shadow transition-all duration-300"
          title="Logout"
        >
          Logout
        </button>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 transition-all duration-500 ${
            isMasculineTheme
              ? 'bg-gradient-to-r from-primary to-accent'
              : 'bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-rose-400'
          } bg-clip-text text-transparent`}>
            RoastMyEssay
          </h1>
          <p className={`text-lg transition-colors duration-500 ${
            isMasculineTheme ? 'text-gray-400' : 'text-indigo-200'
          }`}>
            Let AI roast your college essay with savage honesty 🔥
          </p>
        </div>

        <RoastMyEssay isMasculineTheme={isMasculineTheme} user={user} />
      </div>
    </main>
  )
} 
