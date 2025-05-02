import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import Logo from "@/public/logo.png";
import { auth, signIn } from "../utlis/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButtons, { GoogleAuthButton } from "../components/SubmitButtons";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4 bg-purple-900 bg-opacity-60">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex items-center gap-2 ">
            <Image src={Logo} alt="Business Hub logo" className="size-28" />
            <h3 className="text-3xl font-semibold">
              Business<span className="text-violet-600">Hub</span>
            </h3>
          </div>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
            className="w-full">
            <GoogleAuthButton />
          </form>

          <div className="flex items-center justify-center mt-2 text-sm font-medium text-gray-500">
            OR
          </div>

          <CardDescription className="text-center">
            Enter your email below to log into your account
          </CardDescription>

          <form
            action={async (formData) => {
              "use server";
              await signIn("nodemailer", formData);
            }}
            className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="hello@email.com"
              />
            </div>
            <SubmitButtons text="Login with Email" className="w-full" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
