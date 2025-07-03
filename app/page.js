'use client'

import { useState, useEffect, useRef } from 'react'
import RoastMyEssay from './components/RoastMyEssay'
import { FaChevronDown } from 'react-icons/fa'
import AuthPage from './components/AuthPage'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

export default function Home() {
  const [user, setUser] = useState(null)
  const roastSectionRef = useRef(null)

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
  };

  const scrollToRoast = () => {
    if (roastSectionRef.current) {
      roastSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen transition-all duration-500 bg-gradient-to-br from-dark via-dark-lighter to-dark-light">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 transition-opacity duration-500 opacity-100">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Logout button */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 items-center">
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-lighter hover:bg-dark-light text-white border border-gray-700 shadow transition-all duration-300"
            title="Logout"
          >
            Logout
          </button>
        )}
      </div>

      {/* Public About & How It Works Section */}
      <section className="w-full max-w-3xl mx-auto mt-16 mb-8 px-2 sm:px-4 py-6 sm:py-8 bg-black/60 rounded-2xl shadow-xl backdrop-blur-md border border-gray-800">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center">RoastMyEssay</h1>
        <p className="mb-6 text-base sm:text-lg text-gray-200 text-center">RoastMyEssay is your brutally honest, AI-powered college essay reviewer. Our mission is to help students improve their essays with a mix of humor and actionable feedback, inspired by the Gen Z spirit. We believe feedback should be fun, memorable, and actually useful!</p>
        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-2 text-primary">How it Works</h2>
        <ul className="list-disc list-inside mb-6 text-base sm:text-lg text-gray-300 pl-4">
          <li>Sign up for the account </li>
          <li>Paste your essay and get a roast from our AI admissions officer.</li>
          <li>Receive a savage but constructive critique, a score, and improvement tips.</li>
          <li>Share your roast with friends</li>
          <li>Get free three tries every six hours !</li>
        </ul>
       
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center my-6">
          <img src="/1.png" alt="How it works step 1" className="w-full sm:w-40 h-28 object-cover rounded-lg bg-gray-800" />
          <img src="/2.png" alt="How it works step 2" className="w-full sm:w-40 h-28 object-cover rounded-lg bg-gray-800" />
          <img src="/3.png" alt="How it works step 3" className="w-full sm:w-40 h-28 object-cover rounded-lg bg-gray-800" />
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToRoast}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-primary hover:bg-accent text-white font-bold text-lg shadow-lg flex items-center gap-2 transition-all duration-300"
          >
            Roast My Essay <FaChevronDown className="ml-2 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Auth/Roast Section */}
      <section ref={roastSectionRef} className="w-full flex flex-col items-center justify-center p-4">
        {!user ? (
          <AuthPage onAuth={setUser} />
        ) : (
          <RoastMyEssay user={user} />
        )}
      </section>
    </main>
  )
} 