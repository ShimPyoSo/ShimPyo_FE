import CourseListItem from '@/app/(_components)/course/CourseListItem';

interface CourseItemListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseItemList({ setIsOpen }: CourseItemListProps) {
  // 추후 fetch 코드 추가하면 삭제 이후 refetch 코드 넣어야 함!
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
