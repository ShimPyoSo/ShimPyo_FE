'use client';

import Result from '@/app/(_components)/test/Result.';
import { useState } from 'react';

export default function TestResults() {
  const [isResult, setIsResult] = useState(false);

  return <div className="bg-w1">{isResult ? <></> : <Result setIsResult={setIsResult} />}</div>;
}
