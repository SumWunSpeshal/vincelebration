import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Textarea } from "./textarea";

export function PostForm() {
  const formSchema = z.object({
    content: z.string().nonempty(),
    username: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("username", values.username);
    console.log("POSTing post. values:", values);

    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => {
        console.log("POSTING succeeded. res:", res);
        location.reload();
      })
      .catch((e) => {
        console.warn("e:", e);
      });
  }

  useEffect(() => {
    form.setValue("username", window.localStorage.getItem("username") ?? "");
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mon nom d'affichage</FormLabel>
              <FormControl>
                <Input placeholder="nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mon message"
                  className="min-h-40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!form.formState.isValid}>
            Publier
          </Button>
        </div>
      </form>
    </Form>
  );
}
