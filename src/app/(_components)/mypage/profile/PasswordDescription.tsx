'use client';

import { Control, useFormState } from 'react-hook-form';

import { IPasswordChange } from '@/app/(_utils)/type';

interface PasswordDescriptionProps {
  control: Control<IPasswordChange>;
}

export default function PasswordDescription({ control }: PasswordDescriptionProps) {
  const { errors } = useFormState({ control });

  return (
    <p
      className={
        errors.password?.message === '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.' ||
        errors.passwordConfirm?.message === '비밀번호가 일치하지 않습니다.' ||
        errors.password?.message === '기존 비밀번호로 변경할 수 없습니다.'
          ? 'text-r'
          : `text-g1`
      }
    >
      {errors.password?.message === '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.'
        ? '비밀번호를 양식에 맞춰 다시 설정해 주세요'
        : errors.passwordConfirm?.message === '비밀번호가 일치하지 않습니다.'
        ? '비밀번호가 일치하지 않아요'
        : errors.password?.message === '기존 비밀번호로 변경할 수 없습니다.'
        ? '기존 비밀번호와 다른 비밀번호를 입력해 주세요.'
        : '8글자 이상의 영문, 특수문자, 숫자 조합으로 설정해요'}
    </p>
  );
}
