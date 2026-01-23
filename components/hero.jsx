import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = () => {
  return <section className='w-full pt-36 md:pt-48 pb-10'>
    <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
            < h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
                Your AI Career Coach for <br /> Professional Success
            </h1>
            <p>Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.</p>
        </div>
        <div>
            <Link href={"/dashboard"}>
               <Button size='lg' className="px-8">Get Started</Button>
            </Link>
            <Link href={"https://github.com/siddharthasiddu11/Ryosai-AI-Career-Coach"}>
             <Button size='lg' variant='outline'>Watch Demo</Button>
            </Link>
        </div>
        <div>
            <div>
                <Image
                src={'/banner.png'}
                width={1280}
                height={720}
                alt='Preview'
                className='rounded-lg shadow-2xl border mx-auto'
                priority // so that it loads first
                />
            </div>
        </div>
    </div>
  </section>
}

export default HeroSection