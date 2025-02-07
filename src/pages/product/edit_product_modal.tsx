import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { CardProps } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../store/goodsSlice';
import { RootState } from '../../store/store';

interface EditProductModalProps {
    open: boolean;
    onClose: () => void;
    product: CardProps;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
    open,
    onClose,
    product
}) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState<CardProps>(product);
    const categories = useSelector((state: RootState) => state.categories.items)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: name === 'count' || name === 'price' || name === 'categoryId' ? Number(value) : value
        });
    };

    const handleSubmit = () => {
        dispatch(updateProduct(formValues));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Редактировать товар</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Название"
                    name="name"
                    fullWidth
                    value={formValues.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Описание"
                    name="description"
                    fullWidth
                    multiline
                    value={formValues.description}
                    onChange={handleChange}
                />
                <TextField
                    label="Категория"
                    select
                    name="categoryId"
                    value={formValues.categoryId}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                >
                    {categories.map((category) => <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>)}
                </TextField>
                <TextField
                    margin="dense"
                    label="Количество"
                    name="count"
                    type="number"
                    fullWidth
                    value={formValues.count}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Цена"
                    name="price"
                    type="number"
                    fullWidth
                    value={formValues.price}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Единицы измерения"
                    name="units"
                    fullWidth
                    value={formValues.units}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="URL изображения"
                    name="imageUrl"
                    fullWidth
                    value={formValues.imageUrl}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductModal;
