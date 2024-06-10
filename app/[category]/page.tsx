import React from 'react';
import ProductsByCategory from "@/app/components/ProductsByCategory";

interface Params {
    category: string;
}

interface Props {
    params: Params;
}

const Category: React.FC<Props> = ({ params }) => {
    const { category } = params;

    return (
        <div>
            {decodeURIComponent(category)}
        </div>
    );
};

export default Category;
