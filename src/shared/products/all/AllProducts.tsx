import React, { useEffect, useState } from 'react';
import styles from './AllProducts.module.scss';
import { getProducts } from '../../../features/Products';
import { ProductType } from '../../../types/ProductTypes';
import { Spin } from 'antd';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const [products, setProducts] = useState<ProductType[] | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getProducts()
            .then((data) => {
                data && setProducts(data);
            })
            .finally(() => setLoading(false));
    }, []);
    return (
        <div className={styles.container}>
            {loading ? (
                <Spin className={styles.loading} />
            ) : (
                <ul className={styles.list}>
                    {products ? (
                        products.map((item) => (
                            <li key={item.id}>
                                <ProductCard product={item} />
                            </li>
                        ))
                    ) : (
                        <li>
                            <span>결과 없음</span>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default AllProducts;
