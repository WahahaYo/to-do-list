import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

// 域名配置 - 替换为你的实际域名
const DOMAIN = 'hajiminbld.eu.cc'
const BASE_URL = `https://${DOMAIN}`

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo application with Next.js and Drizzle ORM',
  openGraph: {
    title: 'Todo App - 待办事项管理',
    description: '高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。',
    url: BASE_URL,
    siteName: 'Todo App',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Todo App - 待办事项管理',
        type: 'image/png',
      },
    ],
    locale: 'zh-CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todo App - 待办事项管理',
    description: '高效管理您的日常任务，提升工作效率。',
    images: [`${BASE_URL}/og-image.png`],
    site: '@todoapp',
    creator: '@todoapp',
  },
  other: {
    'qq:card': 'summary',
    'qq:title': 'Todo App - 待办事项管理',
    'qq:description': '高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。',
    'qq:image': `${BASE_URL}/og-image.png`,
    'qq:url': BASE_URL,
    'og:type': 'website',
    'og:site_name': 'Todo App',
    'og:title': 'Todo App - 待办事项管理',
    'og:description': '高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。',
    'og:image': `${BASE_URL}/og-image.png`,
    'og:url': BASE_URL,
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
        {/* 基础meta标签 */}
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph 基础标签 */}
        <meta property="og:title" content="Todo App - 待办事项管理" />
        <meta property="og:description" content="高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。" />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Todo App" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />

        {/* Twitter 卡片 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Todo App - 待办事项管理" />
        <meta name="twitter:description" content="高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。" />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
        <meta name="twitter:site" content="@todoapp" />

        {/* QQ 特定标签 */}
        <meta name="qq:card" content="summary" />
        <meta name="qq:title" content="Todo App - 待办事项管理" />
        <meta name="qq:description" content="高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。" />
        <meta name="qq:image" content={`${BASE_URL}/og-image.png`} />
        <meta name="qq:url" content={BASE_URL} />
        <meta name="qq:appid" content="10000000" />

        {/* 微信特定标签 */}
        <meta name="wechat:card" content="summary" />
        <meta name="wechat:title" content="Todo App - 待办事项管理" />
        <meta name="wechat:description" content="高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。" />
        <meta name="wechat:image" content={`${BASE_URL}/og-image.png`} />

        {/* 移动应用元数据 */}
        <meta name="application-name" content="Todo App" />
        <meta name="theme-color" content="#3B82F6" />

        {/* 搜索优化 */}
        <link rel="canonical" href={BASE_URL} />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
        {/* Umami 跟踪代码 */}
        <Script
          src={`${BASE_URL}/script.js`}
          data-website-id="591a6571-243d-4248-be3a-35ccc357be3a"
          strategy="afterInteractive"
        />
        {/* QQ分享SDK */}
        <Script
          src="https://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js"
          strategy="afterInteractive"
        />
        <Script id="qq-share-script" strategy="afterInteractive">
          {`
            // QQ分享初始化
            window.addEventListener('load', function() {
              if (window.qc) {
                qc.init({
                  appId: '10000000',
                  share: {
                    title: 'Todo App - 待办事项管理',
                    desc: '高效管理您的日常任务，提升工作效率。',
                    image: '${BASE_URL}/og-image.png',
                    url: '${BASE_URL}'
                  }
                });
              }
            });
            
            // QQ分享函数
            window.shareToQQ = function() {
              var shareData = {
                title: 'Todo App - 待办事项管理',
                desc: '高效管理您的日常任务，提升工作效率。支持任务创建、编辑、删除和状态管理。',
                image: '${BASE_URL}/og-image.png',
                url: '${BASE_URL}',
                site: 'Todo App'
              };
              
              // 使用QQ分享API
              if (window.qc && qc.share) {
                qc.share('qzone', shareData);
              } else {
                // 备用方案：打开QQ分享页面
                var url = 'https://connect.qq.com/widget/shareqq/index.html?' +
                  'url=' + encodeURIComponent(shareData.url) +
                  '&title=' + encodeURIComponent(shareData.title) +
                  '&desc=' + encodeURIComponent(shareData.desc) +
                  '&pics=' + encodeURIComponent(shareData.image);
                window.open(url, '_blank', 'width=700,height=500');
              }
            };
          `}
        </Script>
      </body>
    </html>
  )
}