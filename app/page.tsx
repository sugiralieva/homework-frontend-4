'use client'
import Navbar from "@/app/components/Navbar";
import Categories from "@/app/components/Categories";
import Providers from "@/app/providers";


export default function Home() {
    return (
        <Providers>
    <div className='min-h-screen bg-white'>
      <Navbar/>
        <Categories/>
    </div>
        </Providers>

  );
}
