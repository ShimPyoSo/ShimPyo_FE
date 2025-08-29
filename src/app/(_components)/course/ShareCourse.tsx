'use client';

import { useParams, useSearchParams } from 'next/navigation';

import CourseList from './CourseList';
import { ICourse } from '@/app/(_utils)/type';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface ShareCourseProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShareCourse({ setIsOpen }: ShareCourseProps) {
  const { id } = useParams();
  const params = useSearchParams();
  const token = params.get('token');

  const fetchShareCourse = async () => {
    try {
      const response = await axios.get<ICourse>(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course/share`, {
        params: { courseId: id, token },
      });
      return response.data;
    } catch {}
  };

  const { data } = useQuery({
    queryKey: ['shareCourse', id, token],
    queryFn: fetchShareCourse,
    enabled: !!id && !!token,
  });

  return (
    <>
      <div className="bg-w1 px-[16px] pb-[30px]">
        {data && <CourseList isEditable={false} setIsOpen={setIsOpen} course={data} />}
      </div>
    </>
  );
}
