import React from 'react';
import { cn } from '../../../../lib/utils';

export function SidebarContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-4 p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}