import React from 'react';
import { useQuery } from "react-query";
import { getProductById } from "@/app/api/services/CategoriesService";
import { ProductProps } from "@/app/types/ProductType";
import Image from "next/image";

interface Props {
    id: string;
}

const Category: React.FC<Props> = ({ id }) => {
    const { data, error, isLoading, isError } = useQuery<ProductProps, Error>('product', () => getProductById(id), {
        retry: 3
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div></div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-full text-red-600">{`Error: ${error.message}`}</div>;
    }

    return (
        <div className="min-h-screen max-w-7xl mx-auto p-6 bg-white shadow-lg space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 text-center pt-10">{data?.title}</h1>
            <div className="flex justify-center">
                <img src={data?.image} alt={data?.title} className="w-64 h-auto object-cover rounded-lg" />
            </div>
            <div className="mt-4 text-center">
                <p className="text-gray-700 px-20">{data?.description}</p>
                <p className="mt-2 text-lg font-semibold text-green-600">Price: ${data?.price}</p>
            </div>
        </div>
    );
};

export default Category;
