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

export function CommentForm() {
  const formSchema = z.object({
    comment: z.string().nonempty(),
    username: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("username", values.username);
    console.log("values:", values);
  }

  useEffect(() => {
    form.setValue("username", window.localStorage.getItem("username") ?? "");
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau commentaire</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="commentaire"
                  className="min-h-40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <pre>{form.formState.isValid ? "true" : "false"}</pre>
        <div className="flex justify-end">
          <Button type="submit" disabled={!form.formState.isValid}>
            Publier
          </Button>
        </div>
      </form>
    </Form>
  );
}
