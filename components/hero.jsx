
    /* useRef is a React Hook, so it must be explicitly imported.
    By default, React does not auto-import hooks like useRef, useState, etc.*/

//rotating the banner image up and down by few degrees on landing page
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => { //hook 
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


    return(
        <section className="w-full pt-36 md:pt-48 pb-10">
            <div className="space-y-6 text-center">
                <div className="space-y-6 mx-auto">
                    <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient -mt-10">
                        Your AI career coach for 
                        <br/>
                        Professional Success  
                    </h1>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                    Advance your career with personalized guidance, interview prep, and
                    AI-powered tools for job success.
                    </p>
                </div>

                <div className="flex justify-center space-x-4">
                    <Link href="/dashboard">
                    <Button size="lg" className="px-8"> 
                    Get Started 
                    </Button>
                    </Link>
                    {/* <Link href="/dashboard">
                    <Button size="lg" className="px-8" variant="outline"> 
                    Get Started 
                    </Button>
                    </Link> */}
                </div>
                <div className="hero-image-wrapper mt-5 md:mt-0">
                    <div ref={imageRef} className="hero-image">
                    <Image
                    src="/banner3.jpeg"  // Ensure correct path
                    width={1280}
                    height={720}
                    alt="Dashboard Preview"
                    className="rounded-lg shadow-2xl border mx-auto"
                    unoptimized // Add this if Next.js optimization is causing an issue
                    priority // Ensures it loads faster
            />
                    </div>
                </div>
            </div>
        </section>
    );
      
};
export default HeroSection ;