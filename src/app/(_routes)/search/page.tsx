import Recommend from '@/app/(_components)/landing/Recommend';
import SearchHistory from '@/app/(_components)/search/SearchHistory';
import SpotSearch from '@/app/(_components)/search/SpotSearch';

export default function Search() {
  return (
    <div className="min-h-full bg-w1 px-[16px]">
      <SpotSearch />
      <SearchHistory />
      <Recommend />
    </div>
  );
}
