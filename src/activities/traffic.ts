import { RouteInfo, TrafficDelay } from '../types';

// Get the traffic delay time in minutes.
export async function getTrafficDelay(route: RouteInfo): Promise<TrafficDelay> {
  const googleMapsUrl = `${process.env.GOOGLE_MAPS_API_URL}
    ?key=${process.env.GOOGLE_MAPS_API_KEY}
    &destinations=${encodeURIComponent(route.destination)}
    &origins=${encodeURIComponent(route.origin)}`;

  try {
    // Try to fetch the response from Google Maps.
    const response = await fetch(googleMapsUrl);
    console.log('[Traffic] Checking Google Maps...');

    // Check if there is a response.
    if (!response.status || response.status !== 200) {
      console.error('[Traffic] Google Maps error:', response.statusText);
      throw new Error(`Google Maps fetch error: ${response.statusText}`);
    }

    // Decode the response data.
    const data = await response.json();

    // Check the data status.
    if (data.status !== 'OK') {
      console.error('[Traffic] Google Maps data error:', data);
      throw new Error('Google Maps data status error.');
    }

    // Get the traffic duration.
    const duration = data.rows[0].elements[0].duration.value;
    const trafficDurration = data.rows[0].elements[0].duration_in_traffic.value;
    const delay = (trafficDurration - duration) / 60;

    // Return the delay.
    return {
      estimatedDelayMinutes: delay,
      status: 'OK',
    };
  } catch (error: any) {
    // Catch and return the error message.
    console.error(`[Traffic] Error:`, error.message);
    return {
      estimatedDelayMinutes: 0,
      status: 'ERROR',
      errorMessage: error.message,
    };
  }
}
