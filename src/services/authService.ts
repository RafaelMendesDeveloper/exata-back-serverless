import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { sendMail } from './emailService';

export const loginService = async (email: string, password: string) => {
    const user: any = await User.findOne({ email });

    if (!user) {
        throw new Error('email ou senha inválidos!');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('email ou senha inválidos!');
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
    );

    return token;
}

export const registerService = async (email: string, password: string) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('usuário já existe!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
}

export const generateTokenService = async (email: string) => {
    let user : any = await User.findOne({ email });

    if (!user) {
        throw new Error('email inválidos!');
    }

    const number = Math.floor(Math.random() * 1000000);
    user.lastToken = number.toString().padStart(6, '0');
    
    await user.save();

    await sendMail(email, user.lastToken);
}

export const verifyTokenService = async (email: string, token: string) => {
    let user : any = await User.findOne({ email });

    if(!user) {
        throw new Error('erro ao obter e-mail.');
    }

    if(user.lastToken != token){
        throw new Error('token inválido!');
    }
}

export const redefinePasswordService = async (email: string, password: string) => {
    let user: any = User.findOne({ email });

    if (!user) {
        throw new Error('email inválidos!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword; 

    await user.save();
}