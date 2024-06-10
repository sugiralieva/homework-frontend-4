'use client'
import Navbar from "@/app/components/Navbar";
import Categories from "@/app/components/Categories";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
    <div className='min-h-screen bg-white'>
      <Navbar/>
        <Categories/>
    </div>
        </QueryClientProvider>

  );
}
