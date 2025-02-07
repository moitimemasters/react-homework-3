import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    TextField,
    Box,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/goodsSlice';
import { CardProps, Category } from '../types';
import { RootState } from '../store/store';

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
}

const StyledDialog = styled(Dialog)(() => ({
    '& .MuiDialog-paper': {
        minWidth: '60vw',
        minHeight: '30vh',
        padding: '16px',
    },
}));

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.items) as Category[];


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [localCategory, setLocalCategory] = useState<number>(-1);
    const [count, setCount] = useState<number | ''>('');
    const [price, setPrice] = useState<number | ''>('');
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const validateForm = (): boolean => {
        const errors: { [key: string]: string } = {};
        if (!name.trim()) errors.name = 'Название обязательно';
        if (!description.trim()) errors.description = 'Описание обязательно';
        if (localCategory == -1) errors.category = 'Категория обязательна';
        if (count === '' || Number(count) < 0) errors.count = 'Количество обязательно и должно быть неотрицательным';
        if (price === '' || Number(price) < 0) errors.price = 'Цена обязательна и должна быть неотрицательной';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        const newProduct: CardProps = {
            id: Date.now().toString(),
            name: name.trim(),
            description: description.trim(),
            categoryId: localCategory,
            count: Number(count),
            price: Number(price),
            units: "шт",
        };

        dispatch(addProduct(newProduct));

        // Очистка формы
        setName('');
        setDescription('');
        setLocalCategory(-1);
        setCount('');
        setPrice('');
        setFormErrors({});

        onClose();
    };

    return (
        <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Добавить новый товар</DialogTitle>
            <DialogContent>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Название товара"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        multiline
                        rows={3}
                        label="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={!!formErrors.description}
                        helperText={formErrors.description}
                    />
                    <TextField
                        select
                        margin="normal"
                        fullWidth
                        label="Категория"
                        value={localCategory}
                        onChange={(e) => setLocalCategory(Number(e.target.value))}
                        error={!!formErrors.category}
                        helperText={formErrors.category}
                    >
                        {categories.map((category: Category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>


                    <TextField
                        margin="normal"
                        fullWidth
                        type="number"
                        label="Количество на складе"
                        value={count}
                        onChange={(e) => setCount(e.target.value === '' ? '' : Number(e.target.value))}
                        error={!!formErrors.count}
                        helperText={formErrors.count}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type="number"
                        label="Цена"
                        value={price}
                        onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        error={!!formErrors.price}
                        helperText={formErrors.price}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Отмена
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Сохранить
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default AddProductModal;
