import React from 'react';
import Link from 'next/link';

function Page() {
    return (
        <div className='flex items-center justify-center flex-col mt-20 px-4'>
            <div className='flex items-center justify-center flex-col'>
                <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
                    Meet new people online
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-white mb-6">
                    OmeLive - Discover Random Connections
                </h1>
                <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 rounded-md pb-4 w-fit pt-4">
                    Engage in Random Chats
                </div>
            </div>

            <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
                Connect instantly with strangers, chat freely, and experience spontaneous interactions. Explore new friendships and conversations in a safe and anonymous environment.
            </div>

            <div className='bg-blue-500 p-5 rounded-lg text-white cursor-pointer mt-6'>
                <Link href='/talk'>
                    <p className='font-bold'>Start Chatting</p>
                </Link>
            </div>

    
        </div>
    );
}

export default Page;
