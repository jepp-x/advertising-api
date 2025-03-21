import { userModel } from "../model/usermodel.js";
import { loginUserValidator, registerUserValidator } from "../validator/uservalidator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


// register new user (vendor / regular user)
export const registerUser = async (req, res, next) => {
    // Validate user information
    const { error, value } = registerUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }

    // Check if user does not exist already
    const user = await userModel.findOne({
        $or: [
            { email: value.email },
        ]
    });

    if (user) {
        return res.status(409).json('User already exists ')
    }
    // Hash plaintext password
    const hashedPassword = bcrypt.hashSync(value.password, 10);

    // Create user record in database
    const result = await userModel.create({
        ...value,
        password: hashedPassword
    });

    // Save user data in the database
    await user.save();

    // Send registration email to user

    const sendWelcomeEmail = await sendEmail(newUser.email, "Welcome to Adverts",
        `Hello ${newUser.userName}, You are welcome`)

    // (optionally) Generate access token for user

    // Return response
    res.status(201).json('User registered successfully')
};


//login new user (vendor / regular user)
export const loginUser = async (req, res, next) => {
    // Validate user information
    const { error, value } = loginUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }

    // Find matching user record in database
    const user = await userModel.findOne({
        $or: [
            { email: value.email },
        ]
    });
    if (!user) {
        return res.status(404).json('User does not exist! ')
    };

    // Compare incoming password with saved password 
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
        return res.status(401).json('Incorrect details!')
    }

    // Generate access token for user(role will be assinged to only the vendor)


    // Return response
    res.status(200).json('Login successful')
}



