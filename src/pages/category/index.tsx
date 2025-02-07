import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryModal from './category_modal';
import { RootState } from '../../store/store';
import { addCategory, updateCategory, deleteCategory } from '../../store/categoriesSlice';
import { Category } from '../../types';


type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

const CategoriesPage: React.FC = () => {
    const categories = useSelector((state: RootState) => state.categories.items);
    const products = useSelector((state: RootState) => state.goods.items);
    const dispatch = useDispatch();

    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] =
        useState<Category | null>(null);

    const handleAddCategory = () => {
        setEditingCategory(null);
        setModalOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setModalOpen(true);
    };

    const handleDeleteCategory = (id: number) => {
        const isCategoryUsed = products.some((product) => product.categoryId === id);
        if (isCategoryUsed) {
            setErrorMessage('Невозможно удалить категорию – имеются товары, связанные с ней.');
            setErrorOpen(true);
            return;
        }

        dispatch(deleteCategory(id));
    };

    const handleModalSubmit = (data: Optional<Category, "id">) => {
        if (data.id != null && data.id != undefined) {
            dispatch(updateCategory(data));
        } else {
            const newId = new Date().valueOf();
            dispatch(addCategory({ ...data, id: newId }));
        }
    };

    const handleSnackbarClose = (
        _?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };


    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                Управление категориями
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddCategory}>
                Добавить категорию
            </Button>
            <List>
                {categories.map((category) => (
                    <ListItem
                        key={category.id}
                        secondaryAction={
                            <>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => handleEditCategory(category)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDeleteCategory(category.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={category.name}
                            secondary={category.description}
                        />
                    </ListItem>
                ))}
            </List>
            <CategoryModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                initialCategory={editingCategory || undefined}
                onSubmit={handleModalSubmit}
            />
            <Snackbar
                open={errorOpen}


                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CategoriesPage;
