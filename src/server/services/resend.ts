import { resend } from '@/lib/resend';

const FROM_EMAIL = 'SecondHand <noreply@secondhand.dev>';

export async function sendPurchaseNotificationToBuyer(params: {
  buyerEmail: string;
  buyerName: string;
  listingTitle: string;
  amount: number;
  currency: string;
  orderId: string;
}) {
  const { buyerEmail, buyerName, listingTitle, amount, currency, orderId } = params;
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100);

  await resend.emails.send({
    from: FROM_EMAIL,
    to: buyerEmail,
    subject: `Order Confirmation - ${listingTitle}`,
    html: `
      <h1>Thank you for your purchase, ${buyerName}!</h1>
      <p>Your order for <strong>${listingTitle}</strong> has been confirmed.</p>
      <p>Amount: ${formattedAmount}</p>
      <p>Order ID: ${orderId}</p>
      <p>The seller will ship your item soon.</p>
    `,
  });
}

export async function sendSaleNotificationToSeller(params: {
  sellerEmail: string;
  sellerName: string;
  listingTitle: string;
  amount: number;
  currency: string;
  orderId: string;
  buyerName: string;
}) {
  const { sellerEmail, sellerName, listingTitle, amount, currency, orderId, buyerName } = params;
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100);

  await resend.emails.send({
    from: FROM_EMAIL,
    to: sellerEmail,
    subject: `New Sale - ${listingTitle}`,
    html: `
      <h1>Congratulations, ${sellerName}!</h1>
      <p>Your listing <strong>${listingTitle}</strong> has been sold to ${buyerName}.</p>
      <p>Amount: ${formattedAmount}</p>
      <p>Order ID: ${orderId}</p>
      <p>Please ship the item as soon as possible.</p>
    `,
  });
}

export async function sendWelcomeEmail(params: {
  email: string;
  name: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: params.email,
    subject: 'Welcome to SecondHand Marketplace!',
    html: `
      <h1>Welcome, ${params.name}!</h1>
      <p>Your account has been created successfully.</p>
      <p>Start browsing listings or create your own to sell items.</p>
    `,
  });
}
