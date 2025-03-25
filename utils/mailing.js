import { createTransport } from 'nodemailer';
import 'dotenv/config'


export const mailTransporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
})

export const emailMessage = `
<div>
<h1>Dear {{lastName}}</h1>
<p>A new account has been created for you!</p>
<h2>Thank you</h2>
</div>
`




// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.USER_EMAIL,
//         pass: process.env.USER_PASSWORD,
//     },
// });


// confimation mail for registeration 


// welcome email
// export const sendEmail = async (to, subject, lastName) => {
//     const emailMessage = `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Email Template</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f4f4f4;
//           margin: 0;
//           padding: 0;
//         }
//         .container {
//           max-width: 600px;
//           margin: 20px auto;
//           background: white;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }
//         .header {
//           background-color:rgb(116, 7, 67)
//           ;
//           color: white;
//           text-align: center;
//           padding: 10px 0;
//           border-radius: 8px 8px 0 0;
//         }
//         .content {
//           text-align: center;
//           padding: 20px;
//         }
//         .footer {
//           text-align: center;
//           font-size: 12px;
//           color: gray;
//           margin-top: 20px;
//         }
//         .btn {
//           display: inline-block;
//           background-color:rgb(116, 7, 67);
//           color: white;
//           text-decoration: none;
//           padding: 10px 20px;
//           border-radius: 5px;
//           margin-top: 20px;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>Welcome, ${lastName}!</h1>
//         </div>
//         <div class="content">
//           <p>We're thrilled to have you onboard. Click the button below to get started:</p>
//           <a href="https://www.example.com" class="btn">Get Started</a>
//         </div>
//         <div class="footer">
//           <p>&copy; 2025 Jeppx Development. All rights reserved.</p>
//         </div>
//       </div>
//     </body>
//     </html>`; 
//     const send = await transporter.sendMail({
//         from: process.env.USER_EMAIL,
//         to: to,
//         subject: subject,
//         html: emailMessage
//     });

//We can take it ouf if the email works.
//     console.log('email sent')
// }





// confirmation mail for product adding, patch, put, delete