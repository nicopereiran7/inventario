import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from "../../../api/auth";
import { getCategoryApi } from "../../../api/category";
import ListCategories from "../../../components/Admin/Categories/ListCategories";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [reloadCategories, setReloadCategories] = useState(false);
    const token = getAccessTokenApi();

    useEffect(() => {
        getCategoryApi(token).then(response => {
            setCategories(response.categories);
        })
    }, [token, reloadCategories]);

    return (
        <div>
            <ListCategories categories={categories} setReloadCategories={setReloadCategories} />
        </div>
    )
}
