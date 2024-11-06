import axios from "axios";
import useToast from "./useToast";
import { CandidatesQueryParams as QueryParams } from "@/types/candidates";
import useStore from "./useStore";


export default function useCandidates() {
  const toast = useToast();
  const setStore = useStore.setState;


  async function getOne(id: number) {
    try {
      const response = await axios.get(`/api/candidates/${id}/`);
      toast.success('Candidate fetched successfully');
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async function read(query: QueryParams = {}) {
    try {
      const response = await axios.get('/api/candidates/', { params: query });
      setStore((state) => ({
        candidates: {
          ...state.candidates,
          data: response.data,
        },
      }));
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
      setStore((state) => ({
        ...state,
        candidates: {
          ...state.candidates,
          data: [...state.candidates.data, response.data],
        },
      }));
      return (response).data;
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async function update(id: Number, data: Object) {
    try {
      const response = await axios.put(`/api/candidates/${id}/`, data);
      read();
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async function remove(id: Number) {
    try {
      const response = await axios.delete(`/api/candidates/${id}/`);
      read();
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
