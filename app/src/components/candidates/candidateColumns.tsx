import { ColumnDef } from "@tanstack/react-table"
import { Candidate } from "@/types/candidates"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import useCandidates from "@/hooks/useCandidates"
import useStore from "@/hooks/useStore"

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
  {
    id: 'actions',
    header: 'Actions',
    cell: ({row}) => {
      const candidate = row.original
      const candAPI = useCandidates()
      const setStore = useStore.setState

      function edit() {
        setStore((state) => ({
          candidates: {
            ...state.candidates,
            toEdit: candidate.id as number,
          },
        }));
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => candAPI.remove(candidate.id as Number)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>  
      )
    }
  },
]
