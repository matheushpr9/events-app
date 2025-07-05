import {api, initSanctum} from '@/api/api';

const getCapacities = async () => {
  try {
    await initSanctum();
    const response = await api.get('/api/capacities');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar capacidades:', error);
    return [];
  }
}


export default getCapacities;