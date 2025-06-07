import nodeMailer from "nodemailer";

export const sendMail = async ({ email, emailType, userId }:any) => {
  try {
 
     // TODO: configure email for user Later

    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: (() => {
        switch (emailType) {
          case "VERIFY":
            return "Verify your email";
          case "RESET":
            return "Reset your password";
          default:
            return "Email from Next Auth";
        }
      })(),
      
      text: "",
      html: `<p>Click <a href="http://localhost:3000/verify/${userId}">here</a> to verify your email</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

