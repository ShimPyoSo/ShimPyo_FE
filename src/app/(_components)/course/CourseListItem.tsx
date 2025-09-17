'use client';

import CourseDelete from './CourseDelete';
import { ICourseInfo } from '@/app/(_utils)/type';
import Image from 'next/image';
import Link from 'next/link';
import Share from '../UI/Share';
import spotDefault from '/public/images/icons/course/spotDefault.svg';
import { testImages } from '@/app/(_utils)/constants';

interface CourseListItemProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: ICourseInfo;
  refetch?: () => void;
}

export default function CourseListItem({ setIsOpen, item, refetch }: CourseListItemProps) {
  const currentItem = testImages.find((i) => i.name === item.typename);
  if (!currentItem) return null;

  return (
    <li className="py-[12px] flex items-center justify-between border-b border-w6">
      <div className="w-[73px] h-[73px] bg-white border border-w4 rounded-md relative">
        {item.thumbnail ? (
          <Image src={item.thumbnail} alt="관광지 이미지" fill className="object-cover rounded-md" />
        ) : (
          <Image src={spotDefault} alt="관광지 이미지" fill className="py-[15px] px-[20px]" />
        )}
      </div>
      <div className="ml-[12px] flex items-start justify-between grow">
        <div className="flex flex-col font-semibold tracking-[-0.02em]">
          <div
            className="w-fit py-[3px] px-[5px] text-xs rounded-sm border"
            style={{
              border: `1px solid ${currentItem.color}4D`,
              color: currentItem.color,
            }}
          >
            {item.typename}
          </div>
          <Link href={`/mypage/like/course/${item.courseId}`} className="mt-[4px] text-sm text-b3">
            {item.title}
          </Link>
        </div>

        <div className="flex items-center gap-[6px]">
          <Share setIsOpen={setIsOpen} type="course" courseId={item.courseId} token={item.token} />
          <CourseDelete courseId={item.courseId} type="list" refetch={refetch} />
        </div>
      </div>
    </li>
  );
}
