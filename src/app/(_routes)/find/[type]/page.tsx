'use client';

import FindForm from '@/app/(_components)/user/find/FindForm';
import { IFindResult } from '@/app/(_utils)/type';
import IdResult from '@/app/(_components)/user/find/IdResult';
import PasswordResult from '@/app/(_components)/user/find/PasswordResult';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Find() {
  const { type } = useParams();
  const [isFinded, setIsFinded] = useState(false);
  const [result, setResult] = useState<null | IFindResult>(null);

  return (
    <div className="min-h-full bg-w1 flex flex-col justify-between px-[18px]">
      {!isFinded ? (
        <FindForm setIsFinded={setIsFinded} setResult={setResult} />
      ) : type === 'password' ? (
        <PasswordResult />
      ) : (
        result && <IdResult username={result.username} createdAt={result.createdAt} />
      )}
    </div>
  );
}
