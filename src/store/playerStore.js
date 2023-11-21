import {create} from "zustand"


//usamos Zustand para crear un estado global sin necesidad de un provider
export const usePlayerStore = create((set)=>({
    isPlaying: false,
    currentAlbum: {playlists: null, song: null, songs: []},
    setIsPlaying: (isPlaying)=>set({isPlaying}),
    setCurrentAlbum: (currentAlbum)=>set({currentAlbum})
})) 