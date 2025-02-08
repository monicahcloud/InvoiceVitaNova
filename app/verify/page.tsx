import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#ad6df480_1px,transparent_1px),linear-gradient(to_bottom,#ad6df480_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_5000px_at_50%_200px,#ad6df480,transparent)]"></div>
        </div>
      </div>
      <Card className="w-[380px] px-5">
        <CardHeader className="text-center ">
          <div className="flex size-20 items-center justify-center rounded-full bg-violet-100 mx-auto mb-4">
            <Mail className="size-12 text-violet-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your Email</CardTitle>
          <CardDescription>
            We have sent a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {" "}
          <div className="mt-4 rounded-md bg-violet-50 border-yellow-300 p-4">
            <div className="flex items-center">
              <AlertCircle className="size-5 text-violet-400" />
              <p className="text-sm text-violet-700 font-medium ml-3">
                Be sure to check your spam folder!
              </p>
            </div>
          </div>{" "}
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={buttonVariants({
              className: "w-full",
              variant: "outline",
            })}
          >
            <ArrowLeft className="size-4 mr-2" /> Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
