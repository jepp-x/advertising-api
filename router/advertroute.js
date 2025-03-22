import { Router } from "express";
import { addAdvert, deleteAdvert, getAdverts, getOneAdvert, permanentlyDeleteAdverts, replaceAdvert, restoreAdverts, updateAdvert, viewDeletedAdverts } from "../controller/advertcontroller.js";
import { advertPicturesUpload } from "../middleware/upload.js";


const advertRouter = Router();

// create adds advertPicturesUpload.array("pictures", 3),
advertRouter.post("/adverts", addAdvert)

// update adds
advertRouter.patch("/adverts/:id", updateAdvert)

// replace adds
advertRouter.put("/adverts/:id", replaceAdvert)

// view all adds
advertRouter.get("/adverts", getAdverts)


// view only one add
advertRouter.get("/adverts/:id", getOneAdvert)

// delete adds
advertRouter.delete("/adverts/:id", deleteAdvert)

//view deleted adds
advertRouter.get("/adverts-deleted", viewDeletedAdverts)

// restore mistaken deleted add [put]
advertRouter.put("/adverts-restore/:id", restoreAdverts)

//delete adds permanently fron trash
advertRouter.delete("/adverts-delete/:id", permanentlyDeleteAdverts)

// log action details on deletion [admin and superadmin only]

// 

export default advertRouter