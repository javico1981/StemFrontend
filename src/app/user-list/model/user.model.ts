export interface User {
    id: number | null;
    nombre: string;
    email: string;
    tipo_usuario: number;
    password?: string;
    created_at?: string;
}