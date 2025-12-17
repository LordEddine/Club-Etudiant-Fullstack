export interface Student {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export interface Club {
    id: number;
    name: string;
    description: string;
    presidentId: number;
}
