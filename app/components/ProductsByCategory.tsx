import React from 'react';
import { useQuery } from 'react-query';
import { getProductByCategory } from "@/app/api/services/CategoriesService";

interface ProductsByCategoryProps {
    category: string;
}

const ProductsByCategory: React.FC<ProductsByCategoryProps> = ({ category }) => {
    const { data, error, isLoading, isError } = useQuery<object[], Error>(
        ['productsByCategory', category],
        () => getProductByCategory(category),
        {
            retry: 3
        }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Products in {category}</h1>
            <ul>
                {data && data.map((product, index) => (
                    <li key={index}>{JSON.stringify(product)}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsByCategory;
