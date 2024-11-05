import { ColumnDef } from "@tanstack/react-table"
import { Candidate } from "@/types/candidates"

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'first_name',
    header: 'First Name',
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
  },
  {
    accessorKey: 'birth_date',
    header: 'Birth Date',
  },
  {
    accessorKey: 'skills',
    header: 'Skills',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]
