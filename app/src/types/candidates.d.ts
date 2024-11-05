

export interface Candidate {
  id: number,
  firstName: string;
  lastName: string;
  birtDate: string;
  skills: string;
  status: 'APPLIED' | 'REJECTED' | 'INVITED' | 'HIRED';
}


export interface CandidatesQueryParams {
  page: number;
  limit: number;
  search: string;
  status: Candidate['status'];
}
