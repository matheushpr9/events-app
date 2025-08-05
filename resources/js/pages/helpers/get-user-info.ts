import { initSanctum } from "@/api/api"

const getUserInfo = async () => {
  await initSanctum();
  try {
    const response = await fetch(`/auth/user`, {
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

export default getUserInfo;
