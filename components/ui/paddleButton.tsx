"use client"

import { useUser } from "@/hooks/use-user"
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

interface BuyButtonProps {
    yearly: boolean
    manage: boolean
}


export default function PaddleButton({ yearly, manage }: BuyButtonProps) {
    const { subscription, isProUser } = useUser();
    const [isPro, setIsPro] = useState(false);
    const [isPaddleReady, setIsPaddleReady] = useState(false);
    const router = useRouter();
    const paddleToken = process.env.NEXT_PUBLIC_PADDLE_TOKEN ?? "";
    const { user } = useUser();

  const handlePaddleInit = () => {
    if (typeof window !== 'undefined' && (window as any).Paddle) {
      const paddle = (window as any).Paddle;
      
      paddle.Environment.set('production'); 
      
      paddle.Initialize({ 
        token: paddleToken,
        eventCallback: (data: { name: string }) => {
            if (data.name === 'checkout.completed') {
                setTimeout(() => {
                    router.push('/settings'); 
                }, 2000);
            }
        }
      });
      
      setIsPaddleReady(true);
    }
  };

    const openCheckout = () => {
        const priceId = yearly ? 'pri_01kw1626h6g1ngj91v80bysqf1' : 'pri_01kw1643fg9r3a8b8ap9ckqt90';

        if (!user || user == null || user == undefined) router.push('/signup');
        
        if (typeof window !== 'undefined' && (window as any).Paddle) {
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

            (window as any).Paddle.Checkout.open({
            settings: {
                displayMode: 'overlay',
                theme: isDarkMode ? 'dark' : 'light',
            },
            items: [
                {
                    priceId: priceId,
                    quantity: 1,
                },
            ],
            customData: {
                user_id: String(user!.id), 
            }
            });
        }
    };

    useEffect(() => {
        if (subscription == null) return;
        setIsPro(isProUser());
    }, [subscription])

    if (manage) {
        return (
            <button 
                onClick={async () => {
                    const response = await fetch('/api/billing/portal', { method: 'POST' });
                    const data = await response.json();
                    
                    if (data.url) {
                    // Redirect the user to the secure Paddle portal
                    window.location.href = data.url; 
                    }
                }}
                className="flex text-nowrap items-center font-semibold gap-2 px-4 py-2 bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container rounded-lg transition-colors duration-300"
            >
                Manage Subscription
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/>
                </svg>
            </button>
        )
    }

    return (
        <div className="w-full">
            <Script 
                src="https://cdn.paddle.com/paddle/v2/paddle.js" 
                onLoad={handlePaddleInit}
            />
            <button
                disabled={isPro || !isPaddleReady}
                onClick={openCheckout}
                className="w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary bg-primary rounded-lg text-on-primary text-center font-medium hover:bg-primary/60 transition-colors font-semibold"
            >
                {!user ? 'Sign up/Sign' : 'Upgrade to Pro'}
            </button>
        </div>
    )
}