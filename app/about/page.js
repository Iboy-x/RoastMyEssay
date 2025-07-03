import React from 'react';

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-dark via-dark-lighter to-dark-light text-white">
      <div className="max-w-2xl w-full bg-black/60 rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">About RoastMyEssay</h1>
        <p className="mb-4 text-lg">RoastMyEssay is your brutally honest, AI-powered college essay reviewer. Our mission is to help students improve their essays with a mix of humor and actionable feedback, inspired by the Gen Z spirit. We believe feedback should be fun, memorable, and actually useful!</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">How it Works</h2>
        <ul className="list-disc list-inside mb-4 text-lg">
          <li>Paste your essay in the box provided and press the roast button and then get a roast from our AI admissions officer.</li>
          <li>Receive a savage but constructive critique, a score, and improvement tips.</li>
          <li>Share your roast with friends or keep it for yourself! </li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Power behind </h2>
        <p className="mb-2 text-lg">RoastMyEssay was built by a passionate student and developer who want to make the college application process less stressful and a lot more fun. We combine tech, humor, and a love for education to bring you the best essay feedback experience online.</p>
        <p className="text-md text-gray-400">Want to join us or have feedback? <a href="/contact" className="text-primary underline hover:text-accent">Contact us here</a>.</p>
      </div>
    </main>
  );
} 