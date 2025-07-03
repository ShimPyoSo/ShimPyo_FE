'use client';

import { useEffect, useState } from 'react';

import { IDomain } from '@/app/(_utils)/type';
import Image from 'next/image';
import Select from 'react-select';
import arrow from '/public/images/icons/selectArrow.svg';
import { domainOptions } from '@/app/(_utils)/constants';
import selectStyles from '@/app/(_utils)/selectStyles';

interface DomainInputProps {
  customDomain: string;
  setCustomDomain: React.Dispatch<React.SetStateAction<string>>;
  selectedDomain: IDomain;
  setSelectedDomain: React.Dispatch<React.SetStateAction<IDomain>>;
}

export default function DomainInput({
  customDomain,
  setCustomDomain,
  selectedDomain,
  setSelectedDomain,
}: DomainInputProps) {
  const [forceOpen, setForceOpen] = useState(false);
  const isCustom = selectedDomain.value === 'custom';

  useEffect(() => {
    if (!isCustom && forceOpen) {
      setForceOpen(false);
    }
  }, [isCustom, forceOpen]);

  return (
    <>
      {isCustom ? (
        <div className="relative">
          <input
            className="w-[158px] p-[16px] bg-w3 rounded-lg border border-w4 text-base outline-none focus:border-gn1 text-black font-normal"
            placeholder="도메인 선택"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
          />
          <Image
            className="absolute top-[18px] right-[14px] cursor-pointer"
            src={arrow}
            alt="더보기"
            width={20}
            height={20}
            onClick={() => {
              setSelectedDomain(domainOptions[0]);
              setForceOpen(true);
            }}
          />
        </div>
      ) : (
        <Select
          options={domainOptions}
          placeholder="도메인 선택"
          onChange={(val) => setSelectedDomain(val!)}
          styles={selectStyles}
          menuIsOpen={forceOpen ? true : undefined}
          onMenuOpen={() => {
            setForceOpen(false);
            setCustomDomain('');
          }}
          components={{
            IndicatorSeparator: null,
          }}
        />
      )}
    </>
  );
}
