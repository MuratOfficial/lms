"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MainGoal: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Главная цель</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Пропишите вашу основную цель</p>
      </CardContent>
    </Card>
  );
};

export default MainGoal;