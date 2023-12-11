import bcrypt from 'bcrypt';

 export async function generatePwd(pwd: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pwd, salt);
    return hash;
}

export async function comparePwd(pwd: string, hashPwd: string) {
    const isMatch = await bcrypt.compare(pwd, hashPwd);
    return isMatch;
}