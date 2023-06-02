export const getCategoriesMap = (state) => (state.categories.categories.reduce((acc, data) => {
    const { title, items } = data;
    acc[title.toLowerCase()] = items;
    return acc;
}, {})); 