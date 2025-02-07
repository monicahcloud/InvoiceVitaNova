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
import { useActionState } from "react";
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
    // Setup client validation
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchema });
    },
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            className="grid gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input
                  required
                  name={fields.firstName.name}
                  key={fields.firstName.key}
                  defaultValue={fields.firstName.initialValue}
                  placeholder="Jane"
                />
                <p className="text-red-500">{fields.firstName.errors}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input
                  required
                  name={fields.lastName.name}
                  key={fields.lastName.key}
                  defaultValue={fields.lastName.initialValue}
                  placeholder="Doe"
                />
                <p className="text-red-500">{fields.lastName.errors}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Address</Label>
              <Input
                required
                name={fields.address.name}
                key={fields.address.key}
                defaultValue={fields.address.initialValue}
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
                defaultValue={fields.phone.initialValue}
              />
              <p className="text-red-500">{fields.phone.errors}</p>
            </div>
            <SubmitButtons text="Finish Onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
