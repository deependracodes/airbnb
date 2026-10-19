import nodemailer from 'nodemailer';
import { mailerConfig } from '.';


console.log(mailerConfig,"confi of mail credentialas")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailerConfig.MAIL_USER,
        pass: mailerConfig.MAIL_PASS
    }
});

export default transporter;