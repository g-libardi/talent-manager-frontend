

export interface Candidate {
  id?: number,
  first_name: string;
  last_name: string;
  birth_date: string;
  skills: string;
  status: 'APPLIED' | 'REJECTED' | 'INVITED' | 'HIRED';
}


export interface CandidatesQueryParams {
  search?: string;
  status?: Candidate['status'];
}
