import useCandidates from "@/hooks/useCandidates"
import { useEffect, useState } from "react"
import { Candidate } from "@/types/candidates"
import { DataTable } from "../ui/dataTable"
import { columns } from "./candidateColumns"



export default function CandidatesDataTable() {
  const [ rows, setRows ] = useState<Candidate[]>([])

  async function getData() {
    const data = await useCandidates().read()
    setRows(data)
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
