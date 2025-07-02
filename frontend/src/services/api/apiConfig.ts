import { baseUrl } from "./baseUrl";

export const apiConfig = {
    apiPicturesPath: baseUrl + "/photo/get",
    apiFetchPicsFromThePastPath: baseUrl + "/photosFromThePast/get",
    apiNewPicturePath: baseUrl + "/photo/add",
    apiDeletePicturePath: baseUrl + "/photo/delete",
    apiDownloadCheckedPath: baseUrl + "/photo/download-zip",
}