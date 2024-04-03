import React from 'react';
import { ProductType } from '../../../types/ProductTypes';
import styles from './AllProducts.module.scss';

interface OwnProps {
    product: ProductType;
}

const ProductCard = ({ product }: OwnProps) => {
    return (
        <div className={styles.card}>
            <img src={product.image} alt="local file" />
            <span>{product.name}</span>
        </div>
    );
};

export default ProductCard;
