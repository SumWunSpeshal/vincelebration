import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./button";

export function Settings() {
  const formSchema = z.object({
    username: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("username", values.username);
  }

  useEffect(() => {
    form.setValue("username", window.localStorage.getItem("username") ?? "");
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="outline-none block whitespace-nowrap overflow-hidden xs:w-16 sm:w-auto text-ellipsis">
        ⚙️
        <span className="sr-only xs:not-sr-only">Réglages</span>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle className="font-medium">Réglages</DialogTitle>
              <DialogDescription>
                Vos données restent sur le stockage de votre navigateur
                internet. Elles ne seront jamais transmises à nos serveurs.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mon nom d'affichage</FormLabel>
                  <FormControl>
                    <Input placeholder="nom" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ce nom est utilisé comme nom d'affichage pour les
                    commentaires
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" disabled={!form.formState.isValid}>
                  Sauvegarder
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
