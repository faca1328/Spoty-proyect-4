import { useEffect, useRef, useState } from "react"
import { usePlayerStore } from "../../store/playerStore"




const CurrentSong = ({ image, title, artists }) => {
    return (
        <div className="flex items-center gap-4 relative overflow-hidden m-2 transition-all duration-1000">
            <picture className="w-16 h-16 bg-gray-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} />
            </picture>

            <div className="flex flex-col">
                <h3 className="font-semibold text-sm block text-gray-300">
                    {title}
                </h3>
                <span className="text-xs opacity-80 text-gray-400">
                    {artists?.join(', ')}
                </span>
            </div>

        </div>
    )
}

const Controls = ({ audio }) => {
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        audio.current.addEventListener('timeupdate', handleTimeUpdate)
        return () => {
            audio.current.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime)
    }


    const formatTime = time => {
        if (time == null) return `0:00`

        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)

        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const duration = audio?.current?.duration ?? 0


    return (
        <div className="flex gap-x-3 text-xs pt-2 items-center text-white">
            <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>

            <input
                type="range"
                value={[currentTime]}
                min={0}
                max={[duration]}
                step={0.01}
                onChange={(event) => {
                    const newCurrentTime = parseFloat(event.target.value);
                    setCurrentTime(newCurrentTime);
                    audio.current.currentTime = newCurrentTime;
                  }}
                className="slider appearance-none w-64 h-2 rounded-full slider-thumb slider-bg"
            />

            <span className="opacity-50 w-12">
                {duration ? formatTime(duration) : '0:00'}
            </span>
        </div>
    )
}



export const Player = () => {
    const PlayIcon = <svg role="img" height="20" width="20" aria-hidden="true" viewBox="0 0 24 24"
    ><path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path></svg>
    const PauseIcon = <svg height="20" version="1.1" viewBox="0 0 36 36" width="20"><path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" id="ytp-id-5076"></path></svg>


    const { isPlaying, currentAlbum, setIsPlaying, setCurrentAlbum } = usePlayerStore(state => state);
    const audioRef = useRef();


    useEffect(() => {
        isPlaying ?
            audioRef.current.play() :
            audioRef.current.pause()
    }, [isPlaying])


    useEffect(() => {
        const { song, playlist, songs } = currentAlbum;
        if (song) {
            const src = `src/data/music/${playlist?.id}/0${song.id}.mp3`;
            audioRef.current.src = src;
            audioRef.current.play();
        }
    }, [currentAlbum])



    const handleClick = () => {
        setIsPlaying(!isPlaying)


    }

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        audioRef.current.volume = newVolume;
    };

    return (
        <div className="flex flex-row justify-between w-full items-center">
            <div className="w-[200px]">
                <CurrentSong {...currentAlbum.song} />
            </div>
            <div className="grid place-content-center flex-1">
                <div className="flex justify-center flex-col items-center">
                    <button className="bg-white rounded-full p-1 my-2 disabled:opacity-50"
                        onClick={handleClick}
                        disabled={!currentAlbum.song}
                        >
                        {!isPlaying ? PlayIcon : PauseIcon}
                    </button>
                    <Controls audio={audioRef}/>
                </div>
                
            </div>
            <div className="mr-2 gap-2 text-xl text-white items-center flex">
                <div>-</div>
                <input
                    type="range"

                    min={0}
                    max={1}
                    step={0.01}
                    defaultValue={[audioRef.current ? audioRef.current.volume : 50]}
                    onChange={handleVolumeChange}
                    className="slider appearance-none w-40 h-2 rounded-full slider-thumb slider-bg"
                />
                <div>+</div>
            </div>
            <audio ref={audioRef} />
        </div>
    )
}
