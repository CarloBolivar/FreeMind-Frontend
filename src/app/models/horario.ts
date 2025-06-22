export interface Horario {
  idHorario: number;
  fecha: string;        // Formato ISO: 'YYYY-MM-DD'
  hora: string;         // Formato: 'HH:mm:ss'
  idUsuario: number;
  disponible: boolean;
}