import {api, initSanctum} from "@/api/api";

const getLocalities = async (): Promise<string[]> => {
    await initSanctum();
    try{
        const response = await api.get('/api/localities')

        if (response.status === 200) {
            return response.data;
         }else{
            console.error("Failed to fetch space localities:", response.statusText);
            return [];
        }
        
    }catch (error) {
        console.error("Error fetching space localities:", error);
        throw error;
    }
}

export default getLocalities;