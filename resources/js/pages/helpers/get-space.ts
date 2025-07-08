import { initSanctum } from "@/api/api"

const getSpace = async (id: string) => {
  await initSanctum();
  try {
    const response = await fetch(`/api/spaces/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching space: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching space:", error);
    throw error;
  }
}

export default getSpace; 