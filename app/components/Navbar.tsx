import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="w-full bg-[#002f34] py-6">
            <div className="container mx-auto flex justify-between items-center">
                <Image
                    alt='logo'
                    className="text-white text-xl"
                    width={70}
                    height={70}
                    src='/images/olx-logo.png'
                />
                <div className="flex items-center">
                    <button
                        className="bg-white text-[#002f34] font-bold py-2 px-4 rounded border border-white focus:outline-none focus:shadow-outline hover:bg-[#002f34] hover:text-white">
                        <Link href='/add_product'>Подать объявление</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
