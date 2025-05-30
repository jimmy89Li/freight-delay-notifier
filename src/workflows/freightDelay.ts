import { proxyActivities } from '@temporalio/workflow';
import { RouteInfo } from '../types';
import * as activities from '../activities/index';

const DELAY_THRESHOLD = 30;

// Load activities.
const { getTrafficDelay, generateMessage, sendNotification } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '1 minute',
});

// Define the fright delay workflow.
export async function freightDelayWorkflow(
  route: RouteInfo
): Promise<string | undefined> {
  console.log('[Workflow] Starting freight delay check for route:', route);

  // Get the traffic delay of the route.
  const delay = await getTrafficDelay(route);
  console.log(delay);

  // Check if the traffic delay fetching was successful.
  if (delay.status !== 'OK') {
    console.log('[Workflow] Traffic delay fetch failed. Skipping...');
    return;
  }

  console.log(`[Workflow] Delay is ${delay.estimatedDelayMinutes} min.`);

  // Don't proceed if the traffic delay is below the threshold.
  if (delay.estimatedDelayMinutes <= DELAY_THRESHOLD) {
    console.log('[Workflow] Delay under threshold. No notification needed.');
    return;
  }

  // Generate the message using AI.
  const message = await generateMessage(delay.estimatedDelayMinutes);

  // Send the notification message.
  const notification = await sendNotification(message.content);

  // Check if the notification was sent successfully.
  if (!notification.success) {
    console.log('[Workflow] Notification failed to send.');
    return;
  }

  // Log the notification success and the used provider.
  console.log(`[Workflow] Notification sent via ${notification.provider}`);
}
