import { getSong } from "../service/song.api";
import { useContext, useState } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext)

    const { loading, setLoading, song, setSong } = context
    const [error, setError] = useState("")

    async function handleGetSong({ mood }) {
        setLoading(true)
        setError("")

        try {
            const data = await getSong({ mood })
            const songs = data.songs || []

            if (songs.length > 0) setSong(songs[0])
            return songs
        } catch {
            setError("Could not load songs for this mood. Please try again.")
            return null
        } finally {
            setLoading(false)
        }
    }

    return ({ loading, song, setSong, error, handleGetSong })
}