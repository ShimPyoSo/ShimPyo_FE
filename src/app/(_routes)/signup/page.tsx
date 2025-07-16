import SignUpComponent from '@/app/(_components)/user/signup/SignUpComponent';
import { Suspense } from 'react';

export default function SignUp() {
  return (
    <Suspense>
      <SignUpComponent />
    </Suspense>
  );
}
