import { Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SafetyTips() {
  return (
    <Card className="bg-blue-50 border-blue-100 flex-1 lg:flex-none h-[145px] sm:h-auto lg:h-[145px]">
      <CardHeader className="pb-1 pt-2">
        <CardTitle className="text-[10px] font-medium flex items-center gap-1 text-blue-700">
          <Shield className="h-3 w-3" />
          Safety Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="text-[10px] space-y-1 text-blue-600">
        <div className="flex gap-1 items-start">
          <AlertCircle className="h-2 w-2 mt-0.5 flex-shrink-0" />
          <p>Meet in a safe, public location</p>
        </div>
        <div className="flex gap-1 items-start">
          <AlertCircle className="h-2 w-2 mt-0.5 flex-shrink-0" />
          <p>Check the item before payment</p>
        </div>
        <div className="flex gap-1 items-start">
          <AlertCircle className="h-2 w-2 mt-0.5 flex-shrink-0" />
          <p>Never send money in advance</p>
        </div>
      </CardContent>
    </Card>
  );
}
