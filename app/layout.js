import './globals.css'
import AppShell from './components/AppShell'
import { Fragment } from 'react';

export const metadata = {
  title: 'RoastMyEssay 🔥',
  description: 'Get your college essay roasted by a Gen Z admissions officer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1035093966063397"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen bg-dark text-white flex flex-col min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
