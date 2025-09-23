import CategoryItems from '../../landing/CategoryItems';
import { categoryList } from '@/app/(_utils)/constants';

export default function Category() {
  return (
    <div className="mt-[18px] bg-[#fbfbfb] py-[18px] px-[32px]">
      <ul className="grid grid-cols-4 gap-y-[12px] gap-x-[18px]">
        {categoryList.map((item) => (
          <CategoryItems key={item.label} category={item.label} type="like" />
        ))}
      </ul>
    </div>
  );
}
