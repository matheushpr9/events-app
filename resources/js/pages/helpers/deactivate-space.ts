import { initSanctum, api } from "@/api/api";

const deactivateSpace = async (id: number) => {
    await initSanctum();
    const response = await api.post(`/api/space/${id}/deactivate`);
    return response.data;
};

export default deactivateSpace;
