import { TriangleAlert, X } from 'lucide-react';
import { Button } from './button';

export const AlertDialog = () => {
  return (
    <div className="rounded-2xl-v1 bg-surface-default-light-v1 p-spacing-2xl-v1">
      <div className="flex items-center justify-between">
        <div className="rounded-full-v1 bg-surface-accent-yellow-subtler-light-v1 p-spacing-md-v1">
          <TriangleAlert className="text-text-warning-default-light-v1" />
        </div>
        <X className="text-icon-subtle-light-v1" />
      </div>
      <div className="mt-spacing-lg-v1 mb-spacing-2xl-v1">Body</div>
      <Button variant="warning" className="w-full">
        Confirm
      </Button>
    </div>
  );
};
