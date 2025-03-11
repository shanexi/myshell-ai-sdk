import { TriangleAlert, X } from 'lucide-react';

export const AlertDialog = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-surface-accent-yellow-subtler-light p-spacing-md">
          <TriangleAlert className="text-text-warning-default-light" />
        </div>
        <X className="text-icon-subtle-light" />
      </div>
    </div>
  );
};
