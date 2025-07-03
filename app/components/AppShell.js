"use client";
import Navbar from './Navbar';
import Footer from './Footer';

export default function AppShell({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      <Footer />
    </>
  );
} 