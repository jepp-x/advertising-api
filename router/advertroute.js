import { Router } from "express";
import { addAdvert, deleteAdvert, getAdverts, getOneAdvert, permanentlyDeleteAdverts, replaceAdvert, restoreAdverts, updateAdvert, viewDeletedAdverts } from "../controller/advertcontroller.js";
import { advertPicturesUpload } from "../middleware/upload.js";
import { isAuthenticated, checkAdminOrVendor, checkAdminOnly } from "../middleware/auth.js";


const advertRouter = Router();

// create adds advertPicturesUpload.array("pictures", 3),
advertRouter.post("/adverts",isAuthenticated,checkAdminOrVendor,addAdvert)

// update adds
advertRouter.patch("/adverts/:id", isAuthenticated, checkAdminOrVendor,updateAdvert)

// replace adds
advertRouter.put("/adverts/:id",isAuthenticated, checkAdminOrVendor, replaceAdvert)

// view all adds
advertRouter.get("/adverts", getAdverts)


// view only one add
advertRouter.get("/adverts/:id", getOneAdvert)

// delete adds
advertRouter.delete("/adverts/:id",isAuthenticated, checkAdminOrVendor, deleteAdvert)

//view deleted adds
advertRouter.get("/adverts-deleted", isAuthenticated, checkAdminOrVendor,viewDeletedAdverts)

// restore mistaken deleted add [put]
advertRouter.put("/adverts-restore/:id",isAuthenticated, checkAdminOrVendor, restoreAdverts)

//delete adds permanently fron trash
advertRouter.delete("/adverts-delete/:id",isAuthenticated, checkAdminOnly, permanentlyDeleteAdverts)

// log action details on deletion [admin and superadmin only]

export default advertRouter