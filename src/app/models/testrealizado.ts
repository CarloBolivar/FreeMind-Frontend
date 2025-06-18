import { Usuario } from '../models/usuario'
import { Test } from '../models/test'

export class Testrealizado{
    idTestRealizado:number=0
    fecha:Date=new Date()
    resultado:string=''
    idUsuario:Usuario=new Usuario()
    idTest:Test=new Test()
}