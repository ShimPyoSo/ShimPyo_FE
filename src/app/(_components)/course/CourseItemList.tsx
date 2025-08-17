import CourseListItem from '@/app/(_components)/course/CourseListItem';

interface CourseItemListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseItemList({ setIsOpen }: CourseItemListProps) {
  return (
    <ul className="mt-[12px]">
      <CourseListItem setIsOpen={setIsOpen} />
      <CourseListItem setIsOpen={setIsOpen} />
      <CourseListItem setIsOpen={setIsOpen} />
      <CourseListItem setIsOpen={setIsOpen} />
      <CourseListItem setIsOpen={setIsOpen} />
      <CourseListItem setIsOpen={setIsOpen} />
      <CourseListItem setIsOpen={setIsOpen} />
    </ul>
  );
}
