import React from 'react';
import ProductsByCategory from "@/app/components/ProductsByCategory";
import {useQuery} from "react-query";
import {getAllCategories, getProductByCategory} from "@/app/api/services/CategoriesService";
import {ProductProps} from "@/app/types/ProductType";


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
        <div>
            <h1>Products in {category}</h1>
            <ul className="text-white">
                {data && data.map((product) => (
                    <li key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <img src={product.image} alt={product.title} width={50}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Category;
