import { MatriculaCurso } from './matricula-curso';
export interface Aluno {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    email: string;
    idade: number;
    ativo: boolean;
    sexo: string;
    matriculas: MatriculaCurso[];
}
