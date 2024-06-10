'use client'
import React from 'react';
import ProductsByCategory from "@/app/components/ProductsByCategory";
import Providers from "@/app/providers";


interface Params {
    category: string;
}

interface Props {
    params: Params;
}

const Category: React.FC<Props> = ({ params }) => {
    const { category } = params;


    return (
        <Providers>
        <div>
            <ProductsByCategory category={decodeURIComponent(category)}/>
        </div>
        </Providers>
    );
};

export default Category;
