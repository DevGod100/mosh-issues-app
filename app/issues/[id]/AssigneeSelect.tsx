'use client'
import { Select } from '@radix-ui/themes'
import React, {useState, useEffect} from 'react'
import { issue, user } from "@prisma/client";
import axios from 'axios';

const AssigneeSelect = () => {
  const [users, setUsers] = useState<user[]>([])

  useEffect(() => {
    const fetchUsers = async () =>{
      const {data} = await axios.get<user[]>('/api/users')
      setUsers(data)
    }

    fetchUsers()
  }, [])
  

  return (
    <Select.Root>
  <Select.Trigger placeholder='Assign...'/>
  <Select.Content>
    <Select.Group>
      <Select.Label>Suggestions</Select.Label>
      {users.map(user => (
        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
      ))}
    </Select.Group>
  </Select.Content>
</Select.Root>
  )
}

export default AssigneeSelect