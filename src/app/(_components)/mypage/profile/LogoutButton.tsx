import { useLogout } from '@/app/(_utils)/hooks/useLogout';

export default function LogoutButton() {
  const { handleLogout } = useLogout();

  return (
    <li className="py-[18px] border-b border-w6 flex justify-between items-center">
      로그아웃
      <button className="text-w3 bg-gn1 border-gn5 rounded-md px-[12px] py-[7px]" onClick={handleLogout}>
        로그아웃
      </button>
    </li>
  );
}
