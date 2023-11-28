import { IssuesStatusBadge } from '@/app/Components'
import { Status, issue } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

export interface issueQuery {
    status: Status, 
      orderBy: keyof issue,
      page: string 
  }

interface Props {
    searchParams: issueQuery,
    issues: issue[]
  }
  
const IssueTable = ({searchParams, issues}: Props) => {

  return (
    <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <Link href={{
                query: {...searchParams, orderBy: column.value}
              }}>{column.label}</Link>
              {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssuesStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssuesStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}
const columns:  
  {
    label: string; 
    value: keyof issue;
    className?: string
  }[] = [
    {label: 'Issue', value: 'title'},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'},
  ]

  export const columnNames = columns.map(column => column.value)

export default IssueTable