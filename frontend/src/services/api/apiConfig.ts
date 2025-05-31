import { baseUrl } from "./baseUrl";

export const apiConfig = {
    apiPicturesPath: baseUrl + "/photo/get",
    // apiOnePicturePath: baseUrl + "/homePage",
    apiNewPicturePath: baseUrl + "/photo/add",
    apiDeletePicturePath: baseUrl + "/photo/delete/:id"
}