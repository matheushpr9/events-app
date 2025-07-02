import { initSanctum, api } from "@/api/api";

const getServices = async (): Promise<string[]> =>{
    await initSanctum();
    try {
        const response = await api.get('/api/services');

        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch space services:", response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error fetching space services:", error);
        throw error;
    }
}
export default getServices;