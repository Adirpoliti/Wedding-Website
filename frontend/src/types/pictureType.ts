export type FetchedPictureType = {
    _id: string;
    photoUrl: string;
    fileName: string;
}

export type UploadPictureType = {
    uploaderId: string;
    eventName: string;
    photoFile: File;
}