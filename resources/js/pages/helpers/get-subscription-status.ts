import { initSanctum, api } from "@/api/api";

const getSubscriptionStatus = async () => {
    await initSanctum();
    const response = await api.get('/api/subscription/status');
    return response.data;
};

export default getSubscriptionStatus;
