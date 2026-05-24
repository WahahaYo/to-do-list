import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo application with Next.js and Drizzle ORM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        {children}
        <Script
          src="/script.js"
          data-website-id="591a6571-243d-4248-be3a-35ccc357be3a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}