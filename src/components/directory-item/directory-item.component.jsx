import { useNavigate } from 'react-router-dom';

import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles.jsx';

const DirectoryItem = (props) => {
    const { title, imageUrl, route } = props.category;
    const navigate = useNavigate();

    const navigateRouteHandler = () => {
        navigate(route);
    };

    return (
        <DirectoryItemContainer onClick={navigateRouteHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;