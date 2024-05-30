'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from './ui/input';
import { ICreateDomainSchema, createDomainBodySchema } from "@/app/onboarding/[domain]/verify/createDomainBodySchema";
import { RedirectType, redirect } from "next/navigation";
import { navigate } from "./navigate";

/**
 * Create Domain Form Element. This element
 * can only be client side right now
 */
export function DomainForm() {
      // 1. Define your form.
  const form = useForm<ICreateDomainSchema>({
    resolver: zodResolver(createDomainBodySchema),
    defaultValues: {
      domain: ''
    },
    reValidateMode: "onChange"
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: ICreateDomainSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await navigate(`/onboarding/${values.domain}/verify`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md p-4 rounded-md">
        <h1 className="text-xl">Pick a Domain</h1>
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain Name</FormLabel>
              <FormControl>
                <Input placeholder="example.org" {...field} />
              </FormControl>
              <FormDescription>
                Enter your corporate domain. Usually, the one that users use to get email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  )
}