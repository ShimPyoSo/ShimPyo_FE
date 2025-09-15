import './globals.css';

import BackgroundSection from './(_components)/UI/BackgroundSection';
import ClientSideEffectWrapper from './ClientSideEffectWrapper';
import Header from './(_components)/UI/Header';
import type { Metadata } from 'next';
import Providers from './Providers';
import { Suspense } from 'react';
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
        <div className="flex justify-center items-center min-h-screen gap-[40px]">
          <div className="xl:ml-[380px] w-[375px] h-screen overflow-hidden flex flex-col relative z-10">
            <div className="bg-white h-full w-full flex flex-col relative">
              <Providers>
                <Suspense>
                  <ClientSideEffectWrapper />
                  <Header />
                </Suspense>
                <div className="flex-1 overflow-auto scrollbar-hide bg-w1 pb-[100px]">{children}</div>
                <TabBar />
              </Providers>
            </div>
          </div>
          <BackgroundSection />
        </div>
      </body>
    </html>
  );
}
