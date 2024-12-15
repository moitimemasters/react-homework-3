import React, { createContext, useState, useContext, useDeferredValue } from 'react';

interface FiltersContextType {
    search: string;
    nonZeroStock: boolean;
    category: string;
    updateFilters: (filters: Partial<FiltersContextType>) => void;
    resetFilters: () => void;
}

const initialFilters: Omit<FiltersContextType, 'updateFilters' | 'resetFilters'> = {
    search: '',
    nonZeroStock: false,
    category: '',
};

const FiltersContext = createContext<FiltersContextType>({
    ...initialFilters,
    updateFilters: () => { },
    resetFilters: () => { },
});

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filters, setFilters] = useState(initialFilters);

    const deferredFilters = useDeferredValue(filters);

    const updateFilters = (newFilters: Partial<FiltersContextType>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    return (
        <FiltersContext.Provider
            value={{
                ...deferredFilters,
                updateFilters,
                resetFilters,
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
};
