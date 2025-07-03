"use client";
import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-dark via-dark-lighter to-dark-light text-white">
      <div className="max-w-lg w-full bg-black/60 rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contact Us</h1>
        <p className="mb-6 text-lg">Have questions, feedback, or partnership ideas? Fill out the form below or email us at  <a href="mailto:abdulmoiz29.works@gmail.com" className="text-primary underline hover:text-accent">abdulmoiz29.works@gmail.com</a>.</p>
        {submitted ? (
          <div className="text-green-400 font-semibold text-center">Thank you for reaching out! We'll get back to you soon.</div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-gray-700 text-white focus:outline-none" />
            <input type="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-gray-700 text-white focus:outline-none" />
            <textarea placeholder="Your Message" required className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-gray-700 text-white focus:outline-none min-h-[120px]" />
            <button type="submit" className="w-full py-3 rounded-lg bg-primary hover:bg-accent font-bold text-white transition-all">Send Message</button>
          </form>
        )}
      </div>
    </main>
  );
} 