import initApp from './firebase';
import { getDatabase, ref, set, get } from 'firebase/database';
import { ProductType } from '../types/ProductTypes';
import { v4 as uuid } from 'uuid';

const database = getDatabase(initApp);

export const addNewProduct = async (product: ProductType, image: string) => {
    const id = uuid();
    set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        option: product.option.split(','),
    });
};

export const getProducts = async () => {
    return await get(ref(database, 'products'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const tmp: ProductType[] = Object.values(snapshot.val());
                return tmp;
            }
        })
        .catch(console.error);
};
