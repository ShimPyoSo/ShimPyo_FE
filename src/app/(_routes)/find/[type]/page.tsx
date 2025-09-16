'use client';

import Alert from '@/app/(_components)/UI/Alert';
import FindForm from '@/app/(_components)/user/find/FindForm';
import { IFindResult } from '@/app/(_utils)/type';
import IdResult from '@/app/(_components)/user/find/IdResult';
import Loader from '@/app/(_components)/UI/Loader';
import PasswordResult from '@/app/(_components)/user/find/PasswordResult';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Find() {
  const { type } = useParams();
  const [isFinded, setIsFinded] = useState(false);
  const [result, setResult] = useState<null | IFindResult>(null);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="min-h-full bg-w1 flex flex-col justify-between px-[18px]">
        {!isFinded ? (
          <FindForm
            setIsFinded={setIsFinded}
            setResult={setResult}
            setIsEmailOpen={setIsEmailOpen}
            setIsLoading={setIsLoading}
          />
        ) : type === 'password' ? (
          <PasswordResult />
        ) : (
          result && <IdResult username={result.username} createdAt={result.createdAt} />
        )}
      </div>
      {isEmailOpen && (
        <Alert
          title="이메일 인증"
          description={'입력하신 이메일 주소로 인증 번호를 전송했어요✉️\n지금 메일함을 확인해 보세요'}
          confirmText="확인"
          setIsOpen={setIsEmailOpen}
          onConfirm={() => {}}
        />
      )}
      {isLoading && <Loader />}
    </>
  );
}
