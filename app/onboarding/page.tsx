"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButtons from "../components/SubmitButtons";
import { useActionState, useState } from "react";
import { onboardUser } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utlis/zodSchemas";

export default function Onboarding() {
  const [lastResult, action] = useActionState(onboardUser, undefined);

  const [form, fields] = useForm({
    lastResult,
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchema });
    },
  });
  const [firstName, setFirstName] = useState(
    fields.firstName.initialValue || ""
  );
  const [lastName, setLastName] = useState(fields.lastName.initialValue || "");
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_5000px_at_50%_200px,#ad6df480,transparent)]"></div>
      </div>
      <Card className="max-w-sm mx-auto">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-xl">
            Welcome to Business <span className="text-primary">Hub</span>
          </CardTitle>
          <CardDescription>
            You will need the to provide the following information to set up
            your account!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 ">
              <div className="">
                <Label>First Name</Label>
                <Input
                  required
                  name={fields.firstName.name}
                  key={fields.firstName.key}
                  defaultValue={fields.firstName.initialValue as string}
                  placeholder="Jane "
                />
                <p className="text-red-500">{fields.firstName.errors}</p>
              </div>
              <div className="">
                <Label>Last Name</Label>
                <Input
                  required
                  name={fields.lastName.name}
                  key={fields.lastName.key}
                  defaultValue={fields.lastName.initialValue as string}
                  placeholder=" Doe"
                />
                <p className="text-red-500">{fields.lastName.errors}</p>
              </div>
            </div>
            {/* Hidden Full Name Input */}

            <div className="flex flex-col gap-2">
              <Label>UserName</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  launchwithnova.com/
                </span>
                <Input
                  required
                  className="rounded-l-none"
                  name={fields.userName.name}
                  key={fields.userName.key}
                  defaultValue={fields.userName.initialValue as string}
                  placeholder="example-user-1"
                />
              </div>
              <p className="text-red-500">{fields.userName.errors}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Address</Label>
              <Input
                required
                name={fields.address.name}
                key={fields.address.key}
                defaultValue={fields.address.initialValue as string}
                placeholder="1234 Main Street, Anytown ST 12345"
              />
              <p className="text-red-500">{fields.address.errors}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Phone</Label>
              <Input
                required
                placeholder="XXX-XXX-XXXX"
                name={fields.phone.name}
                key={fields.phone.key}
                defaultValue={fields.phone.initialValue as string}
              />
              <p className="text-red-500">{fields.phone.errors}</p>
            </div>
            <div className="w-full">
              <SubmitButtons text="Complete Onboarding" className="w-full" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
