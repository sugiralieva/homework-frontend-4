'use client'
import React from 'react';
import {QueryClientProvider, useQuery} from 'react-query';
import { getAllCategories } from "@/app/api/services/CategoriesService";
import Link from "next/link";

const Categories = () => {
    const { data, error, isLoading, isError } = useQuery<string[], Error>('categories', getAllCategories, {
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
            <h1>Categories</h1>
            <ul className='text-black'>
                {data && data.map((category: string) => (
                    <li><Link href={category} key={category}>{category}</Link></li>
                ))}
            </ul>
        </div>

    );
};

export default Categories;
