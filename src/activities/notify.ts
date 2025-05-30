// Load the environment variables.
import 'dotenv/config';

// Define the notification status interface.
interface Notification {
  success: boolean;
  provider: 'sendgrid' | 'twilio' | 'mock';
  errorMessage?: string;
}

// Send notification to customer.
export async function sendNotification(message: string): Promise<Notification> {
  try {
    // Mocked the API call.
    console.log('[Notification] Sending message...');
    console.log(message);

    // Return the response.
    return {
      success: true,
      provider: 'mock',
    };
  } catch (error: any) {
    // Catch and return the error message.
    console.error('[Notification] Error:', error.message);
    return {
      success: false,
      provider: 'mock',
      errorMessage: error.message,
    };
  }
}
