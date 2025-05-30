// Import the OpenAI API client.
import OpenAI from 'openai';

// Define the AI message interface.
interface AIMsg {
  content: string;
  status: 'OK' | 'FALLBACK';
  errorMessage?: string;
}

// Instantiate a new OpenAI client.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate an AI message, using the provided delay amount.
export async function generateMessage(delayMinutes: number): Promise<AIMsg> {
  try {
    // Try to create a message with OpenAI.
    const response = await openai.responses.create({
      model: 'gpt-4o',
      instructions: 'Act as a logistics assistant',
      input: `Write a friendly message to a customer explaining a delivery delay of ${delayMinutes} minutes.`,
    });

    // Check if there is a response.
    const content = response.output_text;
    if (!content) {
      console.error('[OpenAI] Error: Failed to generate a message.');
      throw new Error('Failed to generate an AI message.');
    }

    // Return the response.
    console.log(`[OpenAI] Generated message: `, content);
    return {
      content,
      status: 'OK',
    };
  } catch (error: any) {
    // Catch and return the error message.
    console.error(`[OpenAI] Error:`, error.message);
    return {
      content: `We apologise. Your delivery is being delayed by ${delayMinutes} minutes. Thank you for your patience.`,
      status: 'FALLBACK',
      errorMessage: error.message,
    };
  }
}
