import React from 'react';
import { cn } from '../../../../lib/utils';

export function SidebarGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}