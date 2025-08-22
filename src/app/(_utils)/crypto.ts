import CryptoJS from 'crypto-js';
import { IResultScore } from './type';

const SECRET_KEY = process.env.NEXT_PUBLIC_SHIMPYO_RESULT_SECRET_KEY!;

export function encryptData(data: Partial<IResultScore>[]): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decryptData(cipher: string): Partial<IResultScore>[] {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
