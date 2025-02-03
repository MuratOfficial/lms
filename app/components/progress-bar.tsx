"use client"

import { Progress } from '@/components/ui/progress';
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Ваш прогресс</h2>
      <Progress value={progress} className="w-full" />
      <p className="mt-2 text-gray-600">{progress}% Завершено</p>
    </div>
  );
};

export default ProgressBar;