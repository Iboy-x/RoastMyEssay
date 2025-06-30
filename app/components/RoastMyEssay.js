'use client'

import { useState, useEffect } from 'react'
import { FaWhatsapp, FaTiktok, FaCopy, FaFire } from 'react-icons/fa'
import styles from './RoastMyEssay.module.css'

const USAGE_LIMIT = 3;
const USAGE_WINDOW_HOURS = 6;

export default function RoastMyEssay({ isMasculineTheme, user }) {
  const [essay, setEssay] = useState('')
  const [roast, setRoast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [usageCount, setUsageCount] = useState(0);
  const [usageFirst, setUsageFirst] = useState(null);
  const [limitError, setLimitError] = useState(null);
  const [nextTry, setNextTry] = useState(null);

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

  return (
    <div className={`${styles.container} ${isMasculineTheme ? styles.masculineTheme : styles.feminineTheme}`}>
      <div className="mb-4 text-center">
        <span className="font-semibold">Roasts used: {usageCount} / {USAGE_LIMIT}</span>
        {limitError && (
          <div className="mt-2 text-yellow-400 font-semibold">{limitError}</div>
        )}
        {nextTry && limitError && (
          <div className="text-sm text-gray-400">Next try: {nextTry.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</div>
        )}
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
              onClick={shareToWhatsApp}
              className={`${styles.shareButton} ${styles.whatsappButton}`}
            >
              <FaWhatsapp /> Share on WhatsApp
            </button>
            <button
              onClick={shareToTikTok}
              className={`${styles.shareButton} ${styles.tiktokButton}`}
            >
              <FaTiktok /> Share on TikTok
            </button>
            <button
              onClick={shareToTikTok}
              className={`${styles.shareButton} ${styles.copyButton}`}
            >
              <FaCopy /> {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 