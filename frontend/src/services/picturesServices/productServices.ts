import axios from "axios";
import { apiConfig } from "../api/apiConfig";
// import { PictureType } from "../../types/PictureType"; need to add

export const getPictures = async () => {
  return axios.get(apiConfig.apiPicturesPath);
};

export const getOnePicture = async (id: string) => {
  return axios.get(apiConfig.apiOnePicturePath + `/${id}`);
};

export const addPicture = async (picture: PictureType, token: string) => {
  return axios.post(apiConfig.apiNewPicturePath, picture, {
    headers: { Authentication: `bearer ${token}` },
  });
};

export const deletePicture = async (token: string, id: string) => {
  return axios.delete(apiConfig.apiDeletePicturePath + `/${id}`, {
    headers: { Authentication: `bearer ${token}` },
  });
};


// all the pathes need to been added with Adir.