import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";

@Injectable()
export class EmailService {
  private transporter = createTransport({
    service: "gmail",
    auth: {
      user: "chadi.troudi@esprit.tn",
      pass: "bacb acgj lrcv ahmp",
    },
  });

  async sendActivationEmail(
    email: string,
    token: string,
    password: string
  ): Promise<void> {
    const activationLink = `http://localhost:4200/activate/${token}`;
    const mailOptions = {
      from: "chadi.troudi@esprit.tn",
      to: email,
      subject: "Activate your account",
      html: `
        <h1>Dear User,</h1>
        <h2>Our Admin IOP created you as new user!!</h2> <br/>
       <p> Please click the following link to activate your account:</p> 
        <a href="${activationLink}">${activationLink}</a>
        <p>Best Regards,<br>Electric-cars-plateform Team</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
