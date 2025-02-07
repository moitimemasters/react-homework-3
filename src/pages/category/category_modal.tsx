import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    initialCategory?: { id?: number; name: string; description: string };
    onSubmit: (category: { id?: number; name: string; description: string }) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    open,
    onClose,
    initialCategory,
    onSubmit,
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialCategory) {
            setName(initialCategory.name);
            setDescription(initialCategory.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [initialCategory, open]);

    const handleSubmit = () => {
        onSubmit({ id: initialCategory?.id, name, description });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {initialCategory ? 'Редактировать категорию' : 'Добавить категорию'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Название категории"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Описание"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {initialCategory ? 'Сохранить' : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryModal;
