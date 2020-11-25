import { PerguntaSecreta } from './pergunta-secreta';
import { Usuario } from './usuario';
export interface PerguntaSecretaUsuario {
  id: number;
  usuario: Usuario;
  perguntaSecreta: PerguntaSecreta;
  resposta: string;
}
