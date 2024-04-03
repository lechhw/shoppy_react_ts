import React, { useState } from 'react';
import styles from './NewProducts.module.scss';
import { Button, Input, Upload, Spin } from 'antd';
import { PictureFilled } from '@ant-design/icons';
import { UploadImage } from '../../../features/Upload';
import { addNewProduct } from '../../../features/Products';
import { ProductType } from '../../../types/ProductTypes';

const NewProducts = () => {
    const [product, setProduct] = useState<ProductType>({ file: '', name: '', price: '', category: '', desc: '', option: '' });
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target;

        if (name === 'file') {
            setFile(files?.[0]);
        }
        setProduct((product) => ({ ...product, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 제품 사진을 Cloudinary에 업로드 하고 url 획득
        // Firebase에 새로운 제품 추가
        if (file) {
            setLoading(true);
            UploadImage(file)
                .then((url) => {
                    addNewProduct(product, url);
                })
                .finally(() => {
                    setLoading(false);
                    setProduct(() => ({ file: '', name: '', price: '', category: '', desc: '', option: '' }));
                    setFile(null);
                });
        }

        console.log('submit', file);
    };

    return (
        <section className={styles.container}>
            <strong className={styles.title}>제품 등록</strong>

            <div className={styles.wrap}>
                {loading && (
                    <div className={styles.bg}>
                        <Spin className={styles.loading} />
                    </div>
                )}
                <div className={styles.imgWrap}>
                    <div className={styles.img}>{file ? <img src={URL.createObjectURL(file)} alt="local file" /> : <PictureFilled className={styles.icon} />}</div>
                </div>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputWrap}>
                            <label htmlFor="file">업로드</label>
                            <input id="file" name="file" type="file" accept="image/*" value={product.file} required onChange={handleChange} />
                        </div>
                        <div className={styles.inputWrap}>
                            <label htmlFor="name">제품명</label>
                            <Input id="name" name="name" type="text" value={product.name} onChange={handleChange} required />
                        </div>
                        <div className={styles.inputWrap}>
                            <label htmlFor="price">가격</label>
                            <Input id="price" name="price" type="text" value={product.price} onChange={handleChange} />
                        </div>
                        <div className={styles.inputWrap}>
                            <label htmlFor="category">카테고리</label>
                            <Input id="category" name="category" type="text" value={product.category} onChange={handleChange} />
                        </div>
                        <div className={styles.inputWrap}>
                            <label htmlFor="desc">제품설명</label>
                            <Input.TextArea id="desc" name="desc" value={product.desc} onChange={handleChange} />
                        </div>
                        <div className={styles.inputWrap}>
                            <label htmlFor="option">옵션</label>
                            <Input id="option" name="option" type="text" placeholder="s,m,l" value={product.option} onChange={handleChange} />
                        </div>

                        <Button type="primary" className={styles['upload-btn']} onClick={handleSubmit}>
                            업로드
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewProducts;
