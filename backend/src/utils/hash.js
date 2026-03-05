import bcypt from 'bcrypt';

export const hashPassword = async (password) => {
    return await bcypt.hash(password, 12);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcypt.compare(password, hashedPassword);
}