import axios from "axios";
import { apiConfig } from "./api/apiConfig";
import type { FetchedPictureType } from "../types/pictureType";

export const getPictures = async (): Promise<FetchedPictureType[]> => {
  return axios
    .get(apiConfig.apiPicturesPath)
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error fetching data:", err);
    });
};

export const getPicsFromThePast = async (): Promise<FetchedPictureType[]> => {
  return axios
    .get(apiConfig.apiFetchPicsFromThePastPath)
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error fetching data:", err);
    });
};

export const getPicsFromCeremony = async (): Promise<FetchedPictureType[]> => {
  return axios
    .get(apiConfig.apiFetchPicsFromCeremonyPath)
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error fetching data:", err);
    });
};

export const addPicture = async (formData: FormData) => {
  return axios.post(apiConfig.apiNewPicturePath, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePicture = async (token: string, id: string) => {
  return axios.delete(apiConfig.apiDeletePicturePath + `/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const downloadChecked = async (photoIds: string[]) => {
  return axios.post(
    apiConfig.apiDownloadCheckedPath,
    { photoIds },
    { responseType: "blob" }
  );
};
