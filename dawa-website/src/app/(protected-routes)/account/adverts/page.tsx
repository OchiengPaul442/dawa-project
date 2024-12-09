import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PlusCircle,
  DollarSign,
  Users,
  TrendingUp,
  FileText,
} from 'lucide-react';

export default function AdvertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Adverts</h2>
          <p className="text-gray-600">
            Manage and track your advertisement campaigns
          </p>
        </div>
        <Button className="bg-primary_1 hover:bg-primary_1/90 h-10">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Advert
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Adverts</CardTitle>
            <FileText className="h-4 w-4 text-primary_1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">4 active, 8 inactive</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-primary_1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,351</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary_1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,254</div>
            <p className="text-xs text-gray-500">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Adverts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Example advert */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Summer Sale Promotion</h3>
                <p className="text-sm text-gray-500">Created on: 15 Jul 2023</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-10">
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-600 h-10"
                >
                  Pause
                </Button>
              </div>
            </div>
            {/* Add more adverts here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
