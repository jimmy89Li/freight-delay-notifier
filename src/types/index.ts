// Define the route info interface.
export interface RouteInfo {
  origin: string;
  destination: string;
}

// Define the traffic delay interface.
export interface TrafficDelay {
  estimatedDelayMinutes: number;
  status: 'OK' | 'ERROR';
  errorMessage?: string;
}

// Define the AI message interface.
export interface AIMsg {
  content: string;
  status: 'OK' | 'FALLBACK';
  errorMessage?: string;
}

// Define the notification status interface.
export interface Notification {
  success: boolean;
  provider: 'sendgrid' | 'twilio' | 'mock';
  errorMessage?: string;
}
