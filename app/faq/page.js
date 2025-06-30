import React from 'react';

const faqs = [
  {
    q: 'Is RoastMyEssay free to use?',
    a: 'You can roast up to 3 essays every 6 hours for free! We may add premium features in the future.'
  },
  {
    q: 'How does the AI work?',
    a: 'We use advanced AI models to analyze your essay and generate a roast, score, and suggestions.'
  },
  {
    q: 'Is my essay data safe?',
    a: 'Yes! We do not share your essays. we might use it to improve our AI, but it will be anonymized and aggregated.'
  },
  {
    q: 'Can I share my roast?',
    a: 'Absolutely! You can share your roast on WhatsApp, Instagram, or copy it to share anywhere.'
  },
  {
    q: 'Who is behind RoastMyEssay?',
    a: 'A team of students and developers passionate about education, tech, and humor.'
  },
];

export default function FAQ() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-dark via-dark-lighter to-dark-light text-white">
      <div className="max-w-2xl w-full bg-black/60 rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Frequently Asked Questions</h1>
        <ul className="space-y-6">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <h2 className="text-xl font-semibold mb-2 text-primary">{faq.q}</h2>
              <p className="text-lg text-gray-200">{faq.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
} 