import { API_BASE_URL } from "../../shared/utils/config.js";

export const fetchAwards = async (params = {}) => {
  try {
    const url = new URL(`${API_BASE_URL}/api/awards`);
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch awards: ${response.status} ${response.statusText}`,
      );
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    const result = await response.json();
    const data = result.data
      .map((award) => Object.values(award)[0])
      .reduce((acc, val) => acc.concat(val), []);

    return {
      data: data || [],
      pagination: result.pagination || {},
    };
  } catch (error) {
    console.error("Error fetching awards:", error);
    return { data: [], pagination: {} };
  }
};

export const fetchAwardById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/awards/${id}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch award: ${response.status} ${response.statusText}`,
      );
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching award by id:", error);
    return {};
  }
};

console.log(await fetchAwards({zone: 1}))