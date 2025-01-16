import React from 'react';
import ReportAbuseDialog from '@/components/dialogs/ReportAbuseDialog';
import SendMessageDialog from '@/components/dialogs/SendMessageDialog';
import ContactSellerDialog from '@/components/dialogs/ContactSellerDialog';
import SafetyTipsDialog from '@/components/dialogs/SafetyTipsDialog';
import MakeOfferDialog from '@/components/dialogs/MakeOfferDialog';

const safetyTips = [
  'Always inspect the item before purchasing.',
  'Meet in a public, well-lit place for transactions.',
  'Verify the authenticity of the product before paying.',
  'Avoid sharing personal or financial details with strangers.',
  'Report suspicious activity immediately.',
];

type DialogType = 'safety' | 'report' | 'message' | 'contact' | 'makeOffer';

interface ProductDialogsProps {
  product: {
    id: string;
    price: string;
    seller: {
      seller_id: string;
      seller_contact: string;
      seller_email: string;
    };
  };
  dialogStates: Record<DialogType, boolean>;
  toggleDialog: (dialog: DialogType) => void;
}

export const ProductDialogs: React.FC<ProductDialogsProps> = ({
  product,
  dialogStates,
  toggleDialog,
}) => (
  <>
    <ReportAbuseDialog
      open={dialogStates.report}
      onOpenChange={() => toggleDialog('report')}
      reportAbuseDetails={{ name: '', email: '', description: '' }}
      handleInputChange={(e) => {
        // Handle input change
      }}
      handleSubmitReport={() => {
        console.log('Report Submitted');
        alert(
          'Thank you for reporting. We will review your submission shortly.',
        );
        toggleDialog('report');
      }}
    />
    <SendMessageDialog
      open={dialogStates.message}
      onOpenChange={() => toggleDialog('message')}
      receiverId={product.seller.seller_id}
      itemId={product.id}
    />
    <ContactSellerDialog
      open={dialogStates.contact}
      onOpenChange={() => toggleDialog('contact')}
      sellerContact={{
        phone: product.seller.seller_contact,
        email: product.seller.seller_email,
      }}
    />
    <SafetyTipsDialog
      open={dialogStates.safety}
      onOpenChange={() => toggleDialog('safety')}
      safetyTips={safetyTips}
    />
    <MakeOfferDialog
      open={dialogStates.makeOffer}
      onOpenChange={() => toggleDialog('makeOffer')}
      currentPrice={product.price}
      onSubmitOffer={(price) => {
        console.log('Offer submitted:', price);
        alert('Your offer has been sent to the seller.');
        toggleDialog('makeOffer');
      }}
    />
  </>
);
