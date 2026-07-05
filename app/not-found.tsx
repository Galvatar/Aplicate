"use client"

import { useRouter } from "next/navigation"
import Image from 'next/image';
import lightLogo from '@/public/lightLogo.png';
import darkLogo from '@/public/darkLogo.png';

export default function NotFoundPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center w-full h-full font-jakarta py-20 px-15 gap-10 bg-background text-on-background">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="h-30 aspect-square">
                    <Image
                    src={lightLogo}
                    className="aspect-square h-full block dark:hidden"
                    alt="Aplicate Logo"
                    priority
                    />
                    <Image
                    src={darkLogo}
                    className="aspect-square h-full hidden dark:block"
                    alt="Aplicate Logo"
                    priority
                    />
                </div>
                <h2 className="font-bold text-5xl text-primary">
                    404
                </h2>
            </div>
            <h1 className="font-bold text-3xl">
                Sorry, this page does not exist...
            </h1>
            <button
            onClick={() => router.push(`/`)}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md w-fit group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
            Back to Landing Page
          </button>
        </div>
    )
}