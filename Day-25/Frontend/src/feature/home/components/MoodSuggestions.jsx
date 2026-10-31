import { useEffect, useState } from "react";
import "../styles/mood-suggestions.scss";

function MoodSuggestions({ mood, songs, loading, error, onSelect }) {
    const [visibleCount, setVisibleCount] = useState(() =>
        window.matchMedia("(min-width: 601px) and (max-width: 900px)").matches ? 4 : 6
    );
    const [isMobile, setIsMobile] = useState(() =>
        window.matchMedia("(max-width: 600px)").matches
    );
    const [expandedMood, setExpandedMood] = useState(null);
    const expanded = expandedMood === mood;

    useEffect(() => {
        const mobileQuery = window.matchMedia("(max-width: 600px)");
        const tabletQuery = window.matchMedia("(min-width: 601px) and (max-width: 900px)");

        function updateLayout() {
            setIsMobile(mobileQuery.matches);
            setVisibleCount(tabletQuery.matches ? 4 : 6);
            setExpandedMood(null);
        }

        mobileQuery.addEventListener("change", updateLayout);
        tabletQuery.addEventListener("change", updateLayout);

        return () => {
            mobileQuery.removeEventListener("change", updateLayout);
            tabletQuery.removeEventListener("change", updateLayout);
        };
    }, []);

    const displayedSongs = isMobile || expanded ? songs : songs.slice(0, visibleCount);

    return (
        <section className="mood-suggestions" aria-labelledby="suggestions-heading">
            <div className="suggestions-header">
                <div>
                    <p className="suggestions-eyebrow">MADE FOR THIS MOMENT</p>
                    <h2 id="suggestions-heading">
                        {mood ? `Picked for your ${mood} mood` : "Suggested for your mood"}
                    </h2>
                </div>
                {songs.length > 0 && (
                    <span className="suggestion-count">
                        {songs.length} {songs.length === 1 ? "track" : "tracks"}
                    </span>
                )}
            </div>

            {loading ? (
                <p className="suggestions-message" role="status">Finding songs for your mood…</p>
            ) : error ? (
                <p className="suggestions-message suggestions-error" role="alert">{error}</p>
            ) : songs.length > 0 ? (
                <div className="suggestion-grid">
                    {displayedSongs.map((song, index) => {
                        const title = song.title?.replaceAll("_", " ") || "Untitled track";
                        return (
                            <button
                                className="suggestion-card"
                                key={song._id || `${title}-${index}`}
                                type="button"
                                onClick={() => onSelect(song)}
                                aria-label={`Select ${title} by ${song.artist || "Unknown artist"}`}
                            >
                                {song.posterUrl ? (
                                    <img src={song.posterUrl} alt="" loading="lazy" />
                                ) : (
                                    <span className="suggestion-art-placeholder" aria-hidden="true">♫</span>
                                )}
                                <span className="suggestion-card-title">{title}</span>
                                <span className="suggestion-card-artist">{song.artist || "Unknown artist"}</span>
                                <span className="suggestion-card-action" aria-hidden="true">▶</span>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <p className="suggestions-message">
                    {mood
                        ? `No songs found for ${mood} yet. Try detecting your mood again later.`
                        : "Detect your mood to find songs picked just for you."}
                </p>
            )}
            {!loading && !error && !isMobile && songs.length > visibleCount && (
                <button
                    className="suggestions-toggle"
                    type="button"
                    onClick={() => setExpandedMood(expanded ? null : mood)}
                    aria-expanded={expanded}
                >
                    {expanded ? "Show less" : "Show more"}
                    <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
                </button>
            )}
        </section>
    );
}

export default MoodSuggestions;
