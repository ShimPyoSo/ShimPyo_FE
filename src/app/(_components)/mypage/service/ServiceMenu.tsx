'use client';

import Image from 'next/image';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import arrow from '/public/images/icons/arrow.svg';
import { useState } from 'react';

export default function ServiceMenu() {
  const [activeMenu, setActiveMenu] = useState<null | 'terms' | 'privacy'>(null);

  return (
    <ul className="pt-[30px] text-xs text-b3 tracking-[-0.02em]">
      <li onClick={() => setActiveMenu(activeMenu === 'terms' ? null : 'terms')}>
        <div
          className={`py-[18px] flex justify-between items-center ${
            activeMenu === 'terms' ? '' : 'border-b border-w6'
          }`}
        >
          <p>서비스 약관</p>
          <Image
            className={`transition-transform duration-300 ${activeMenu === 'terms' ? '' : 'rotate-180'}`}
            src={arrow}
            alt="더보기"
            width={24}
            height={24}
          />
        </div>
        {activeMenu === 'terms' && <TermsOfService />}
      </li>
      <li onClick={() => setActiveMenu(activeMenu === 'privacy' ? null : 'privacy')}>
        <div
          className={`py-[18px] flex justify-between items-center ${
            activeMenu === 'privacy' ? '' : 'border-b border-w6'
          }`}
        >
          <p>개인정보 처리 방침</p>
          <Image
            className={`transition-transform duration-300 ${activeMenu === 'privacy' ? '' : 'rotate-180'}`}
            src={arrow}
            alt="더보기"
            width={24}
            height={24}
          />
        </div>

        {activeMenu === 'privacy' && <PrivacyPolicy />}
      </li>
    </ul>
  );
}
