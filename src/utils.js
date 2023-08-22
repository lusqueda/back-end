import {fileURLToPath} from 'url';
import { dirname } from 'path';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
} 

export const validatePassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
} 

export const generateProducts = () => {
    return{
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),
            price: faker.commerce.price(),
            stock: faker.number.int(1000)
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;