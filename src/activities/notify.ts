import { Notification } from '../types';
import { sendEmail } from '../utils/sendEmail';

// Send notification to customer.
export async function sendNotification(message: string): Promise<Notification> {
  try {
    // Send the message via SendGrid.
    console.log('[Notification] Sending message...');
    await sendEmail('Freight Delay Notification', message);

    // Return the response.
    return {
      success: true,
      provider: 'sendgrid',
    };
  } catch (error: any) {
    // Catch and return the error message.
    console.error('[Notification] Error:', error.message);
    return {
      success: false,
      provider: 'sendgrid',
      errorMessage: error.message,
    };
  }
}
