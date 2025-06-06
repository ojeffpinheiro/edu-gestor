import React, { useState, useEffect, useRef } from 'react';
import { MetricCard } from './Features/styles/ClassViewStyles';

interface MetricDisplayProps {
  value: number;
  label: string;
  trend?: 'up' | 'down' | 'stable';
  suffix?: string;
  prefix?: string;
  delay?: number;
}

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    default: return '➡️';
  }
};

export const AnimatedMetric: React.FC<MetricDisplayProps> = ({
  value,
  label,
  trend = 'stable',
  suffix = '',
  prefix = '',
  delay = 0
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible] = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(counter);
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, value, delay]);

  return (
    <MetricCard $trend={trend}>
      <span className="metric-value">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </span>
      <div className="metric-label">{label}</div>
      <div className={`metric-trend ${trend}`}>
        {getTrendIcon(trend)} {trend === 'up' ? '+5.2%' : trend === 'down' ? '-2.1%' : '0%'}
      </div>
    </MetricCard>
  );
};