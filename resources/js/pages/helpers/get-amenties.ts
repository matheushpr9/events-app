import { initSanctum, api } from "@/api/api"

const getAmenities = async (): Promise<string[]> =>{
    await initSanctum();
    try{
        const response = await api.get('/api/amenities')

        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch space amenities:", response.statusText);
            return [];
        }
    }catch (error) {
        console.error("Error fetching space amenities:", error);
        throw error;
    }
}
export default getAmenities;