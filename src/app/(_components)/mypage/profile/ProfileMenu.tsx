'use client';

import Image from 'next/image';
import LogoutButton from './LogoutButton';
import NicknameChange from './NicknameChange';
import PasswordChange from './PasswordChange';
import Withdraw from './Withdraw';
import arrow from '/public/images/icons/arrow.svg';
import { useState } from 'react';

interface ProfileMenuProps {
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileMenu({ setIsAlertOpen }: ProfileMenuProps) {
  const [activeMenu, setActiveMenu] = useState<null | 'profile' | 'password' | 'withdraw'>(null);

  return (
    <ul className="pt-[30px] text-xs text-b3 tracking-[-2%]">
      <li>
        <div
          className={`py-[18px] flex justify-between items-center ${
            activeMenu === 'profile' ? '' : 'border-b border-w6'
          }`}
          onClick={() => setActiveMenu(activeMenu === 'profile' ? null : 'profile')}
        >
          <p>프로필 관리</p>
          <Image
            className={`transition-transform duration-300 ${activeMenu === 'profile' ? '' : 'rotate-180'}`}
            src={arrow}
            alt="더보기"
            width={24}
            height={24}
          />
        </div>
        {activeMenu === 'profile' && <NicknameChange />}
      </li>
      <li>
        <div
          className={`py-[18px] flex justify-between items-center ${
            activeMenu === 'password' ? '' : 'border-b border-w6'
          }`}
          onClick={() => setActiveMenu(activeMenu === 'password' ? null : 'password')}
        >
          <p>비밀번호 관리</p>
          <Image
            className={`transition-transform duration-300 ${activeMenu === 'password' ? '' : 'rotate-180'}`}
            src={arrow}
            alt="더보기"
            width={24}
            height={24}
          />
        </div>

        {activeMenu === 'password' && <PasswordChange setIsAlertOpen={setIsAlertOpen} />}
      </li>
      <LogoutButton />
      <li>
        <div
          className={`py-[18px] flex justify-between items-center ${
            activeMenu === 'withdraw' ? '' : 'border-b border-w6'
          }`}
          onClick={() => setActiveMenu(activeMenu === 'withdraw' ? null : 'withdraw')}
        >
          <p>회원탈퇴</p>
          <Image
            className={`transition-transform duration-300 ${activeMenu === 'withdraw' ? '' : 'rotate-180'}`}
            src={arrow}
            alt="더보기"
            width={24}
            height={24}
          />
        </div>
        {activeMenu === 'withdraw' && <Withdraw />}
      </li>
    </ul>
  );
}
