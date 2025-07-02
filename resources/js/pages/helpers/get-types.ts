import { api, initSanctum } from "@/api/api";


const getTypes = async (): Promise<string[]> => {
  await initSanctum();
  try {
    const response = await api.get('/api/types');
    if (response.status === 200) {
      return response.data
    } else {
      console.error("Failed to fetch space types:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching space types:", error);
    throw error;
  }
};

export default getTypes;