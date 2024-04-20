"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgePlus, CircleCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.enum(["js", "node"]),
});

function Create() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "js",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      name: values.name,
      type: values.type,
    };

    try {
      const res = await fetch("/api/createGround", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const data = await res.json();
      router.push(`/${data?.ground?.id}`);
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50">
        <BadgePlus size={35} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your playground</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="demo" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name of your playground.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="js">Vanilla JS</SelectItem>
                          <SelectItem value="node">Node.js</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is the language/preset for your playground.
                        <br />
                        <span className="text-[0.65rem]">
                          Note: This cannot be changed later.
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mx-auto flex items-center gap-2"
                  disabled={form.formState.isSubmitting}
                >
                  Submit <CircleCheck />
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Create;
