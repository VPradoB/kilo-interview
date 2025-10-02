import { API_BASE_URL } from '../../shared/utils/config.js';

export const fetchZones = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/zones`);
    if (!response.ok) {
      throw new Error(`Failed to fetch zones: ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    const result = await response.json();
    const data = Array.isArray(result.data) ? result.data : [];
    // Flatten the array if it's nested
    return data.map(zone => Object.values(zone)[0]).reduce((acc, val) => acc.concat(val), []);
  } catch (error) {
    console.error('Error fetching zones:', error);
    return [];
  }
};
