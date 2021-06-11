import React, { useState, useEffect } from 'react';
import ListProducts from "../../../components/Admin/Products/ListProducts";
import { getAccessTokenApi } from "../../../api/auth";
import { getProductsApi } from "../../../api/product";
import { getCategoryApi } from "../../../api/category";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [reloadProducts, setReloadProducts] = useState(false);
    const token = getAccessTokenApi();
    
    useEffect(() => {
        getProductsApi(token).then(response => {
            setProducts(response.products);
        })
        getCategoryApi(token).then(response => {
            setCategory(response.categories);
        })
        setReloadProducts(false)
    }, [token, reloadProducts]); 

    return (
        <div>
            <ListProducts products={products} category={category} setReloadProducts={setReloadProducts} />
        </div>
    )
}
