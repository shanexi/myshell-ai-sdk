import { TriangleAlert, X } from 'lucide-react';
import { Button } from './button';

export const AlertDialog = () => {
  return (
    <div className="rounded-2xl bg-surface-default-light p-spacing-2xl">
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-surface-accent-yellow-subtler-light p-spacing-md">
          <TriangleAlert className="text-text-warning-default-light" />
        </div>
        <X className="text-icon-subtle-light" />
      </div>
      <div className="mt-spacing-lg mb-spacing-2xl">Body</div>
      <Button variant="warning" className="w-full">
        Confirm
      </Button>
    </div>
  );
};
