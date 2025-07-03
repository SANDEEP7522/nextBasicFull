import User from "@/models/userModel";
import nodeMailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    // create hashed token
    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    // update user
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log('transporter',transporter);
    
    console.log("SMTP transporter configured successfully");
    

    // send mail with defined transport object
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

      html: (() => {
        switch (emailType) {
          case "VERIFY":
            return `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to verify your email</p>`;
          case "RESET":
            return `<p>Click <a href="${process.env.DOMAIN}/reset-password/${hashToken}">here</a> to reset your password</p>`;
          default:
            return `<p>This is a default email message.</p>`;
        }
      })(),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

