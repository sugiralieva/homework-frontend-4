import React from 'react';
import { useQuery } from "react-query";
import { getProductByCategory } from "@/app/api/services/CategoriesService";
import { ProductProps } from "@/app/types/ProductType";
import Link from "next/link";

interface Props {
    category: string;
}

const Category: React.FC<Props> = ({ category }) => {
    const { data, error, isLoading, isError } = useQuery<ProductProps[], Error>('categories', () => getProductByCategory(decodeURIComponent(category)), {
        retry: 3
    });

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-100 text-red-600">Error: {error.message}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-4">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 py-4 text-center">Products in {category}</h1>
                <div className="flex justify-center">
                    <ul className="space-y-4 w-full max-w-7xl"> {/* Adjusting max-width here */}
                        {data && data.map((product) => (
                            <li key={product.id} className="bg-white shadow-md rounded-lg flex w-full">
                                <Link href={`/${category}/${product.id}`} passHref>
                                        <div className="p-4 flex flex-col justify-between">
                                            <img className="w-80 h-40 object-cover" src={product.image} alt={product.title} /> {/* Increased width */}
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h2>
                                                <p className="text-gray-600 mb-2">{product.description}</p>
                                            </div>
                                            <p className="text-xl font-bold text-green-600">${product.price}</p>
                                        </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Category;
