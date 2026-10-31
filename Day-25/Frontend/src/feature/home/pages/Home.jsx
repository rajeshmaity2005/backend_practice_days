import { useState } from "react";
import Player from "../components/Player";
import MoodSuggestions from "../components/MoodSuggestions";
import FaceExpression from "../../Expression/components/FaceExpression";
import { useSong } from "../hooks/useSong";

const Home = () => {
    const { loading, error, handleGetSong, setSong } = useSong();
    const [mood, setMood] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    async function handleMoodDetected(detectedMood) {
        if (!detectedMood) return;

        const normalizedMood = detectedMood.toLowerCase();
        setMood(normalizedMood);
        const songs = await handleGetSong({ mood: normalizedMood });
        if (songs) setSuggestions(songs);
    }

    return (
        <>
            <Player />
            <section className="home-expression" aria-labelledby="expression-heading">
                <h2 id="expression-heading">Discover music for your mood</h2>
                <FaceExpression
                    onClick={handleMoodDetected}
                />
            </section>
                        <MoodSuggestions
                mood={mood}
                songs={suggestions}
                loading={loading}
                error={error}
                onSelect={setSong}
            />
        </>
    )
}

export default Home