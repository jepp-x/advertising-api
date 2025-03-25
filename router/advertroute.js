import { Router } from "express";
import { addAdvert, deleteAdvert, getAdverts, getOneAdvert, permanentlyDeleteAdverts, replaceAdvert, restoreAdverts, updateAdvert, viewDeletedAdverts } from "../controller/advertcontroller.js";
import { advertPicturesUpload } from "../middleware/upload.js";
import { isAuthenticated,isAuthorized } from "../middleware/auth.js";


const advertRouter = Router();

// create adds 
advertRouter.post(
    "/adverts",
    isAuthenticated,
    isAuthorized(["vendor", "admin"]),
    advertPicturesUpload.array("pictures", 3),
    addAdvert
)

// update adds
advertRouter.patch("/adverts/:id", isAuthenticated,  isAuthorized(["vendor", "admin"]), updateAdvert)

// replace adds
advertRouter.put("/adverts/:id", isAuthenticated,  isAuthorized(["vendor", "admin"]), replaceAdvert)

// view all adds
advertRouter.get("/adverts", getAdverts)

//view deleted adds
advertRouter.get("/adverts-deleted", isAuthenticated, isAuthorized(['vendor', 'admin']), viewDeletedAdverts)

// view only one add
advertRouter.get("/adverts/:id", getOneAdvert)

// delete adds
advertRouter.delete("/adverts/:id", isAuthenticated, isAuthorized(['vendor','admin']), deleteAdvert)


// restore mistaken deleted add [put]
advertRouter.put("/adverts-restore/:id", isAuthenticated, isAuthorized(['vendor', 'admin']), restoreAdverts)

//delete adds permanently fron trash
advertRouter.delete("/adverts-delete/:id", isAuthenticated, isAuthorized(['admin']), permanentlyDeleteAdverts)

// log action details on deletion [admin and superadmin only]

export default advertRouter