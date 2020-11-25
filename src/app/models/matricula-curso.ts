import { Curso } from './curso';

export interface MatriculaCurso {
  id: number;
  codigoMatricula: string;
  trancada: boolean;
  curso: Curso;
}
