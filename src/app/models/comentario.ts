import { Usuario } from "./usuario"

export class Comentario{
    idComentario:number=0
    comentario:string=''
    puntuacion:number=0
    fecha:Date=new Date()
    usuario:Usuario=new Usuario()
}