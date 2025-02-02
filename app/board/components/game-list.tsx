"use client"

import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation";

function GameList() {

    const pathname = usePathname();
    
  return (
    <div className="flex gap-4">
        <Link href={`${pathname}/find-game`} className="aspect-video relative h-60 overflow-hidden bg-opacity-80 bg-blue-200 rounded-xl flex justify-center items-center group hover:border-2 hover:border-blue-500 transition delay-75 duration-200">
            <span className="z-10 text-3xl font-bold py-4 px-8 rounded-xl bg-blue-500 bg-opacity-50 backdrop-blur-sm">Крокодил по Веб</span> 

            <Image src="/games/find-game.svg" width={400} height={400} alt="find-game" className="absolute object-cover z-0 group-hover:scale-90 transition-all delay-100 duration-300"/>
        </Link>
        <Link href={`${pathname}/practice-game`} className="aspect-video relative h-60 overflow-hidden bg-opacity-80 bg-yellow-200 rounded-xl flex justify-center items-center group hover:border-2 hover:border-yellow-500 transition delay-75 duration-200">
            <span className="z-10 text-3xl font-bold py-4 px-8 rounded-xl bg-yellow-500 bg-opacity-50 backdrop-blur-sm">По-практикуем</span> 

            <Image src="/games/practice-game.svg" width={400} height={400} alt="practice-game" className="absolute object-cover z-0 group-hover:scale-90 transition-all delay-100 duration-300"/>
        </Link>
      </div>
  )
}

export default GameList