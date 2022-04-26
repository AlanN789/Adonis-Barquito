import { DateTime } from 'luxon'
import mongoose from 'mongoose'
import {Schema,model} from 'mongoose'
export default class PartidoModelo {

  static partidaSchema=new Schema({
    clave_sala:Number,
    jugadores:[{
      id_jugador:Number,
      monitor:Number
    }],
    posicion:Number,
    main:Number
  },{
    versionKey:false
  });
  static PartidaModelo:any=model('partidas',this.partidaSchema)
}
