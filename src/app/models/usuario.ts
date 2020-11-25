import { Permissao } from './permissao';
export interface Usuario {
  id: number;
  login: string;
  senha: string;
  email: string;
  permissoes: Permissao[];
}
