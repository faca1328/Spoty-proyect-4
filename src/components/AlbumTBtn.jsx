import { usePlayerStore } from "../store/playerStore";

export const AlbumTBtn = ({ id, songId }) => {
    const { isPlaying, currentAlbum, setIsPlaying, setCurrentAlbum } = usePlayerStore(state => state);
    const isPlaylistPlaying = isPlaying && currentAlbum?.playlist.id === id;
    const isCurrentSong = isPlaying && currentAlbum?.song.id === songId;


    const handleClick = () => {
        if (isPlaylistPlaying || isCurrentSong) {
            setIsPlaying(false);
            return;
        }
        fetch(`/api/api.json?id=${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const { songs, playlist } = data;
                const selectedSong = songs.find(song => song.id === songId);
                if (selectedSong) {
                    setIsPlaying(true);
                    setCurrentAlbum({ songs, playlist, song: selectedSong })
                    return
                }
            })

    };

    return (
        <button className="rounded-full p-1 bg-green-600" onClick={handleClick}>
            {!isPlaylistPlaying ? (
                <svg role="img" height="25" width="25" aria-hidden="true" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path>
                </svg>
            ) : (
                <svg height="25" version="1.1" viewBox="0 0 36 36" width="25">
                    <path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" id="ytp-id-5076"></path>
                </svg>
            )}
        </button>
    );
};
