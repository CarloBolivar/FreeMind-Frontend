import { Terapia } from "./terapia";

export class Recurso {
  idRecurso: number = 0
  tipo: string = ''
  url: string = ''
  terapia: Terapia= new Terapia()
}