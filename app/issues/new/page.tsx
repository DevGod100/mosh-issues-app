'use client'
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const newIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Search for issues…" />
      </TextField.Root>
      <TextArea placeholder="Description"/>
      <Button>Submit new issue</Button>
    </div>
  );
};

export default newIssuePage;
