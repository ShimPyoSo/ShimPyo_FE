import CategoryItems from '../../landing/CategoryItems';
import { categoryList } from '@/app/(_utils)/constants';

export default function Category() {
  return (
    <div className="bg-[#fbfbfb] py-[18px] px-[80px]">
      <ul className="grid grid-cols-3 gap-y-[12px] gap-x-[18px]">
        {categoryList.map((item) => (
          <CategoryItems key={item.label} category={item.label} type="like" />
        ))}
      </ul>
    </div>
  );
}
