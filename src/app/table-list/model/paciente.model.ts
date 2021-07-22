export interface Paciente {
    id: number;
    nombre: string;
    edad: number;
    genero: string;
    fecha_contagio: string;
    nivel_educativo: string;
    created_by: number;
    created_at: string;
    updated_by?: number;

}