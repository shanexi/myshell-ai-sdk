import { Upload as UploadIcon } from 'lucide-react';

export const Upload = () => {
  return (
    <div className="rounded-lg-v1 border border-border-default-light-v1 bg-surface-default-light-v1 p-spacing-xl-v1 shadow-background-default">
      <div className="flex items-center">
        <div className="mr-spacing-lg-v1 rounded-[10px] bg-surface-accent-gray-subtlest-light-v1 p-[12px]">
          <UploadIcon />
        </div>
        <div>
          <div className="text-sm-medium text-text-default-light-v1">
            Drop a file or click to upload
          </div>
          <div className="description-lg-regular text-text-subtler-light-v1">
            PNG, JPG, GIF up to 10MB
          </div>
        </div>
      </div>
    </div>
  );
};
