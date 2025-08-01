'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface TabItemProps {
  href: string;
  icon: StaticImageData;
  activeIcon: StaticImageData;
  label: string;
  active: boolean;
}

export default function TabItem({ href, icon, activeIcon, label, active }: TabItemProps) {
  return (
    <li>
      <Link href={href} className={`min-w-[93.75px] flex flex-col items-center ${active ? 'text-gn1' : ''}`}>
        <Image className="mb-[6px]" src={active ? activeIcon : icon} alt={label} width={28} height={28} />
        {label}
      </Link>
    </li>
  );
}
