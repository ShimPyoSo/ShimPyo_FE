'use client';

import axios, { AxiosError } from 'axios';

import { IError } from '../type';
import { useCallback } from 'react';
import { useHandleTokenExpired } from './useHandleTokenExpired';
import { v4 as uuidv4 } from 'uuid';

interface UseGetImageURLProps {
  setIsImageError: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useGetImageURL({ setIsImageError }: UseGetImageURLProps) {
  const { handleAccessExpired } = useHandleTokenExpired();

  const getImageURL = useCallback(
    async (image: File): Promise<string | undefined> => {
      const validMimeTypes = ['image/png', 'image/jpeg'];
      const maxSizeMB = 20;

      if (!validMimeTypes.includes(image.type)) {
        setIsImageError(true);
        return;
      }

      if (image.size > maxSizeMB * 1024 * 1024) {
        setIsImageError(true);
        return;
      }

      const imageName = uuidv4();

      try {
        const response = await axios.post<{ uploadUrl: string }>(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/image`,
          {
            fileName: imageName,
            fileSize: image.size,
          },
          { withCredentials: true }
        );

        const uploadUrl = response.data.uploadUrl;

        await axios.put(uploadUrl, image, {
          headers: {
            'Content-Type': image.type,
          },
        });

        return `https://shimpyo.s3.amazonaws.com/${imageName}`;
      } catch (error) {
        const err = error as AxiosError<IError>;
        if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
          await handleAccessExpired('INVALID_TOKEN');
          try {
            const response = await axios.post<{ uploadUrl: string }>(
              `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/image`,
              {
                fileName: imageName,
                fileSize: image.size,
              },
              { withCredentials: true }
            );

            const uploadUrl = response.data.uploadUrl;

            await axios.put(uploadUrl, image, {
              headers: {
                'Content-Type': image.type,
              },
            });

            return `https://shimpyo.s3.amazonaws.com/${imageName}`;
          } catch {
            // reissue 이후 에러처리
          }
        }

        setIsImageError(true);
      }
    },
    [setIsImageError, handleAccessExpired]
  );

  return { getImageURL };
}
