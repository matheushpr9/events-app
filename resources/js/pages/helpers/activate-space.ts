import { initSanctum, api } from "@/api/api";

const activateSpace = async (id: number) => {
    await initSanctum();
    const response = await api.post(`/api/space/${id}/activate`);
    return response.data;
};

export default activateSpace;
