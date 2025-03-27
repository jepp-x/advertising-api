import { AdvertModel } from "../model/advertmodel.js";
import { advertIdValidator, advertValidator, updateAdvertValidator } from "../validator/advertvalidator.js";


// POST or add advert
export const addAdvert = async (req, res) => {
    try {
        const { error, value } = advertValidator.validate({
            ...req.body,
            pictures: req.files?.map((file) => {
                return file.filename
            })
        }, { abortEarly: false });
        if (error) {
            console.log(error.details);
            return res.status(422).json({ message: "Validation Unsuccessful", status: "error" });
        }


        // save advert details 
        const result = await AdvertModel.create({
            ...value,
            userId: req.auth.id
        })
        return res.status(201).json(result)
    } catch (error) {
        if (error.name === "MongooseError") {
            return res.status(409).json({ message: "Request not successful, Internal server error", status: "error" })
        }
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
};



// GET/view all advert with search and filter 
export const getAdverts = async (req, res) => {
    try {
        const { filter = "{}", sort = "{}" } = req.query;

        const result = await AdvertModel
            .find({ ...JSON.parse(filter), isDeleted: false })
            .sort(JSON.parse(sort));
        if (result.length === 0) {
            return res.status(404).json({ message: "No adverts found" })
        }

        res.json({
            message: "Here are the adverts",
            data: result
        })
    } catch (error) {
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
};

export const advertsByUser = async (req, res) => {
    try {
        const { filter = "{}", sort = "{}" } = req.query;

        const result = await AdvertModel
            .find({ ...JSON.parse(filter), userId: req.params.userId, isDeleted: false })
            .sort(JSON.parse(sort));
        if (result.length === 0) {
            return res.status(404).json({ message: "No adverts found" })
        }

        res.json({
            message: "Here are the adverts",
            data: result
        })
    } catch (error) {
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
}


// GET one advert 
export const getOneAdvert = async (req, res) => {
    try {
        const { error, value } = advertIdValidator.validate(req.params, { abortEarly: false })
        if (error) {
            return res.status(400).json({ message: "Validation Unsuccessful", status: "error" })
        }
        const result = await AdvertModel.findById(value.id)
        if (!result) {
            return res.status(404).json({ message: "Advert not found" })
        }
        res.json(result)
    } catch (error) {
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
};


// Patch/update advert
export const updateAdvert = async (req, res) => {
    try {
        const { error, value } = updateAdvertValidator.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({ message: "Validation Unsuccessful", status: "error" })
        }
        //find advert by id
        const confirmAdvert = await AdvertModel.findById(req.params.id)
        if (!confirmAdvert) {
            return res.status(404).json({ message: "Advert not found" })
        }
        //confirm that the authenticated owner owns the advert
        if (confirmAdvert.userId.toString() !== req.auth.id) {
            return res.status(403).json({ message: "You are not authorized to update this advert" })
        }
        //proced to update advert
        const result = await AdvertModel.findByIdAndUpdate(req.params.id, value, { new: true })
        if (!result) {
            return res.json({ message: "Advert not found", status: 'error' })
        }
        res.status(200).json({
            message: "Advert successfully updated",
            data: result,
            status: 'success'
        })
    } catch (error) {
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
}

// PUT/replace advert
export const replaceAdvert = async (req, res) => {
    try {
        const { error, value } = advertIdValidator.validate(req.params, { abortEarly: false })
        if (error) {
            return res.status(400).json({ message: "Validation Unsuccessful", status: "error" })
        }
        const confirmAdvert = await AdvertModel.findById(req.params.id)
        if (!confirmAdvert) {
            return res.status(404).json({ message: "Advert not found" })
        }

        if (confirmAdvert.userId.toString() !== req.auth.id) {
            return res.status(403).json({ message: "You are not authorized to update" })
        }
        const result = await AdvertModel.findByIdAndUpdate(req.params.id, value, { new: true })
        if (!result) {
            return res.status(404).json("Advert not found")
        }
        res.status(201).json({
            message: "Advert successfully updated",
            data: result
        })
    } catch (error) {
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
}

// DELETE advert  [add logic to save all an activity log]
export const deleteAdvert = async (req, res) => {
    try {
        const { error, value } = advertIdValidator.validate(req.params, { abortEarly: false })
        if (error) {
            return res.status(400).json({ message: "Validation Unsuccessful", status: "error" })
        }
        const confirmAdvert = await AdvertModel.findById(req.params.id)
        if (!confirmAdvert) {
            return res.status(404).json({ message: "Advert not found" })
        }

        if (confirmAdvert.userId.toString() !== req.auth.id) {
            return res.status(403).json({ message: "You are not authorized to delete this advert" })
        }
        const result = await AdvertModel.findByIdAndUpdate(
            value.id,
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        )
        if (!result) {
            return res.status(404).json("Advert not found")
        }
        res.status(201).json({
            message: "Advert deleted!",
            data: result,
            status: 'successful'
        })

    } catch (error) {
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
}

// [get/ view deleted advert]  user: userId
export const viewDeletedAdverts = async (req, res) => {
    try {
        // confirm ownership 
        if (req.params.userId !== req.auth.id) {
            return res.status(403).json({ message: "You are not authorized to view these deleted adverts" });
        }
        // const userId = req.user.id
        const result = await AdvertModel.find({ userId: req.params.userId, isDeleted: true })
        if (result.length === 0) {
            return res.status(404).json({ message: "No deleted adverts found" })
        }
        res.status(201).json({ message: "Here are your deleted adverts", data: result })
    } catch (error) {
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
}

// restore deleted adds
export const restoreAdverts = async (req, res) => {
    try {
        const confirmAdvert = await AdvertModel.findById(req.params.id)
        if (!confirmAdvert) {
            return res.status(404).json({ message: "Advert not found" })
        }

        if (confirmAdvert.userId.toString() !== req.auth.id) {
            return res.status(403).json({ message: "You are not authorized to restore advert" })
        }
        const result = await AdvertModel.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true })
        if (!result) {
            return res.status(404).json({ message: "Advert not found" })
        }
        res.status(201).json({
            message: "Advert suceesfully restored",
            data: result,
            status: 'success'
        })
    } catch (error) {
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
}

//delete adverts permanently
export const permanentlyDeleteAdverts = async (req, res) => {
    try {
        const result = await AdvertModel.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({ message: "Advert not found" })
        }
        res.status(201).json({
            message: "Advert permanently deleted",
            data: result,
            status: 'success'
        })
    } catch (error) {
        return res.json({ message: "Request not successful, kindly refresh your application", status: "error" })
    }
};