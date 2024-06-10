import React from 'react';
import ProductsByCategory from "@/app/components/ProductsByCategory";
import {useQuery} from "react-query";
import {getAllCategories, getProductByCategory, getProductById} from "@/app/api/services/CategoriesService";
import {ProductProps} from "@/app/types/ProductType";


interface Props {
    id: string;
}


const Category: React.FC<Props> = ({ id }) => {

    const { data, error, isLoading, isError } = useQuery<ProductProps, Error>('categories', () => getProductById(id), {
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
            <ul className="text-white">
                if (data) {
                    <li key={data && data.id}>
                        <h2>{data && data.title}</h2>
                        <p>{data && data.description}</p>
                        <p>Price: ${data && data.price}</p>
                        <img src={data && data.image} alt={data && data.title} width={50}/>
                    </li>
            }
            </ul>
        </div>
    );
};

export default Category;
