import { baseUrl } from "./baseUrl";

export const apiConfig = {
    apiPicturesPath: baseUrl + "/photo/get",
    apiNewPicturePath: baseUrl + "/photo/add",
    apiDeletePicturePath: baseUrl + "/photo/delete/:id",
    apiDownloadCheckedPath: baseUrl + "/photo/download-zip"
}