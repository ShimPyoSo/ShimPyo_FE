import './globals.css';

import ClientSideEffectWrapper from './ClientSideEffectWrapper';
import Header from './(_components)/UI/Header';
import type { Metadata } from 'next';
import Providers from './Providers';
import TabBar from './(_components)/UI/TabBar';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shimpyo.co.kr/'),
  title: '쉼표',
  description: '당신을 위한 쉼, 웰니스 여행의 시작',
  icons: {
    icon: [{ url: '/images/icons/logo.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: '쉼표',
    description: '당신을 위한 쉼, 웰니스 여행의 시작',
    url: 'https://www.shimpyo.co.kr/',
    images: [
      {
        url: '/images/openGraph.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '쉼표',
    description: '당신을 위한 쉼, 웰니스 여행의 시작',
    images: ['/images/openGraph.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="w-full h-full bg-white">
        <div className="relative flex justify-center items-center min-h-screen">
          <div className="w-[375px] h-screen overflow-hidden relative z-10 flex justify-center items-center">
            <div className="bg-white h-full w-full flex flex-col relative">
              <Providers>
                <ClientSideEffectWrapper />
                <Header />
                <div className="flex-1 overflow-auto scrollbar-hide bg-w1">{children}</div>
                <TabBar />
              </Providers>
            </div>
          </div>

          <div className="absolute top-0 right-[140px] bottom-0 p-4 z-0 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
              <h2 className="text-xl font-bold text-center">Main 문구 들어갈 위치</h2>
              <p className="text-center">description 위치</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
