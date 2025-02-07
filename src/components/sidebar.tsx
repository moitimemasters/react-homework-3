import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    IconButton,
    Typography,
    MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateFilterCriteria, resetFilterCriteria } from '../store/goodsSlice';
import { Category } from '../types';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const drawerWidth = 350;

const StyledDrawer = styled(Drawer)(() => ({
    '& .MuiDrawer-paper': {
        width: drawerWidth,
    },
}));

const Header = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
});

const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
    gap: '10px',
});

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    // Получаем текущие значения фильтров из goods slice
    const { search, nonZeroStock, category } = useSelector(
        (state: RootState) => state.goods.filter
    );
    const categories = useSelector((state: RootState) => state.categories.items)
    const dispatch = useDispatch();
    const [localSearch, setLocalSearch] = React.useState(search);
    const [localNonZeroStock, setLocalNonZeroStock] = React.useState(nonZeroStock);
    const [localCategory, setLocalCategory] = React.useState(category);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleFilterApply = () => {
        dispatch(
            updateFilterCriteria({
                search: localSearch,
                nonZeroStock: localNonZeroStock,
                category: localCategory,
            })
        );
        toggleSidebar();
    };

    const handleReset = () => {
        dispatch(resetFilterCriteria());
        setLocalSearch('');
        setLocalNonZeroStock(false);
        setLocalCategory(-1);
        toggleSidebar();
    };

    return (
        <StyledDrawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open={isOpen}
            onClose={toggleSidebar}
        >
            <Header>
                <Typography variant="h6">Фильтры</Typography>
                <IconButton onClick={toggleSidebar}>
                    <CloseIcon />
                </IconButton>
            </Header>
            <List>
                <ListItem>
                    <TextField
                        label="Поиск"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={localNonZeroStock}
                                onChange={(e) => setLocalNonZeroStock(e.target.checked)}
                            />
                        }
                        label="Только товары в наличии"
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        select
                        label="Категория"
                        value={localCategory}
                        onChange={(e) => setLocalCategory(+e.target.value)}
                        fullWidth
                    >
                        {categories.map((category: Category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                    </TextField>
                </ListItem>
                <ButtonContainer>
                    <Button variant="contained" color="primary" onClick={handleFilterApply}>
                        Применить фильтры
                    </Button>
                    <Button variant="outlined"


                        color="secondary" onClick={handleReset}>
                        Сбросить
                    </Button>
                </ButtonContainer>
            </List>
        </StyledDrawer>
    );
};

export default Sidebar;
