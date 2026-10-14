import nodemailer from 'nodemailer';
import { mailerConfig } from '.';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailerConfig.MAIL_USER,
        pass: mailerConfig.MAIL_PASS
    }
});

export default transporter;