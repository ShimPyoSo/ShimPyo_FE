import SearchInput from '@/app/(_components)/search/SearchInput';
import SearchResultList from '@/app/(_components)/search/SearchResultList';

export default function SearchResult() {
  return (
    <div className="min-h-full bg-w1">
      <div className="px-[16px]">
        <SearchInput />
      </div>
      <SearchResultList />
    </div>
  );
}
