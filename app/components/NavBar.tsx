import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/vitanovalogo.svg";
import { RainbowButton } from "@/components/magicui/rainbow-button";


export function Navbar() {
  return (
    <div className="flex items-center justify-between py-2 -mb-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-32" />
        <h3 className="text-3xl font-semibold">
          Business<span className="text-violet-600">Hub</span>
        </h3>
      </Link>
      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
       
      </Link>
    </div>
  );
}
