'use client'
import { Select } from '@radix-ui/themes'
import { Skeleton } from '@/app/Components'
import React, {useState, useEffect} from 'react'
import { issue, user } from "@prisma/client";
import axios from 'axios';
import {useQuery} from '@tanstack/react-query'

const AssigneeSelect = () => {
  const {data: users, error, isLoading} =useQuery<user[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 10000, // 10 min
    retry: 3
  })
  
  if (isLoading) return <Skeleton />
   
  if (error) return null;

  return (
    <Select.Root>
  <Select.Trigger placeholder='Assign...'/>
  <Select.Content>
    <Select.Group>
      <Select.Label>Suggestions</Select.Label>
      {users?.map(user => (
        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
      ))}
    </Select.Group>
  </Select.Content>
</Select.Root>
  )
}

export default AssigneeSelect



// Og fetch user data
// const [users, setUsers] = useState<user[]>([])

// useEffect(() => {
//   const fetchUsers = async () =>{
//     const {data} = await axios.get<user[]>('/api/users')
//     setUsers(data)
//   }

//   fetchUsers()
// }, [])