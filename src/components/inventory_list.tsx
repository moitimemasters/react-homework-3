
import React, { useMemo } from 'react';
import { Typography, Box, Grid2 } from '@mui/material';
import Card from './card';
import Modal from './modal';
import { useFilters } from '../context/FiltersProvider';
import { CardProps } from '../types';
import { useInView } from 'react-intersection-observer';
import { styled } from '@mui/system';

interface InventoryListProps {
    items: CardProps[];
}

const Container = styled(Box)({
    maxWidth: '1200px',
    margin: '0 auto',
});

const InventoryList: React.FC<InventoryListProps> = ({ items }) => {
    const [selectedItem, setSelectedItem] = React.useState<CardProps | null>(null);
    const { search, nonZeroStock, category } = useFilters();

    const filteredItems = useMemo(() => items.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesStock = !nonZeroStock || item.count > 0;
        const matchesCategory = !category || item.category === category;
        return matchesSearch && matchesStock && matchesCategory;
    }), [items, search, nonZeroStock, category]);

    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    const itemsPerPage = 20;

    const [visibleCount, setVisibleCount] = React.useState(itemsPerPage);

    React.useEffect(() => {
        if (inView && visibleCount < filteredItems.length) {
            setVisibleCount((prevCount) => prevCount + itemsPerPage);
        }
    }, [inView, filteredItems.length, visibleCount]);

    const handleCardClick = (item: CardProps) => {
        setSelectedItem(item);
    };

    const handleModalClose = () => {
        setSelectedItem(null);
    };

    return (
        <Box
            height="100vh"
            overflow="auto"
            sx={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
        >
            {filteredItems.length === 0 ? (
                <Typography variant="h6" gutterBottom>
                    Нет товаров, соответствующих фильтрам.
                </Typography>
            ) : (
                <Container>
                    <Grid2 container spacing={2} padding={2}>
                        {filteredItems.slice(0, visibleCount).map((item, index) => (
                            <Grid2
                                container
                                justifyContent="center"
                                ref={index === visibleCount - 1 ? ref : null}
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                key={index}
                            >
                                <Card {...item} onClick={() => handleCardClick(item)} />
                            </Grid2>
                        ))}
                    </Grid2>
                </Container>
            )}
            {selectedItem && (
                <Modal open={!!selectedItem} onClose={handleModalClose} {...selectedItem} />
            )}
        </Box>
    );
};

export default InventoryList;
