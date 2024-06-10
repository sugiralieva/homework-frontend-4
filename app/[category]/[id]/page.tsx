'use client'
import React from 'react';
import Providers from "@/app/providers";
import ProductsById from "@/app/components/ProductsById";


interface Params {
    id: string;
}

interface Props {
    params: Params;
}

const Category: React.FC<Props> = ({ params }) => {
    const { id } = params;


    return (
        <Providers>
            <div>
                <ProductsById id={id}/>
            </div>
        </Providers>
    );
};

export default Category;
