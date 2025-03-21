import nodemailer from "nodemailer"
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});


// confimation mali for registeration 


// welcome email
export const sendEmail = async (to, subject, text) => {
    const send = await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: to,
        subject: 'Welcome to my Platform',
        text: text
    });

    //We can take it ouf if the email works.
    console.log('email sent')
}





// confirmation mail for product adding, patch, put, delete