import sgMail from '@sendgrid/mail';
import 'dotenv/config';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Send an email notification using the SendGrid API.
export async function sendEmail(
  subject: string,
  message: string
): Promise<void> {
  try {
    // Try to send the email.
    const response = await sgMail.send({
      from: process.env.NOTIFY_EMAIL_FROM!,
      to: process.env.NOTIFY_EMAIL_TO!,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });

    // Check the response.
    if (!response) {
      console.error('Failed to send email.');
      throw new Error('FAIL!');
    }

    // Log the success.
    console.log('[SendGrid] Email sent');
  } catch (err: any) {
    // Catch and log the error message.
    console.error('[SendGrid] Error: Failed to send email:', err.response.body);
    throw new Error('FAIL!');
  }
}
