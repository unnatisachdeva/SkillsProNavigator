import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, Stars } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header= async()=> {

  await checkUser();
 
  return (
      <header>
        <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
          <Link href='/'>
            <Image
              src="/logo.png" 
              alt="Sensai logo"
              width={200}
              height={60}
              className="h-14 py-1 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant="outline">
                
                  <LayoutDashboard className="h-4 w-4" />
                  {/* To make Industry Insights button responsive */}
                  <span className="hidden md:block">Industry Insights</span>
                </Button>
              </Link>
            

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Stars className="h-4 w-4" />
                  {/* To make Growth Tools button responsive */}
                  <span className="hidden md:block">Growth Tools</span>  
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Build Resume</span> 
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link href="/ai-cover-letter" className="flex items-center gap-2">
                    <PenBox className="h-4 w-4" />
                    <span>Cover Letter</span> 
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Interview Prep</span> 
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button variant="outline">Sign in</Button> 
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
              appearance={{
                elements: {
                  avatarBox:"w-10 h-10",
                  userButtonPopoverCard: "shadow-x1",
                  userPreviewMainIdentifier: "font-semibold",
                }
              }} 
              afterSignOutUrl="/ "
              />
            </SignedIn>
          </div>
        </nav>
      </header>
    );
};

export default Header;
