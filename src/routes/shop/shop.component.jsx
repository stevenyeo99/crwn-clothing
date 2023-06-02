import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    getCategoriesAndDocuments
} from "../../utils/firebase/firebase.utils";

import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { setCategories } from '../../store/categories/categories.action';

import './shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const initCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        };

        initCategoriesMap();
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
};

export default Shop;