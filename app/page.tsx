'use client'
import Navbar from "@/app/components/Navbar";
import Categories from "@/app/components/Categories";
import Providers from "@/app/providers";


export default function Home() {
    return (
        <Providers>
            <div className="flex items-center justify-center min-h-screen">
                <div className='min-h-screen bg-white'>
                    <Categories/>
                </div>
            </div>
        </Providers>

);
}
