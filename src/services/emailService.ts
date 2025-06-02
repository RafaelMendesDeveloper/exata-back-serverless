import nodemailer from 'nodemailer';

export const sendMail = async (to: string, token: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Exata ADM" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'TOKEN PARA RECUPERAÇÃO DE SENHA',
        text: `Seu token de recuperação de senha é ` + token,
    };

    await transporter.sendMail(mailOptions);
};