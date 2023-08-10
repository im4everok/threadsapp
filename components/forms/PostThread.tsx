"use client";

import User from "@/Domains/User";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface PostThreadProps {
  userId: string;
}

const PostThread = ({
  userId
}: PostThreadProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      path: pathname,
      communityId: null
    });

    router.push('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem
              className="flex flex-col w-full
                    gap-3 mt-10"
            >
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl
                className="no-focus border border-dark-4
                bg-dark-3 text-light-1"
              >
                <Textarea rows={15} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />

        <Button type="submit" className="bg-primary-500">
          Post thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
