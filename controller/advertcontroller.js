import { AdvertModel } from "../model/advertmodel.js";
import { advertIdValidator, advertValidator, updateAdvertValidator } from "../validator/advertvalidator.js";


// POST or add advert
export const addAdvert = async (req, res, next) => {
    try {
        const { error, value } = advertValidator.validate({
            ...req.body,
            pictures:req.files?.map((file) => {
                return file.filename
            })
        },{abortEarly:false});
        if (error) {
            return res.status(422).json(error);
        }
        // save advert details 
        const result = await AdvertModel.create({
            ...value,
            // userId: req.auth.id
        })
        return res.status(201).json(result)
    } catch (error) {
        if (error.name === "MongooseError") {
            return res.status(409).json(error.message)
        }
        next(error)
    }
};



// GET/view all advert with search and filter 
export const getAdverts = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}" } = req.body;

        const result = await AdvertModel
            .find({ ...JSON.parse(filter), isDeleted: false })
            .sort(JSON.parse(sort));

        res.json(result)
    } catch (error) {
        next(error)
    }
};


// GET one advert 
export const getOneAdvert = async (req, res, next) => {
    try {
        const { error, value } = advertIdValidator.validate(req.params, { abortEarly: false })
        if (error) {
            return res.status(400).json(error)
        }
        const result = await AdvertModel.findById(value.id)
        if (!result) {
            return res.status(404).json({ message: "Advert not found" })
        }
        res.json(result)
    } catch (error) {
        next(error)
    }
};


// Patch/update advert
export const updateAdvert = async (req, res, next) => {
    try {
        const { error, value } = updateAdvertValidator.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json(error)
        }
        const result = await AdvertModel.findByIdAndUpdate(req.params.id, value, { new: true })
        if (!result) {
            return res.status(404).json("Advert not found")
        }
        res.status(200).json({
            message: "Advert successfully updated",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// PUT/replace advert
export const replaceAdvert = async (req, res, next) => {
    try {
        const { error, value } = advertValidator.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json(error)
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
        next(error)
    }
}

// DELETE advert  [add logic to save all an activity log]
export const deleteAdvert = async (req, res, next) => {
    try {
        const { error, value } = advertIdValidator.validate(req.params, { abortEarly: false })
        if (error) {
            return res.status(400).json(error)
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
            data: result
        })

    } catch (error) {
        next(error)
    }
}

// [get/ view deleted advert]  user: userId
export const viewDeletedAdverts = async (req, res, next) => {
    try {
        // const userId = req.user.id
        const result = await AdvertModel.find({ isDeleted: true })
        if (result.length === 0) {
            return res.status(404).json({ message: "No deleted adverts found" })
        }
        res.status(201).json({ message: "Here are your deleted messages", data: result })
    } catch (error) {
        next(error)
    }
}

// restore deleted adds
export const restoreAdverts = async (req, res, next) => {
    try {
        const result = await AdvertModel.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true })
        if (!result) {
            return res.status(404).json({ message: "Advert not found" })
        }
        res.status(201).json({
            message: "Advert suceesfully restored",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

//delete adverts permanently
export const permanentlyDeleteAdverts = async (req, res, next) => {
    try {
        const result = await AdvertModel.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({ message: "Advert not found" })
        }
        res.status(201).json({
            message: "Advert permanently deleted",
            data: result
        })
    } catch (error) {
        next(error)
    }
};