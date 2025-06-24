import { PreguntaTest } from './preguntatest'
import { Usuario } from './usuario'

export class RespuestaTest {
  idRespuesta: number = 0
  respuesta: string = ''
  preguntaTest: PreguntaTest = new PreguntaTest()
  usuario: Usuario = new Usuario()
}
