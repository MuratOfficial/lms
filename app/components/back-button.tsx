"use client"

import { useRouter } from "next/navigation";


interface BackButtonProps {
    title?: string | undefined;
}

function BackButton({ title}:BackButtonProps) {

    const router = useRouter();

  return (
    <button onClick={router.back} className=" rounded-md px-4 py-2 bg-gray-900 text-white hover:bg-gray-500 transition-all delay-75 duration-150">{title} </button>
  )
}

export default BackButton