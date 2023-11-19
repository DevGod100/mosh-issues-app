"use client";

import "easymde/dist/easymde.min.css";
import { useState } from "react";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/Components/ErrorMessage";
import Spinner from "@/app/Components/Spinner";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(
  () => import
  ("react-simplemde-editor"), 
  {ssr: false}
  )

type IssueFormData = z.infer<typeof createIssueSchema>

interface Props {
  issue?: Issue
}
const IssueForm = ({issue}: Props ) => {

  const router = useRouter();
  const { register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema)
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false)
      console.log(error);
      setError("an unexpected error occurred");
    }
  })


  return (
    <div className="max-w-xl">
      { error &&
        <Callout.Root color="red" className="mb-5">
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>
      }
      <form
        className="space-y-3"
        onSubmit={onSubmit}
      >
        <TextField.Root>
          <TextField.Input
          defaultValue={issue?.title}
            placeholder="Search for issues…"
            {...register("title")}
          />
        </TextField.Root>
       <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit new issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default IssueForm;
