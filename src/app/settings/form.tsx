'use client';

import type React from 'react';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { updateSettings } from './actions';
import { User } from '@/lib/types';

export function SettingsForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await updateSettings(formData);

    if (result.success) {
      toast.success('成功', { description: result.message });
    } else {
      toast.warning('错误', { description: result.message });
    }

    setIsLoading(false);
  }

  return (
    <div className="container  py-10 px-4 md:px-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">设置</h2>
          <p className="text-muted-foreground">
            管理您的账户信息和安全设置。
          </p>
        </div>
        <Separator />

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>用户资料</CardTitle>
              <CardDescription>
                在下方更新您的邮箱、姓名、用户名和密码。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={user.name}
                  defaultValue={user.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">用户名</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder={user.username}
                  defaultValue={user.username}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={user.email}
                  defaultValue={user.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="oldpassword">旧密码</Label>
                <Input
                  id="oldpassword"
                  name="oldpassword"
                  type="password"
                  placeholder=""
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">新密码</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder=""
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmpassword">确认密码</Label>
                <Input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  placeholder=""
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '保存中...' : '保存更改'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
