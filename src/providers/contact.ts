import type { IAPISuccessResponse } from "types";
import { restAPI } from "./config";

const getData = (res: any) => (res.data as IAPISuccessResponse).data;

export function getContactsRequest(page: number, limit: number) {
  return restAPI
    .get<IAPISuccessResponse>("/contacts", {
      params: { limit, page },
    })
    .then(getData);
}

export function addContactRequest(data: FormData) {
  return restAPI
    .post<IAPISuccessResponse>("/contacts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(getData);
}

export function updateContactRequest(id: number, data: FormData) {
  return restAPI
    .patch<IAPISuccessResponse>(`/contacts/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(getData);
}

export function deleteContactRequest(id: number) {
  return restAPI.delete<IAPISuccessResponse>(`/contacts/${id}`).then(getData);
}
