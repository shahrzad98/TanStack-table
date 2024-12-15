import { api } from "~/api/apiClient";

export const uploader = (formData: FormData) =>
  api.post<{
    filename: string;
    url: string;
  }>(`/uploader`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
