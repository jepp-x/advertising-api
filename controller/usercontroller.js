import { userModel } from "../model/usermodel.js";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validator/uservalidator.js";
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
            { username: value.username },
            { email: value.email }
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
    // const token = jwt.sign({ _id: user._id },  process.env.JWT_SECRET_KEY);
    // res.status(201).json({user,token});

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
            {username: value.username},
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
    const accessToken = jwt.sign({id: user.id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "24h"}
    )


    // Return response
    res.status(200).json('Login successful')
}


export const updateUser = async (req, res, next) => {
    // Validate request body
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
    if (!up) {
        return res.status(404).json({ message: 'User not found' });
    }

    // (optionally) Generate access token for user


    // Return response
    res.status(200).json(result); // This will return with the password. We will have to write a code which will not return the password.
}