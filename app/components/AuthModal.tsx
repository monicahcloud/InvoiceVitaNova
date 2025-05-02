import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.png";
import SubmitButtons, { GoogleAuthButton } from "./SubmitButtons";
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
import { redirect } from "next/navigation";

const AuthModal = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/home");
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[360px]">
          <DialogTitle></DialogTitle>
          <DialogHeader className="flex flex-row justify-center items-center gap-2">
            <Image src={Logo} alt="logo" className="size-10" />
            <h3 className="text-3xl font-semibold">
              Business<span className="text-violet-600">Hub</span>
            </h3>
          </DialogHeader>
          <div className="flex flex-col mt-5 gap-3">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl mx-auto">Login</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <form
                    action={async () => {
                      "use server";
                      await signIn("google");
                    }}
                    className="w-full">
                    <GoogleAuthButton />
                  </form>
                </div>

                <div className="justify-center flex mx-auto items-center mt-5">
                  <h2> OR </h2>
                </div>

                <CardDescription className="mt-2">
                  Enter your email below to login into your account
                </CardDescription>
                <form
                  action={async (formData) => {
                    "use server";
                    await signIn("nodemailer", formData);
                  }}
                  className="flex flex-col gap-y-4  mt-1">
                  <div className="flex flex-col gap-y-2">
                    <Label></Label>
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder="hello@email.com"
                    />
                  </div>
                  <SubmitButtons text="Login with Email" className="w-full" />
                </form>
                <hr />
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AuthModal;
