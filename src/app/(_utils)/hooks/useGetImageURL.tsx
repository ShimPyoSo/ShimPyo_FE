import axios from 'axios';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UseGetImageURLProps {
  setIsImageError: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useGetImageURL({ setIsImageError }: UseGetImageURLProps) {
  const getImageURL = useCallback(
    async (image: File): Promise<string | undefined> => {
      const validMimeTypes = ['image/png', 'image/jpeg'];
      const maxSizeMB = 10;

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
      } catch {
        setIsImageError(true);
      }
    },
    [setIsImageError]
  );

  return { getImageURL };
}
