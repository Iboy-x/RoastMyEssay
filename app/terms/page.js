import React from 'react';

export default function Terms() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-dark via-dark-lighter to-dark-light text-white">
      <div className="max-w-2xl w-full bg-black/60 rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Terms of Service</h1>
        <p className="mb-4 text-lg">By using RoastMyEssay, you agree to the following terms and conditions:</p>
        <ul className="list-disc list-inside mb-4 text-lg">
          <li>Use the service for lawful purposes only</li>
          <li>Do not attempt to abuse, hack, or overload the system</li>
          <li>Respect the usage limits and other users</li>
          <li>We are not responsible for any decisions made based on AI feedback</li>
          <li>We may update these terms at any time</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
        <p className="mb-4 text-lg">RoastMyEssay is provided "as is" without warranties of any kind. We are not liable for any damages or losses resulting from use of the service.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Contact</h2>
        <p className="mb-4 text-lg">For questions about these terms, contact us at <a href="mailto:abdulmoiz29.works@gmail.com.com" className="text-primary underline hover:text-accent">team@roastmyessay.com</a>.</p>
        <p className="text-md text-gray-400 mt-6">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </main>
  );
} 