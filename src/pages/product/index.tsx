import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { RootState } from '../../store/store';
import { CardProps } from '../../types';
import EditProductModal from './edit_product_modal';
import { removeProduct } from '../../store/goodsSlice';

const StyledContainer = styled('div')({
    maxWidth: '60vw',
    margin: '2rem auto'
});

const StyledImg = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '8px'
});

const ProductPage: React.FC = () => {
    const { id } = useParams();
    const productId = id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = useSelector((state: RootState) =>
        state.goods.items.find((item: CardProps) => item.id === productId)
    );

    const category = useSelector((state: RootState) =>
        state.categories.items.find((cat) => cat.id === (product ? product.categoryId : -1))
    );

    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleEditOpen = () => {
        setEditModalOpen(true);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
    };

    const handleDelete = () => {
        if (product) {
            dispatch(removeProduct(product.id));
            navigate('/products');
        }
    };

    if (!product) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Продукт не найден
            </Typography>
        );
    }

    return (
        <StyledContainer>
            <Box>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogContent dividers>
                    <StyledImg
                        src={product.imageUrl ? product.imageUrl : 'static/no-image.svg'}
                        alt={product.name}
                    />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {product.description}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
                        Категория:{' '}
                        {category ? `${category.name}${category.description ? ' (' + category.description + ')' : ''}` : product.categoryId}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
                        Количество: {product.count} {product.units}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
                        Цена: {product.price}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditOpen} color="primary" variant="contained">
                        Редактировать товар
                    </Button>
                    <Button onClick={handleDelete} color="secondary" variant="contained">
                        Удалить товар
                    </Button>
                    <Button onClick={() => navigate('/products')} color="inherit">
                        Назад
                    </Button>
                </DialogActions>
            </Box>
            {editModalOpen && (
                <EditProductModal


                    open={editModalOpen}
                    onClose={handleEditClose}
                    product={product}
                />
            )}
        </StyledContainer>
    );
};

export default ProductPage;
