'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@core/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useDispatch } from '@redux-store/hooks';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';

export function PostAdvertCTA() {
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handlePostAd = () => {
    if (!user) {
      dispatch(openAuthDialog());
    } else {
      router.push('/post-ad');
    }
  };

  return (
    <Card className="bg-gray-700 text-white border-0 h-[180px] rounded-xl overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-auto">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Got something to sell?</h3>
            <p className="text-gray-300 text-sm mt-1">
              Post an advert for free!
            </p>
          </div>
        </div>
        <Button
          onClick={handlePostAd}
          size="lg"
          variant="secondary"
          className="w-full bg-white text-[#0F172A] hover:bg-white/90 mt-4"
        >
          Post Now
        </Button>
      </div>
    </Card>
  );
}
