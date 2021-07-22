export interface User {
    id: number | null;
    nombre: string;
    email: string;
    password?: string;
    created_at?: string;
}