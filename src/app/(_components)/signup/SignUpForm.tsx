import EmailAuthInput from './EmailAuthInput';
import IdInput from './IdInput';
import PasswordInput from './PasswordInput';

export default function SignUpForm() {
  return (
    <>
      <IdInput />
      <PasswordInput />
      <EmailAuthInput />
    </>
  );
}
