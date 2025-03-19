import react from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";


const HeroSection= () => {
    return(
        <section className="w-full pt-36 md:pt-48 pb-10">
            <div>
                <div>
                    <h1>
                        Your AI career coach for 
                        <br/>
                        Professional Success
                    </h1>
                    <p>
                    Advance your career with personalized guidance, interview prep, and
                    AI-powered tools for job success.
                    </p>
                </div>

                <div>
                    <Link href="/dashboard">
                    <Button size="lg" className="px-8"> 
                    Get Started 
                    </Button>
                    </Link>
                    <Link href="/dashboard">
                    <Button size="lg" className="px-8" variant="outline"> 
                    Get Started 
                    </Button>
                    </Link>
                </div>
                <div>
                    <div>
                        <Image 
                        src="/public/banner3.jpeg"
                        width={1280}
                        height={720}
                        alt="Dashboard Preview"
                        className="rounded-lg shadow-2xl border mx-auto"
                        priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
      
};
export default HeroSection ;