import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CandidateCreationForm from "./candidateCreationForm"

export default function CreateCandidate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Candidate</Button>
      </DialogTrigger>


      <DialogContent className="max-w-[90%] max-h-[90%] overflow-auto lg:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create candidate</DialogTitle>
          <DialogDescription>
            Fill the form and click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CandidateCreationForm />

      </DialogContent>
    </Dialog>
  )
}

