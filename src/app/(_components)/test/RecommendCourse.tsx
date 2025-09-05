import { ICourse, IError } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import CourseList from '../course/CourseList';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useRouter } from 'next/navigation';

interface RecommendCourseProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  course: ICourse;
}

export default function RecommendCourse({ setIsOpen, course }: RecommendCourseProps) {
  const { handleAccessExpired } = useHandleTokenExpired();
  const router = useRouter();

  const handleLikeCourse = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/survey`,
        {
          token: course.token,
        },
        { withCredentials: true }
      );
      router.push('/mypage/like/course');
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/survey`,
            {
              courseId: course.courseId,
            },
            { withCredentials: true }
          );
          router.push('/mypage/like/course');
        } catch {
          // reissue 이후 오류 처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <section className="px-[16px] relative">
      <CourseList isEditable={false} setIsOpen={setIsOpen} course={course} />
      <button
        className="fixed bottom-[100px] w-[342px] py-[16px] border rounded-lg font-semibold tracking-[-0.013em] bg-gn1 text-white border-gn5 outline-none z-[999]"
        onClick={handleLikeCourse}
      >
        코스 찜하기
      </button>
    </section>
  );
}
