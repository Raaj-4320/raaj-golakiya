import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Raj Golakiya — AI/ML Engineer & Full Stack Developer',
  description:
    'AI/ML Engineer and Full Stack Developer building scalable, data-driven applications. Specializing in machine learning systems, real-time applications, and modern web architectures.',
  keywords: [
    'AI/ML Engineer',
    'Full Stack Developer',
    'Software Engineer',
    'React',
    'Node.js',
    'Python',
    'Machine Learning',
    'TensorFlow',
    'NLP',
    'Toronto',
    'Canada',
  ],
  authors: [{ name: 'Raj Golakiya' }],
  openGraph: {
    title: 'Raj Golakiya — AI/ML Engineer & Full Stack Developer',
    description:
      'Building scalable, data-driven applications with machine learning, real-time systems, and modern web architectures.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Golakiya — AI/ML Engineer & Full Stack Developer',
    description: 'Building scalable, data-driven applications.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  )
}
