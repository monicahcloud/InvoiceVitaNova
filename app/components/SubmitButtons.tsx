"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import GoogleLogo from "../../public/googleLogo.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface iAppProps {
  text: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className?: string;
}

export default function SubmitButtons({ text, variant, className }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant={variant} className={cn("w-fit", className)}>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please Wait...
        </Button>
      ) : (
        <Button
          type="submit"
          className={cn("w-fit", className)}
          variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" className="w-full" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GoogleLogo} className="size-4 mr-2" alt="Google Logo" />
          Sign in with Google
        </Button>
      )}
    </>
  );
}
