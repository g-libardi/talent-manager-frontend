import axios from "axios";
import useToast from "./useToast";
import { CandidatesQueryParams as QueryParams } from "@/types/candidates";


export default function useCandidates() {
  const toast = useToast();


  async function getOne(id: string) {
    try {
      const response = await axios.get(`/api/candidates/${id}`);
      toast.success('Candidate fetched successfully');
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async function read(query: QueryParams = {}) {
    try {
      const response = await axios.get('/api/candidates/', { params: query });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async function create(data: Object) {
    console.log('data', data);
    try {
      const response = await axios.post('/api/candidates/', data);
      console.log(response);
      return (response).data;
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async function update(id: Number, data: Object) {
    try {
      const response = await axios.put(`/api/candidates/${id}`, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async function remove(id: Number) {
    try {
      const response = await axios.delete(`/api/candidates/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }


  return {
    getOne,
    create,
    read,
    update,
    remove,
  }
}
