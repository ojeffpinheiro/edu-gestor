import React from 'react';
import { cn } from '../../../../lib/utils';

export function SidebarHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-16 items-center px-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}