'use client'

import { useState, useEffect } from 'react'
import { FaWhatsapp, FaTiktok, FaCopy, FaFire } from 'react-icons/fa'
import styles from './RoastMyEssay.module.css'
import html2canvas from 'html2canvas'
import { doc, getDoc, setDoc, updateDoc, increment, collection, addDoc, serverTimestamp, query, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

const USAGE_LIMIT = 3;
const USAGE_WINDOW_HOURS = 6;

export default function RoastMyEssay({ user }) {
  const [essay, setEssay] = useState('')
  const [roast, setRoast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [usageCount, setUsageCount] = useState(0);
  const [usageFirst, setUsageFirst] = useState(null);
  const [limitError, setLimitError] = useState(null);
  const [nextTry, setNextTry] = useState(null);
  const [totalRoasts, setTotalRoasts] = useState(null);

  function getUserKey() {
    if (user && user.email) return `roast_usage_${user.email}`;
    return 'roast_usage_guest';
  }

  function getUsageData() {
    const data = localStorage.getItem(getUserKey());
    if (!data) return { count: 0, first: null };
    try {
      return JSON.parse(data);
    } catch {
      return { count: 0, first: null };
    }
  }

  function setUsageData(count, first) {
    localStorage.setItem(getUserKey(), JSON.stringify({ count, first }));
  }

  useEffect(() => {
    const { count, first } = getUsageData();
    setUsageCount(count);
    setUsageFirst(first);
    if (count >= USAGE_LIMIT && first) {
      const next = new Date(new Date(first).getTime() + USAGE_WINDOW_HOURS * 60 * 60 * 1000);
      setNextTry(next);
      if (new Date() < next) {
        setLimitError(`You have reached your free limit. Try again at ${next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`);
      } else {
        setUsageCount(0);
        setUsageFirst(null);
        setUsageData(0, null);
        setLimitError(null);
        setNextTry(null);
      }
    } else {
      setLimitError(null);
      setNextTry(null);
    }
    // re-run when user changes
    // eslint-disable-next-line
  }, [user && user.email]);

  // Fetch roast count on mount
  useEffect(() => {
    async function fetchRoastCount() {
      const counterRef = doc(db, 'stats', 'roastCounter');
      const snap = await getDoc(counterRef);
      if (snap.exists()) {
        setTotalRoasts(snap.data().count);
      } else {
        // Initialize with 223 if not present
        await setDoc(counterRef, { count: 223 });
        setTotalRoasts(223);
      }
    }
    fetchRoastCount();
  }, []);

  // Increment roast count after successful roast
  const incrementRoastCount = async () => {
    const counterRef = doc(db, 'stats', 'roastCounter');
    await updateDoc(counterRef, { count: increment(1) });
    const snap = await getDoc(counterRef);
    setTotalRoasts(snap.data().count);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!essay.trim()) return
    if (usageCount >= USAGE_LIMIT && usageFirst) {
      const next = new Date(new Date(usageFirst).getTime() + USAGE_WINDOW_HOURS * 60 * 60 * 1000);
      setNextTry(next);
      setLimitError(`You have reached your free limit. Try again at ${next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`);
      return;
    }
    setLoading(true)
    setError(null)
    setRoast(null)

    try {
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ essay }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get roast')
      }
      
      setRoast(data)
      await incrementRoastCount();
      // Update usage count
      let count = usageCount + 1;
      let first = usageFirst;
      if (!first) first = new Date().toISOString();
      setUsageCount(count);
      setUsageFirst(first);
      setUsageData(count, first);
      if (count >= USAGE_LIMIT) {
        const next = new Date(new Date(first).getTime() + USAGE_WINDOW_HOURS * 60 * 60 * 1000);
        setNextTry(next);
        setLimitError(`You have reached your free limit. Try again at ${next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`);
      }

      if (user && user.uid) {
        await addDoc(
          collection(db, 'essays', user.uid, 'userEssays'),
          {
            essayText: essay,
            roastResult: data,
            createdAt: serverTimestamp(),
            uid: user.uid,
          }
        );
      }
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'Oops! Something went wrong. Try again?')
    } finally {
      setLoading(false)
    }
  }

  const shareToWhatsApp = () => {
    const text = `🔥 My College Essay Roast 🔥\n\n${roast.roast}\n\nAdmission Chance: ${roast.admissionChance}/100\n\nVerdict: ${roast.verdict}\n\nCheck out RoastMyEssay to roast your essay too!`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const shareToTikTok = () => {
    const text = `🔥 My College Essay Roast 🔥\n\n${roast.roast}\n\nAdmission Chance: ${roast.admissionChance}/100\n\nVerdict: ${roast.verdict}\n\nCheck out RoastMyEssay to roast your essay too!`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Helper to generate a shareable card image
  const generateCardImage = async () => {
    const card = document.getElementById('shareable-roast-card');
    if (!card) return null;
    const canvas = await html2canvas(card, { backgroundColor: null, useCORS: true });
    return canvas.toDataURL('image/png');
  };

  const shareCardImage = async () => {
    const imgData = await generateCardImage();
    if (imgData) {
      try {
        const res = await fetch(imgData);
        const blob = await res.blob();
        if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'roast.png', { type: 'image/png' })] })) {
          await navigator.share({
            files: [new File([blob], 'roast.png', { type: 'image/png' })],
            title: 'RoastMyEssay Result',
            text: 'Check out my college essay roast!'
          });
        } else {
          alert('Sharing as image is not supported in this browser. Try copying instead.');
        }
      } catch (e) {
        alert('Sharing failed. Try copying instead.');
      }
    }
  };

  const copyCardImage = async () => {
    const imgData = await generateCardImage();
    if (imgData) {
      try {
        const res = await fetch(imgData);
        const blob = await res.blob();
        await navigator.clipboard.write([
          new window.ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        setCopied(false);
        alert('Copying image is not supported in this browser.');
      }
    }
  };

  return (
    <div className={styles.container + ' ' + styles.masculineTheme}>
      <div className="mb-4 text-center">
        <span className="font-semibold">Roasts used: {usageCount} / {USAGE_LIMIT}</span>
        {limitError && (
          <div className="mt-2 text-yellow-400 font-semibold">{limitError}</div>
        )}
        {nextTry && limitError && (
          <div className="text-sm text-gray-400">Next try: {nextTry.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</div>
        )}
      </div>
      <div className="mb-2 text-center text-lg font-semibold text-primary">
        {totalRoasts !== null ? `🔥 Essays Roasted: ${totalRoasts}` : 'Loading roast count...'}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.textareaContainer}>
          <textarea
            className={styles.textarea}
            placeholder="Paste your college essay here... 👀"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
          />
          <div className={styles.charCount}>
            {essay.length} characters
          </div>
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={loading || !essay.trim() || !!limitError}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Roasting...
            </>
          ) : (
            <>
              <FaFire className="text-xl" /> Roast Me 🔥
            </>
          )}
        </button>
      </form>

      {error && (
        <div className={styles.error}>
          <p className="font-bold mb-2">Error:</p>
          <p>{error}</p>
          <p className="mt-2 text-sm">Please try again or check your API key.</p>
        </div>
      )}

      {roast && (
        <>
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <div
            id="shareable-roast-card"
            className={`${styles.resultCard} ${styles.masculineTheme}`}
            style={{ width: 400, padding: 24, fontFamily: 'inherit', color: 'var(--text-color)', background: 'var(--card-bg)', border: '2px solid var(--primary-color)' }}
          >
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🔥 RoastMyEssay Result</h2>
            <div style={{ marginBottom: 16, fontSize: 18, fontWeight: 500 }}>{roast.roast}</div>
            <div style={{ marginBottom: 12, fontSize: 16 }}><b>Admission Chance:</b> <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>{roast.admissionChance}/100</span></div>
            <div style={{ marginBottom: 12 }}>
              <b>Suggestions:</b>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {roast.suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div style={{ fontStyle: 'italic', fontWeight: 600, marginTop: 16, background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{roast.verdict}</div>
            <div style={{ marginTop: 18, fontSize: 12, color: 'var(--accent-color)' }}>roastmyessay.com</div>
          </div>
        </div>
        <div className={styles.resultCard}>
          <div className="space-y-4">
            <div className={styles.roastSection}>
              <p className="text-lg font-medium">{roast.roast}</p>
            </div>
            
            <div className={styles.scoreSection}>
              <span className="font-bold">Admission Chance:</span>
              <span className="text-2xl font-bold text-primary">{roast.admissionChance}/100</span>
            </div>

            <div className={styles.suggestionsSection}>
              <h3 className="font-bold">Suggestions for Improvement:</h3>
              <ul className="list-disc list-inside space-y-1">
                {roast.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>

            <p className={styles.verdict}>
              {roast.verdict}
            </p>
          </div>

          <div className={styles.shareButtons}>
            <button
              onClick={shareCardImage}
              className={`${styles.shareButton} ${styles.copyButton}`}
            >
              <FaFire /> Share as Image
            </button>
            <button
              onClick={copyCardImage}
              className={`${styles.shareButton} ${styles.copyButton}`}
            >
              <FaCopy /> {copied ? 'Card Copied!' : 'Copy Card as Image'}
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export async function getEssayHistory(user) {
  if (!user || !user.uid) return [];
  const q = query(
    collection(db, 'essays', user.uid, 'userEssays'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} 