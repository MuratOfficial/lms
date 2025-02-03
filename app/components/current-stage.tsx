"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CurrentStage: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Текущий этап</CardTitle>
      </CardHeader>
      <CardContent>
        <p>JavaScript Основы</p>
      </CardContent>
    </Card>
  );
};

export default CurrentStage;