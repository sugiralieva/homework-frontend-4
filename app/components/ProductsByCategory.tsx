import React from 'react';
import ProductsByCategory from "@/app/components/ProductsByCategory";
import {useQuery} from "react-query";
import {getAllCategories, getProductByCategory} from "@/app/api/services/CategoriesService";
import {ProductProps} from "@/app/types/ProductType";
import Link from "next/link";


interface Props {
    category: string;
}


const Category: React.FC<Props> = ({ category }) => {

    const { data, error, isLoading, isError } = useQuery<ProductProps[], Error>('categories', () => getProductByCategory(decodeURIComponent(category)), {
        retry: 3
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Products in {category}</h1>
            <ul className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1">
                {data && data.map((product) => (
                    <li key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden flex">
                        <Link href={`${category}/${product.id}`} className="flex-shrink-0">
                                <img className="w-24 h-24 object-cover" src={product.image} alt={product.title}/>
                        </Link>
                        <div className="p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h2>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                            </div>
                            <p className="text-xl font-bold text-green-600">${product.price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Category;
