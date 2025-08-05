import { initSanctum } from "@/api/api"

const getSpacesByUserId = async (id: string) => {
  await initSanctum();
  try {
    const response = await fetch(`/api/users/${id}/spaces`, {
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

export default getSpacesByUserId;
