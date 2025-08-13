import CourseList from '../course/CourseList';
import { ICourse } from '@/app/(_utils)/type';

interface RecommendCourseProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  course: ICourse;
}

export default function RecommendCourse({ setIsOpen, course }: RecommendCourseProps) {
  return (
    <section className="px-[16px] relative">
      <CourseList isEditable={false} setIsOpen={setIsOpen} course={course} />
      <button className="fixed bottom-[16px] w-[342px] py-[16px] border rounded-lg font-semibold tracking-[-1.3%] bg-gn1 text-white border-gn5 outline-none">
        코스 찜하기
      </button>
    </section>
  );
}
