import useCandidates from "@/hooks/useCandidates"
import { useEffect, useState } from "react"
import { Candidate } from "@/types/candidates"
import { DataTable } from "../ui/dataTable"
import { columns } from "./candidateColumns"
import useStore from "@/hooks/useStore"



export default function CandidatesDataTable() {
  const data = useStore((state) => state.candidates.data)

  async function getData() {
    await useCandidates().read()
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
