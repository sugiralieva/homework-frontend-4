'use client'
import React from 'react';
import { QueryClientProvider, useQuery } from 'react-query';
import { getAllCategories } from "@/app/api/services/CategoriesService";
import Link from "next/link";

const Categories = () => {
    // Массивы изображений
    const categoryImages = [
        '/images/electronics.jpg',
        '/images/jewelery.jpeg',
        '/images/men\'s clothing.jpg', // Убедитесь, что пути к изображениям верны
        '/images/women\'s clothing.jpg'
    ];

    // Запрос на получение всех категорий
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
        <div className="max-w-4xl mx-auto p-4">
            <div className='text-black text-4xl font-bold py-10 text-center'>Categories of products on OLX</div>

            <div className="flex flex-wrap gap-4 justify-center">
                {data && data.map((category: string, index: number) => {
                    const imageUrl = categoryImages[index % categoryImages.length];

                    return (
                        <div key={category} className="flex flex-col items-center mx-4">
                            <Link href={category}>
                                <div className="block">
                                    <img src={imageUrl} alt={category} className="w-24 h-24 rounded-full object-cover mb-2" />
                                    <div className="text-center text-black">{category}</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;
