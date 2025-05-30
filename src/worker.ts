import { Worker } from '@temporalio/worker';
import { TASK_QUEUE_NAME } from './shared';
import * as activities from './activities/index';

// Configure the worker.
async function run() {
  // Register the workflows and the activities with the worker.
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows/freightDelay'),
    taskQueue: TASK_QUEUE_NAME,
    activities,
  });

  // Log the process.
  console.log(`[Worker] Starting worker on task queue: ${TASK_QUEUE_NAME}`);

  // Run the worker.
  await worker.run();
}

// Catch the errors.
run().catch((err) => {
  console.error('[Worker] Failed to run the worker:', err);
  process.exit(1);
});
