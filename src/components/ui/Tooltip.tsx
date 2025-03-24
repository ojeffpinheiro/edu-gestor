import React, { ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}>
          {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-48 bg-gray-800 text-white text-sm rounded p-2 -mt-1 ml-6">
          {content}
        </div>
      )}
    </div>
  );
};

export { Tooltip };