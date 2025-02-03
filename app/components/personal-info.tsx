"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const PersonalInfo: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Личные данные</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Имя:</p>
        <p>Email: john.doe@example.com</p>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;