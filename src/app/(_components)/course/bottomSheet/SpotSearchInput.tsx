'use client';

import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { ICourseAddition } from '@/app/(_utils)/type';
import Image from 'next/image';
import SpotItem from '../SpotItem';
import SpotRecommend from './SpotRecommend';
import search from '/public/images/icons/search.svg';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface SpotSearchInputProps {
  register: UseFormRegister<ICourseAddition>;
  setValue: UseFormSetValue<ICourseAddition>;
  watch: UseFormWatch<ICourseAddition>;
}

export default function SpotSearchInput({ setValue, watch }: SpotSearchInputProps) {
  const { id } = useParams();
  const selectedCourse = watch('course');
  const [detailId, setDetailId] = useState(0);

  const openPopup = (type: 'search' | 'kakao') => {
    window.open(
      `${type === 'search' ? `/course/search/${id}` : `/course/kakao/${id}`}`,
      '여행지 추가하기',
      'width=375,height=600,scrollbars=yes'
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
        setValue('course.tel', e.data.tel);
        setValue('course.type', e.data.type);
      }
    });
  };

  const handleDelete = () => {
    setValue('course', {
      touristId: 0,
      title: '',
      address: '',
      images: '',
      latitude: undefined,
      longitude: undefined,
      tel: '',
      placeURL: '',
      type: undefined,
    });
  };

  return (
    <section className="mt-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <p className="tracking-[1.3%] font-semibold text-b1">여행지 추가하기</p>
        <button
          className="tracking-[-0.02em] text-gn5 font-semibold text-xs"
          onClick={() => openPopup('kakao')}
          type="button"
        >
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
          onClick={() => openPopup('search')}
        />
      </div>

      {selectedCourse?.touristId === 0 ? (
        <SpotRecommend
          detailId={detailId}
          setDetailId={setDetailId}
          selectedSpot={selectedCourse}
          setSelectedSpot={setValue}
        />
      ) : (
        <SpotItem isEditable={false} isPreview={true} onDelete={handleDelete} spot={selectedCourse} type="addition" />
      )}
    </section>
  );
}
