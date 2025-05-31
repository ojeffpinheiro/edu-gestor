// components/Charts/PercentileScatterPlot.tsx
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { ClassPerformance } from '../../../utils/types/Assessment';

const PercentileScatterPlot: React.FC<{ classes: ClassPerformance[] }> = ({ classes }) => {
  const data = {
    datasets: classes.map(classData => ({
      label: classData.className,
      data: classData.students.map(student => ({
        x: student.overallPercentile || 0, // Adicione este campo à interface Student
        y: student.overallAverage || 0
      })),
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 132, 0.6)`
    }))
  };

  return <Scatter data={data} />;
};

export default PercentileScatterPlot;