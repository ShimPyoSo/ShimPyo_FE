'use client';

import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { ICourseAddition } from '@/app/(_utils)/type';
import Image from 'next/image';
import SpotItem from './SpotItem';
import SpotRecommend from './SpotRecommend';
import search from '/public/images/icons/search.svg';

interface SpotSearchInputProps {
  register: UseFormRegister<ICourseAddition>;
  setValue: UseFormSetValue<ICourseAddition>;
  watch: UseFormWatch<ICourseAddition>;
}

export default function SpotSearchInput({ register, setValue, watch }: SpotSearchInputProps) {
  const selectedCourse = watch('course');

  const openPopup = (type: 'search' | 'kakao') => {
    window.open(
      `${type === 'search' ? '/course/search' : '/course/kakao'}`,
      '쉼표 여행지 추가하기',
      'width=500,height=600,scrollbars=yes'
    );

    window.addEventListener('message', (e) => {
      if (e.origin !== window.location.origin) return;

      if (e.data?.touristId) {
        setValue('course.touristId', e.data.touristId);
        setValue('course.title', e.data.title);
        setValue('course.address', e.data.address);
        setValue('course.images', e.data.images);
        setValue('course.latitude', e.data.latitude);
        setValue('course.longitude', e.data.longitude);
        if (e.data.operationTime) {
          setValue('course.operationTime', e.data.operationTime);
        }
      }
    });
  };

  const handleDelete = () => {
    setValue('course', {
      touristId: 0,
      title: '',
      address: '',
      images: '',
      time: '',
      latitude: undefined,
      longitude: undefined,
      operationTime: undefined,
    });
  };

  return (
    <section className="mt-[24px]">
      <div className="flex items-center justify-between">
        <p className="tracking-[1.3%] font-semibold text-b1">쉼표 여행지 추가하기</p>
        <button className="tracking-[-2%] text-gn5 font-semibold text-xs" onClick={() => openPopup('kakao')}>
          원하는 여행지를 못 찾았다면?
        </button>
      </div>
      <div className="relative">
        <input
          className="mt-[12px] mb-[8px] w-full bg-white rounded-lg border border-w4 text-sm py-[12px] px-[16px] outline-none placeholder:text-g3 hover:border-gn1"
          placeholder="어떤 여행지에 쉼표를 찍어볼까요?"
          readOnly
          onClick={() => openPopup('search')}
        />
        <Image
          className="absolute right-[16px] top-[22px] cursor-pointer"
          src={search}
          alt="검색"
          width={22}
          height={22}
          role="button"
        />
      </div>
      {selectedCourse?.touristId === 0 ? (
        <SpotRecommend register={register} />
      ) : (
        <SpotItem isEditable={false} isPreview={true} onDelete={handleDelete} />
      )}
    </section>
  );
}
