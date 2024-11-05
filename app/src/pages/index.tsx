import CandidatesDataTable from "@/components/candidates/candidatesDataTable";
import CreateCandidate from "@/components/candidates/createCandidate";
import EditCandidate from "@/components/candidates/EditCandidate";
import { Card } from "@/components/ui/card";
import { useEffect } from "react"


export default function Candidates() {
  useEffect(() => {
    document.title = 'Candidates';
  }, []);
  return (
    <div className="size-full grid grid-cols-1 gap-3 pt-4">
      <CreateCandidate />
      <Card className="">
        <CandidatesDataTable />
      </Card>
    </div>
  )
}
