import { userModel } from "../model/usermodel.js";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validator/uservalidator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


// register new user (vendor / regular user)
export const registerUser = async (req, res) => {
    // Validate user information
    const { error, value } = registerUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }

    // Check if user does not exist already
    const user = await userModel.findOne({
        $or: [
            { email: value.email }
        ]
    })

    if (user) {
        return res.status(409).json('User already exists ')
    }
    // Hash plaintext password
    const hashedPassword = bcrypt.hashSync(value.password, 10);

    // Create user record in database
    const newUser = await userModel.create({
        ...value,
        password: hashedPassword
    });

    // (optionally) Generate access token for user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    res.status(201).json({ newUser, token });

    // Save user data in the database (not really needed since we are mongo alreade saves when we create)
    await newUser.save();

    // Send registration email to user
    const sendWelcomeEmail = await sendEmail(newUser.email, "Welcome to Jeppx Advertisement!",
        `Hello ${newUser.userName}`)

    // Return response
    res.status(201).json('User registered successfully')
};


//login new user (vendor / regular user)
export const loginUser = async (req, res) => {
    try {
        // Validate user information
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Find matching user record in database
        const user = await userModel.findOne({
            $or: [
                { email: value.email }
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
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET_KEY, { expiresIn: "24h" }
        );
        // Return response
        res.status(200).json({ message: 'Login successful', token });
    } catch {
        res.status(500).json({ message: 'server error' });
    }
}


export const updateUser = async (req, res) => {
    // Validate request body
    try {
        const { error, value } = updateUserValidator.validate(req.body);
        // Return error 
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }
        // Check if password is being updated
        if (value.password) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(value.password, 10);
            value.password = hashedPassword;
        }
        // Update user in database
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }
        );
        // if user is not found
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return response without password
        const {password, ...userWithoutPassword} =updatedUser.toObject();
        res.status(200).json({
            message: "Update successful",
            data: userWithoutPassword
        }); // This will not return with the password.
    } catch (error) {
        res.status(500).json({message:'Update User, Server Error'})
    }
}


// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.json({ message: 'can not get user!' })
    }
}