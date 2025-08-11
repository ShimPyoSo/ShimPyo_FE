import Image from 'next/image';
import solved from '/public/images/test/solved.svg';
import unsolved from '/public/images/test/unsolved.svg';

export default function Progress({ num }: { num: number }) {
  return (
    <ul className="mt-[30px] flex items-center justify-between">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i}>
          <Image src={i <= num ? solved : unsolved} alt="progress" width={30} height={7} />
        </li>
      ))}
    </ul>
  );
}
