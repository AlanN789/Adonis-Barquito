// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database"
import PartidoModelo from "App/Models/PartidoModelo"
import Partido from "App/Models/Partido"
import mongoose from "mongoose"
export default class MongosController
{
    public async guardarMongo({request,response})
    {
        await mongoose.connect('mongodb+srv://alannunez:celta3011@cluster0.4xeaf.mongodb.net/barco?retryWrites=true&w=majority')
        const clave_sala=request.input('Clave')
        const id_jugador=request.input('jugador')
        const monitor=request.input('monitor')
        const posicion=request.input('posicion')
        const main=request.input('main')
        console.log(clave_sala)
        const crear=new PartidoModelo.PartidaModelo({"clave_sala":clave_sala,"jugadores":[{id_jugador:id_jugador, monitor:monitor}],"main":main, "posicion":posicion})
        crear.save()
        return response.json(crear)
    }
    public async insertar({request,response})
    {
        try
        {
            const Partidos=new Partido()
            const local=request.input('local')
            const visitante=request.input('visitante')
            const Estadio=request.input('Estadio')
            Partidos.local=local
            Partidos.visitante=visitante
            Partidos.Estadio=Estadio
            await Partidos.save()
            return response.status(200)
        }
        catch
        {
            return response.status(500)
        }
    }

    public async modificarMonitor({request,response})
    {
        try
        {
          await mongoose.connect('mongodb+srv://alannunez:celta3011@cluster0.4xeaf.mongodb.net/barco?retryWrites=true&w=majority')
          const clave_sala=request.input('clave_sala')
          const monitor=request.input('monitor')
          const newmonitor=request.input('newmoni')
          response= await PartidoModelo.PartidaModelo.updateOne({clave_sala:clave_sala, "jugadores.monitor":monitor},{$set:{"jugadores.$.monitor":newmonitor}})
          return response
        }
        catch
        {
            return  response.badRequest('Hubo un error')
        }
    }
    public async modificarPos({request,response})
    {
        try
        {
          await mongoose.connect('mongodb+srv://alannunez:celta3011@cluster0.4xeaf.mongodb.net/barco?retryWrites=true&w=majority')
          const clave_sala=request.input('clave_sala')
          const posicion=request.input('posicion')
          const monitor=request.input('main')
          console.log(clave_sala)
          response= await PartidoModelo.PartidaModelo.updateOne({clave_sala:clave_sala},{$set:{"posicion":posicion, "main":monitor}})
          return response
        }
        catch
        {
            return  response.badRequest('Hubo un error')
        }
    }
    public async getPartida({params,response})
    {
        try
        {
          await mongoose.connect('mongodb+srv://alannunez:celta3011@cluster0.4xeaf.mongodb.net/barco?retryWrites=true&w=majority')
          console.log(params.id)
          response = await PartidoModelo.PartidaModelo.find({clave_sala:params.id})
          return response
        }
        catch
        {
            return  response.badRequest('Hubo un error')
        }
    }
    public async agregarJugador({request,response})
    {
        try
        {
          await mongoose.connect('mongodb+srv://alannunez:celta3011@cluster0.4xeaf.mongodb.net/barco?retryWrites=true&w=majority')
          const clave_sala=request.input('clave_sala')
          const monitor=request.input('monitor')
          const jugador= request.input('jugador')
          console.log(clave_sala)
          response= await PartidoModelo.PartidaModelo.updateOne({clave_sala:clave_sala},{$push:{"jugadores":{ id_jugador:jugador, monitor:monitor}}})
          return response
        }
        catch
        {
            return  response.badRequest('Hubo un error')
        }
    }
    public async verPartido()
    {
        const partido=Database.query()
        .select('p.id as id','local.Nombre_Equipo as Local','visitante.Nombre_Equipo as Visitante','estadio.Nombre_Estadio as Estadio')
        .from('partidos as p')
        .join('equipos as local','p.local','=','local.id')
        .join('equipos as visitante','p.visitante','=','visitante.id')
        .join('estadios as estadio','p.Estadio','=','estadio.id')
        return partido
    }
    public async verPartidas({response})
    {
      await mongoose.connect('mongodb+srv://alannunez:celta3011@cluster0.4xeaf.mongodb.net/barco?retryWrites=true&w=majority')
        response=await PartidoModelo.PartidaModelo.find()
        return response
    }
    public async delete({auth,response,params})
    {
        try
        {
            await auth.use('api').authenticate()
            const Equipos=await Partido.findOrFail(params.id)
            await Equipos.delete()

        }catch
        {
            return response.badRequest('ERROR')
        }
    }

}
