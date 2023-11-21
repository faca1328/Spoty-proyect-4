import { allPlaylists, songs as allSongs } from "../../data/data";


//Hacemos que el servidor nos pase las canciones cuando se solicita y no que todas las canciones esten cargadas en el cliente de forma estatica
export async function GET({ params, request }) {
    // get the id from the url search params
    const { url } = request
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id')
  
    const playlist = allPlaylists.find((playlist) => playlist.id === id)
    const songs = allSongs.filter(song => song.albumId === playlist?.albumId)
  
    return new Response(JSON.stringify({ playlist, songs }), {
      headers: { "content-type": "application/json" },
    })
  }