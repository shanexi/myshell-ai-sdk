import { ReactComponent as ArrowUpTray } from './arrow-up-tray.svg';

export const Upload = () => {
  return (
    <div className="rounded-lg border border-border-default-light bg-surface-default-light p-spacing-xl shadow-background-default">
      <div className="flex items-center">
        <div className="mr-spacing-lg rounded-[10px] bg-surface-accent-gray-subtlest-light p-[12px]">
          <ArrowUpTray />
        </div>
        <div>
          <div className="text-sm-medium text-text-default-light">
            Drop a file or click to upload
          </div>
          <div className="description-lg-regular text-text-subtler-light">
            PNG, JPG, GIF up to 10MB
          </div>
        </div>
      </div>
    </div>
  );
};
