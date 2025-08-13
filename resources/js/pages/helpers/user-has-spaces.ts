import { initSanctum, api } from "@/api/api";

const userHasSpaces = async (id: string) => {
    await initSanctum();
    const response = await api.get(`/api/user/${id}/has-space`);
    return response.data;
};

export default userHasSpaces;
