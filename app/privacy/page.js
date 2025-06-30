import React from 'react';

export default function Privacy() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-dark via-dark-lighter to-dark-light text-white">
      <div className="max-w-2xl w-full bg-black/60 rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Privacy Policy</h1>
        <p className="mb-4 text-lg">Your privacy is important to us. This policy explains what information we collect and how we use it.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside mb-4 text-lg">
          <li>Email address (for authentication)</li>
          <li>Usage data (number of roasts, for rate limiting)</li>
          <li>We <span className="font-bold text-primary">might</span> store your essay content</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-4 text-lg">
          <li>To provide and improve our service</li>
          <li>To prevent abuse and enforce usage limits</li>
          <li>To communicate important updates</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Third-Party Services</h2>
        <p className="mb-4 text-lg">We use Firebase for authentication and a third-party AI API for essay analysis. These services may collect data as described in their own privacy policies.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Your Rights</h2>
        <ul className="list-disc list-inside mb-4 text-lg">
          <li>You can request deletion of your account at any time</li>
          <li>Contact us at <a href="mailto:abdulmoiz29.works@gmail.com.com" className="text-primary underline hover:text-accent">team@roastmyessay.com</a> for privacy questions</li>
        </ul>
        <p className="text-md text-gray-400 mt-6">This policy may be updated from time to time. Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </main>
  );
} 