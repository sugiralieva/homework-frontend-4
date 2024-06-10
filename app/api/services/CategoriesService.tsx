import { axiosQueryInstance } from "@/app/api/apiClient";
import {ProductProps} from "@/app/types/ProductType";

const getAllCategories = async (): Promise<string[]> => {
    const response = await axiosQueryInstance.get<string[]>("products/categories");
    return response.data;
}

const getProductByCategory = async (category: string): Promise<ProductProps[]> => {
    const response = await axiosQueryInstance.get<ProductProps[]>(`products/category/${category}`);
    return response.data;
}

const getProductById = async (id: string): Promise<ProductProps> => {
    const response = await axiosQueryInstance.get<ProductProps>(`products/${id}`);
    return response.data;
}

const addProduct = async (product: ProductProps): Promise<void> => {}
export {
    getAllCategories,
    getProductByCategory,
    getProductById,
}
