export interface Category {
    id: number;
    name: string;
    description?: string;
}


export interface CardProps {
    name: string;
    description?: string;
    categoryId: number;
    count: number;
    units: string;
    imageUrl?: string;
}

