import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function PostAdvertCTA() {
  return (
    <Card className="bg-primary_1 text-white hover:bg-primary_1/90 transition-colors cursor-pointer border-0 flex-1 lg:flex-none h-[145px] sm:h-auto lg:h-[145px]">
      <CardContent className="p-3 flex flex-col justify-between h-full">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2">
            <Plus className="h-3 w-3" />
          </div>
          <div>
            <h3 className="font-semibold text-xs">Got something to sell?</h3>
            <p className="text-white/90 text-[10px] md:text-sm mt-0.5">
              Post an advert for free!
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="w-full mt-2 bg-white text-primary_1 hover:bg-white/90 text-[10px] md:text-sm"
        >
          Post Now
        </Button>
      </CardContent>
    </Card>
  );
}
