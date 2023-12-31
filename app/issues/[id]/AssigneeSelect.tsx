"use client";
import { Select } from "@radix-ui/themes";
import { Skeleton } from "@/app/Components";
import React, { useState, useEffect } from "react";
import { issue, user } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useUsers()

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = async (userId: string) => {
    // axios.patch("/api/issues/" + issue.id, {assignToUserId: userId === "unassigned" ? null : userId}) // fix bug from this dude  https://forum.codewithmosh.com/t/a-select-item-must-have-a-value-prop-that-is-not-an-empty-string-this-is-because-the-select-value-can-be-set-to-an-empty-string-to-clear-the-selection-and-show-the-placeholder/23078
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignToUserId: userId || null,
      });
      toast.success("Successfully toasted!");
    } catch (error) {
      toast.error("This didn't work.");
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {/* <Select.Item  value="">Unassigned</Select.Item> */}
            <Select.Item value="unassigned">Unassigned</Select.Item>

            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => useQuery<user[]>({
  queryKey: ["users"],
  queryFn: () => axios.get("/api/users").then((res) => res.data),
  staleTime: 60 * 1000, // 10 min
  retry: 3,
});

export default AssigneeSelect;

// Og fetch user data
// const [users, setUsers] = useState<user[]>([])

// useEffect(() => {
//   const fetchUsers = async () =>{
//     const {data} = await axios.get<user[]>('/api/users')
//     setUsers(data)
//   }

//   fetchUsers()
// }, [])
