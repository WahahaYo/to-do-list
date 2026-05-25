import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo application with Next.js and Drizzle ORM',
  openGraph: {
    title: 'Todo App - 待办事项管理',
    description: '高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。',
    url: 'https://47.120.66.206',
    siteName: 'Todo App',
    images: [
      {
        url: 'https://47.120.66.206/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Todo App - 待办事项管理',
      },
    ],
    locale: 'zh-CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todo App - 待办事项管理',
    description: '高效管理您的日常任务，提升工作效率。',
    images: ['https://47.120.66.206/og-image.svg'],
  },
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
          src="https://47.120.66.206:3000/script.js"
          data-website-id="591a6571-243d-4248-be3a-35ccc357be3a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}