// Load the environment variables.
import 'dotenv/config';

import { Client, Connection } from '@temporalio/client';
import { TASK_QUEUE_NAME } from './shared';
import { freightDelayWorkflow } from './workflows/freightDelay';

// Configure the client.
async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });
  const client = new Client({ connection });
  const workflowId = `${TASK_QUEUE_NAME}-${Date.now()}`;
  const origin = process.env.ORIGIN_ADDRESS || 'Copenhagen, Denmark';
  const destination = process.env.DESTINATION_ADDRESS || 'Aarhus, Denmark';

  const handle = await client.workflow.start(freightDelayWorkflow, {
    taskQueue: TASK_QUEUE_NAME,
    workflowId,
    args: [
      {
        origin,
        destination,
      },
    ],
  });

  console.log(`[Client] Starting workflow: ${workflowId}`);

  const result = await handle.result();
  console.log(`[Client] Workflow complete: ${result}`);
}

// Catch the errors.
run().catch((err) => {
  console.error('[Client] Failed to run the client:', err);
  process.exit(1);
});
