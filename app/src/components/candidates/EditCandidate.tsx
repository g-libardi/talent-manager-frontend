
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useStore from "@/hooks/useStore"
import { useState } from "react"
import CandidateEditionForm from "./candidateEditionForm"


export default function EditCandidate() {
  const [open, setOpen] = useState(false)

  useStore.subscribe((state, prevState) => {
    if (state.candidates.toEdit !== prevState.candidates.toEdit) {
      setOpen(true)
    }
  });
  
  function onOpenChange(state: boolean) {
    useStore.setState((state) => ({ candidates: { ...state.candidates, toEdit: null } }))
    setOpen(state)
  }
    

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Edit Candidate</Button>
      </DialogTrigger>


      <DialogContent className="max-w-[90%] max-h-[90%] overflow-auto lg:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Edit candidate</DialogTitle>
          <DialogDescription>
            Fill the form and click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CandidateEditionForm />

      </DialogContent>
    </Dialog>
  )
}


