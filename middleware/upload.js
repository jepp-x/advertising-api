import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";


// uploading images for adverts (using multer)
export const remoteUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: "/advertising-api/*"
    })
});

export const advertPicturesUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: "/advertising-api/advert-pictures/*"
    })
});