import bcrypt from 'bcryptjs';

export const hashPassword = async (salt: number, password: string) => {
    const saltAmount = await bcrypt.genSalt(salt);
    const secretPassword = await bcrypt.hash(password, saltAmount);
    return secretPassword;
};
