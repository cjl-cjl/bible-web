'use client';

import * as React from 'react';
import { Switch } from './ui/switch';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function ThemeToggleSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Switch
      id="theme-toggler"
      checked={theme === 'dark'}
      onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="hover:cursor-pointer"
    />
  );
}
