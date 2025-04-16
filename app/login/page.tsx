import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "../utlis/auth";
import SubmitButtons, { GoogleAuthButton } from "../components/SubmitButtons";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="flex h-screen w-full items-center justify-center px-4">
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
              <SubmitButtons text="Login with Email" />
            </form>
            <hr />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
