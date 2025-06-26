import './globals.css'

export const metadata = {
  title: 'RoastMyEssay 🔥',
  description: 'Get your college essay roasted by a Gen Z admissions officer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-dark text-white">
        {children}
      </body>
    </html>
  )
}
