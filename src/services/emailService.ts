import nodemailer from 'nodemailer';

export const sendMail = async (to: string, token: string): Promise<void> => {
    console.log(`USER: ${process.env.EMAIL_USERNAME}`);
    console.log(`PASSWORD: ${process.env.EMAIL_PASSWORD}`);

    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: `rafael.mendes.negocios@gmail.com`,
        to,
        subject: 'TOKEN PARA RECUPERAÇÃO DE SENHA',
        text: `Seu token de recuperação de senha é ` + token,
    };

    console.log('MAIL OPTIONS =====> ', mailOptions);

    await transporter.sendMail(mailOptions);
};