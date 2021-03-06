// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database"
import Equipo from "App/Models/Equipo"
import Jugadore from "App/Models/Jugadore"
export default class JugadoresController 
{
    public async store({auth,request,response})
    {
        const Jugadores=new Jugadore()
        const Nombre=request.input('Nombre_Jugador')
        const Edad=request.input('Edad_Jugador')
        const Nacionalidad=request.input('Nacionalidad_Jugador')
        const Equipo=request.input('Equipo')
        try
        {
            await auth.use('api').authenticate()
            Jugadores.Nombre_Jugador=Nombre
            Jugadores.Edad_Jugador=Edad
            Jugadores.Nacionalidad_Jugador=Nacionalidad
            Jugadores.Equipo=Equipo
            await Jugadores.save()
            return response.status(200)
        }catch
        {
            return response.badRequest('No tienes permisos')
        }
    }
    public async show({auth,response})
    {
        try
        {
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const Jugadores=await Jugadore.all()
            return Jugadores
        }catch
        {
            response.badRequest('No tienes permiso')
        }
    }
    public async update({auth,request,response})
    {
        const id=request.input('id')
        const Nombre=request.input('Nombre_Jugador')
        const Edad=request.input('Edad_Jugador')
        const Nacionalidad=request.input('Nacionalidad_Jugador')
        const Equipo=request.input('Equipo')
        try
        {
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const Jugadores=await Jugadore.findOrFail(id)
            Jugadores.Nombre_Jugador=Nombre
            Jugadores.Edad_Jugador=Edad
            Jugadores.Nacionalidad_Jugador=Nacionalidad
            Jugadores.Equipo=Equipo
            await Jugadores.save()
        }catch
        {
            return response.badRequest('ERROR')
        }
    }
    public async delete({auth,request,response})
    {
        const id=request.input('id')
        try
        {
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const JugadoresJ=await Jugadore.findOrFail(id)
            await JugadoresJ.delete()
        }catch
        {
            return response.badRequest('ERROR')
        }
    }
    public async JugadorEquipo({request,auth,response})
    {
        try
        {
            await auth.use('api').authenticate()
            const JuEq=Database.query()
            .from('equipos')
            .join('jugadores','equipos.id','=','jugadores.Equipo')
            .select('jugadores.Nombre_Jugador as Jugador')
            .select('jugadores.Edad_Jugador as Edad')
            .select('jugadores.Nacionalidad_Jugador as Nacionalidad')
            .select('equipos.Nombre_Equipo as Equipo')
            return JuEq
        }catch
        {
            return response.badRequest('Hubo un error')
        }
    }
    public async JugadoresEquipo({auth,request,response})
    {
        try
        {
            await auth.use('api').authenticate()
            const Nombre_Equipo=request.input('Nombre_Equipo')
            const JugEq=Database.query()
            .from('jugadores')
            .join('equipos','jugadores.Equipo','=','equipos.id')
            .select('jugadores.Nombre_Jugador as Jugador')
            .select('jugadores.Edad_Jugador as Edad')
            .select('jugadores.Nacionalidad_Jugador as Nacionalidad')
            .where('equipos.Nombre_Equipo','=',Nombre_Equipo)
            return JugEq
        }
        catch
        {
              const mensaje="Bla, bla, bla, bla, bla, bla Ey, yo, yo-yo, yo-yo, yo-yo Yo, (la-la-la-la-la-la-la) blow, blow (la-la-la-la-la-la-la) Diablo, qu?? safaera T?? tiene un culo cabr??n Cualquier cosa que te pongas rompes la carretera (la-la-la-la-la)Aight, mu??velo, mu??velo, mu??velo, mu??velo (la-la-la-la-la-la-la) Qu?? safaera (la-la-la-la-la) T?? tiene un culo cabr??n Cualquier cosa que te pongas rompes la carretera Aight, (tra) mu??velo, mu??velo, mu??velo, mu??velo Qu?? falta de respeto, mami ??C??mo te atreve a venir sin panty? Hoy saliste puesta pa m?? Yo que pensaba que ven??a a dormir, no Vino ready ya, puesta pa una cepill?? Me chupa la lollipop, solita se arrodilla, hey ??C??mo te atreve, mami, a venir sin panty? Mera, d??melo, DJ Orma??Qu?? t?? te cree? Jod??o cabr??nYo hago lo que me da la gana, d??celo conejo Ey, ey Hoy se bebe, hoy se gasta Hoy se fuma como un rasta Si Dios lo permite (si Dios lo permite), ey Si Dios lo permite (que si Dios lo permite), ey Hoy se bebe, hoy se gasta Hoy se fuma como un rasta (wuh, wuh, wuh) Si Dios lo permite, ey Si Dios lo permite (yo, yo), ey Real G, orientando a la generaciones nueva, con la verdadera Bellaqueo a lo galactic S??, pa que se te mojen los panty, m??tele bellaco a lo vers??til M??s puta que Betty Boop, la que se puso bellaca, mami, fuiste t?? Sigo matando con la U Chocha con bicho, bicho con nalga (empuja) Cho-chocha con bicho, bicho con nalga, s?? (empuja) Chocha con bicho, bicho con nalga (empuja) Te-te est?? rozando mi tetilla (empuja) Este a??o no quiero putilla (empuja) Te ven con mucha prenda y se quieren pegar (empuja) Te ven bien activao y se quieren pegar (empuja) Porque est??s bien buena, porque est??s bien buena (emp??jamelo completo) Tetas bien grande' como Lourdes Chac??n Las nalga bien grande como Iris Chac??n La chocha no s?? porque no la he visto Pero vamo pa la cama a clavarte en panty Pero vamo' pa' la cama a clavarte en panty Hoy se bebe, hoy se gasta Hoy se fuma como un rasta Si Dios lo permite Si Dios lo permite, yeh-yeah Hoy se bebe, hoy se gasta Hoy se fuma como un rasta Si Dios lo permite Si Dios lo permite Mami ??Qu?? t?? quiere'? Aqu?? lleg?? tu tibur??n Yo quiero perrearte y fumarme un blunt Ver lo que esconde ese pantal??n Yo quiero perrearte y perrearte y perrearte (duro, duro) Yo-yo-yo-yo quiero perrearte y fumarme un blunt (duro, duro) Yo quiero perrearte y perrearte y perrear (duro, duro) Yo-yo-yo-yo quiero perrearte y fumarme un blunt, -me un blunt (duro, duro) La rola ya me explot?? La nena bailando se bot?? Ese culo se merece to, se merece to, se merece to, yes Ese culo se merece to, se merece to, se merece to (ey, ey, ey, ey, ey) Ah, yo pensaba que se pon??a lenta T?? bien, t?? bien, vamo de nuevo, de nuevo Meren a Orma, meren a Orma que est?? bellaco Mi bicho anda fugao' y yo quiero que t?? me lo esconda' Ag??rralo como bonga Se meti?? una pepa que la pone cachonda Chinga en lo Audi, no en lo Honda Ey, si te lo meto no me llame' Que esto no es pa que me ame, ey Si tu novio no te mama el culo Pa eso que no mame"
            return mensaje
        }
    }
}
