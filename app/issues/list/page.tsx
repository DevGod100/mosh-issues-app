import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssuesStatusBadge from "../../Components/IssuesStatusBadge";
import IssueActions from "./IssueActions";
import Link from "next/link";
import { Status, issue } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { 
    status: Status, 
    orderBy: keyof issue,
    page: string 
  };
}
const IssuesPage = async ({ searchParams }: Props) => {
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


  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  
  const orderBy = columns
  .map(column => column.value)
  .includes(searchParams.orderBy)
  ? { [searchParams.orderBy]: 'asc' }
  : undefined

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where: {status} })

  return (
    <div>
      <IssueActions />
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
    </div>
  );
};
export const dynamic = "force-dynamic";

export default IssuesPage;
