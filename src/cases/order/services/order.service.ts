import { api } from "../../../lib/axios";
import type { OrderDTO } from "../dtos/order.dto";

const _ENDPOINT = '/orders';

export const OrderService = {

    async list(): Promise<OrderDTO[]> {
        try {
            const result = await api.get(_ENDPOINT);
            
            
            let dadosParaMapear: any[] = [];
            
            if (Array.isArray(result.data)) {
                dadosParaMapear = result.data;
            } else if (result.data && Array.isArray(result.data.items)) {
                dadosParaMapear = result.data.items;
            } else if (result.data && Array.isArray(result.data.data)) {
                dadosParaMapear = result.data.data;
            } else {
                console.warn("⚠️ Shop: A resposta da API não parece uma lista.", result.data);
                return []; 
            }

            
            return dadosParaMapear.map((item: any) => ({
                id: item.id || item._id,
                
                
                createdAt: item.createdAt || item.created_at || item.data_pedido || new Date(),
                
                
                total: Number(item.total || item.total_amount || item.amount || item.valor || 0),
                
                
                status: item.status || 'PENDING',
                
                
                customer: typeof item.customer === 'object' ? item.customer : { 
                    name: item.customer_name || 'Cliente' 
                },

                
                items: item.items || []
            })) as OrderDTO[];

        } catch (error) {
            console.error("Erro ao buscar pedidos na Loja:", error);
            return [];
        }
    },

    async create (order: OrderDTO): Promise<OrderDTO> {
        const result = await api.post(_ENDPOINT, order);
        return result.data;
    }
};