import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo application with Next.js and Drizzle ORM',
  openGraph: {
    title: 'Todo App - 待办事项管理',
    description: '高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。',
    url: 'http://47.120.66.206',
    siteName: 'Todo App',
    images: [
      {
        url: 'http://47.120.66.206/og-image.png',
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
    images: ['http://47.120.66.206/og-image.png'],
  },
  other: {
    'qq:card': 'summary',
    'qq:title': 'Todo App - 待办事项管理',
    'qq:description': '高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。',
    'qq:image': 'http://47.120.66.206/og-image.png',
    'qq:url': 'http://47.120.66.206',
    'og:type': 'website',
    'og:site_name': 'Todo App',
    'og:title': 'Todo App - 待办事项管理',
    'og:description': '高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。',
    'og:image': 'http://47.120.66.206/og-image.png',
    'og:url': 'http://47.120.66.206',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 添加额外的meta标签，确保QQ能识别 */}
        <meta property="og:title" content="Todo App - 待办事项管理" />
        <meta property="og:description" content="高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。" />
        <meta property="og:image" content="http://47.120.66.206/og-image.png" />
        <meta property="og:url" content="http://47.120.66.206" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Todo App" />
        <meta name="qq:card" content="summary" />
        <meta name="qq:title" content="Todo App - 待办事项管理" />
        <meta name="qq:description" content="高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。" />
        <meta name="qq:image" content="http://47.120.66.206/og-image.png" />
        <meta name="qq:url" content="http://47.120.66.206" />
      </head>
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