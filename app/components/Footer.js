"use client";
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Footer() {
  const [totalRoasts, setTotalRoasts] = useState(null);

  useEffect(() => {
    async function fetchRoastCount() {
      const counterRef = doc(db, 'stats', 'roastCounter');
      const snap = await getDoc(counterRef);
      if (snap.exists()) {
        setTotalRoasts(snap.data().count);
      } else {
        setTotalRoasts(223);
      }
    }
    fetchRoastCount();
  }, []);

  return (
    <footer className="w-full py-6 bg-dark text-gray-300 text-center">
      <div className="mb-1 text-base font-semibold text-primary">
        {totalRoasts !== null ? `🔥 Essays Roasted: ${totalRoasts}` : 'Loading roast count...'}
      </div>
      <div className="text-xs text-gray-500">
        © 2025 RoastMyEssay. All rights reserved.
      </div>
      <div className="text-xs text-yellow-400 mt-2">
        🚨 Roasts are for laughs & learning — not for Ivy League guarantees. Use responsibly 😎
      </div>
    </footer>
  );
} 