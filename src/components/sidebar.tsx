
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFilters } from '../context/FiltersProvider';
import { useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

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
});

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const { search, nonZeroStock, category, updateFilters, resetFilters } = useFilters();
    const [localSearch, setLocalSearch] = React.useState(search);
    const [localNonZeroStock, setLocalNonZeroStock] = React.useState(nonZeroStock);
    const [localCategory, setLocalCategory] = React.useState(category);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleFilterApply = () => {
        updateFilters({
            search: localSearch,
            nonZeroStock: localNonZeroStock,
            category: localCategory,
        });
        toggleSidebar();
    };

    const handleReset = () => {
        resetFilters();
        setLocalSearch('');
        setLocalNonZeroStock(false);
        setLocalCategory('');
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
                        onChange={(e) => setLocalCategory(e.target.value)}
                        fullWidth
                    >
                        <option value=""></option>
                        <option value="clothes">Одежда</option>
                        <option value="electronics">Электроника</option>
                    </TextField>
                </ListItem>
                <ButtonContainer>
                    <Button variant="contained" color="primary" onClick={handleFilterApply}>
                        Применить фильтры
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleReset}
                        sx={{ marginLeft: '10px' }}
                    >
                        Сбросить
                    </Button>
                </ButtonContainer>
            </List>
        </StyledDrawer>
    );
};

export default Sidebar;
