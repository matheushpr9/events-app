import { api, initSanctum } from "@/api/api";

export const getRating = async (spaceId: number) => {
  try {
    await initSanctum();
    const response = await api.get(`/api/space/rating/${spaceId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar avaliação:", error);
    throw error;
  }
};