'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoogleIcon from '@public/assets/svgs/google.svg';
import { useAuth } from '@core/hooks/use-auth';

export default function SettingsPage() {
  const { user } = useAuth();
  const fullName = user?.name || '';
  const [firstName, ...lastNameParts] = fullName.split(' ');
  const lastName = lastNameParts.join(' ');
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-800">Account Settings</h2>
          <p className="text-gray-600">
            Manage your account preferences and information
          </p>
        </div>
        <Button
          variant="outline"
          type="button"
          className="text-green-500 border-green-500 h-10"
        >
          Save Changes
        </Button>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 gap-2 h-auto">
          <TabsTrigger value="personal" className="h-10">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="security" className="h-10">
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="h-10">
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-8">
                {/* Avatar Section */}
                <div className="flex justify-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback>{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      type="button"
                      className="absolute bottom-0 right-0 rounded-full bg-primary_1 hover:bg-primary_1/90"
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue={firstName}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue={lastName}
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue={''}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    type="text"
                    defaultValue={''}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input type="date" id="birthday" className="h-10" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select defaultValue="male">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male" className="h-10">
                        Male
                      </SelectItem>
                      <SelectItem value="female" className="h-10">
                        Female
                      </SelectItem>
                      <SelectItem value="other" className="h-10">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="h-10"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="h-10"
                    autoComplete="off"
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch id="email-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">
                        Receive marketing and promotional emails
                      </p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Connected Accounts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Google Account */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <GoogleIcon className="w-6 h-6" />
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-gray-500">
                    Access Google services
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
