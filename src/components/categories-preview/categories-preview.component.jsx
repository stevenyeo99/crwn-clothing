import { Fragment } from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import { getCategoriesMap } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(getCategoriesMap);
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    const items = categoriesMap[title.toLowerCase()];

                    return (
                        <CategoryPreview key={title} title={title} products={items} />
                    )
                })
            }
        </Fragment>
    )
};

export default CategoriesPreview;