import { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../song.context";
// import { useSong } from "../hooks/useSong";
import "../styles/player.scss";
import { useSong } from "../hooks/useSong";
import logo from "../../../assets/logo-colored.png"


const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function Player() {
    const { song } = useSong();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [playbackError, setPlaybackError] = useState("");

    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setPlaybackError("");
    }, [song?.url]);

    async function togglePlayback() {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            try {
                await audio.play();
                setPlaybackError("");
            } catch {
                setPlaybackError("This track could not be played. Please try again.");
            }
        } else {
            audio.pause();
        }
    }

    function skip(seconds) {
        const audio = audioRef.current;
        if (!audio) return;

        const nextTime = Math.max(0, Math.min(audio.currentTime + seconds, audio.duration || Infinity));
        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
    }

    function changePlaybackRate(event) {
        const rate = Number(event.target.value);
        setPlaybackRate(rate);
        if (audioRef.current) audioRef.current.playbackRate = rate;
    }

    const title = song?.title?.replaceAll("_", " ") || "Unknown track";
    const lyrics = song?.lyrics?.trim();
    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <main className="player-page">
            <header className="player-header">
                <a className="player-brand" href="/" aria-label="Moodify home">
                    <img src={logo} alt="Moodify" className='logo' />
                    <span>moodify</span>
                </a>
                <span className="player-header-note">A soundtrack for your mood</span>
            </header>

            <section className="player-layout" aria-label="Music player">
                <div className="now-playing-card">
                    <div className="now-playing-label">
                        <span className="playing-indicator" aria-hidden="true" />
                        NOW PLAYING
                    </div>
                    {song?.posterUrl ? (
                        <img className="album-art" src={song.posterUrl} alt={`${title} album artwork`} />
                    ) : (
                        <div className="album-art album-art-placeholder" aria-hidden="true">♫</div>
                    )}

                    <div className="track-info">
                        <div>
                            <h1>{title}</h1>
                            <p>{song?.artist || "Unknown artist"}</p>
                        </div>
                        {song?.mood && <span className="mood-tag">{song.mood}</span>}
                    </div>

                    <audio
                        ref={audioRef}
                        src={song?.url || undefined}
                        preload="metadata"
                        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                        onError={() => setPlaybackError("Unable to load this track. Check your connection and try again.")}
                    />

                    <div className="playback-progress">
                        <input
                            aria-label="Seek through track"
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={Math.min(currentTime, duration || 0)}
                            style={{ "--progress": `${progress}%` }}
                            onChange={(event) => {
                                const nextTime = Number(event.target.value);
                                if (audioRef.current) audioRef.current.currentTime = nextTime;
                                setCurrentTime(nextTime);
                            }}
                        />
                        <div className="time-labels">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="player-controls">
                        <button className="skip-button" type="button" onClick={() => skip(-5)} aria-label="Back 5 seconds">
                            <span aria-hidden="true">↶</span>
                            <small>5s</small>
                        </button>
                        <button
                            className="play-button"
                            type="button"
                            onClick={togglePlayback}
                            aria-label={isPlaying ? "Pause track" : "Play track"}
                            disabled={!song?.url}
                        >
                            <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
                        </button>
                        <button className="skip-button" type="button" onClick={() => skip(5)} aria-label="Forward 5 seconds">
                            <span aria-hidden="true">↻</span>
                            <small>5s</small>
                        </button>
                    </div>

                    <div className="player-options">
                        <label htmlFor="playback-speed">Playback speed</label>
                        <select id="playback-speed" value={playbackRate} onChange={changePlaybackRate}>
                            {playbackSpeeds.map((speed) => (
                                <option key={speed} value={speed}>{speed}×</option>
                            ))}
                        </select>
                    </div>
                    {playbackError && <p className="playback-error" role="alert">{playbackError}</p>}
                </div>

                <aside className="lyrics-card" aria-labelledby="lyrics-heading">
                    <div className="lyrics-heading">
                        <div>
                            <span className="section-eyebrow">SING ALONG</span>
                            <h2 id="lyrics-heading">Lyrics</h2>
                        </div>
                        <span className="lyrics-note" aria-hidden="true">♪</span>
                    </div>
                    {lyrics ? (
                        <div className="lyrics-content">
                            {lyrics.split(/\r?\n/).map((line, index) => (
                                <p className={line.trim() ? "" : "lyrics-spacer"} key={`${index}-${line}`}>
                                    {line || "\u00a0"}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p className="lyrics-empty">Lyrics aren’t available for this track yet.</p>
                    )}
                </aside>
            </section>

            <p className="player-footer">Find your feeling. Follow the sound.</p>
        </main>
    );
}

export default Player;
