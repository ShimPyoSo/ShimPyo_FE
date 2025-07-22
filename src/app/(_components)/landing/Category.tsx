import CategoryItems from './CategoryItems';
import { categoryList } from '@/app/(_utils)/constants';

export default function Category() {
  return (
    <section className="mt-[70px] pr-[16px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">여행지 카테고리</h3>
      <p className="text-sm text-g1">다양한 유형의 여행지를 확인해 보세요</p>
      <ul className="mt-[16px] flex justify-between">
        {categoryList.map((item) => (
          <CategoryItems key={item.label} category={item.label} type="search" />
        ))}
      </ul>
    </section>
  );
}
