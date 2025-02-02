import { useRef, useState } from "react";
import { AudioPlayer } from "./audio-player";
import { TrackList } from "./track-list";

export type Track = {
  id: string;
  cover: string;
  track: string;
  title: string;
};

export function AudioView({
  tracks,
}: {
  tracks: Track[] | ReadonlyArray<Track>;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const current = tracks.find((el) => el.id === currentId);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  function getRandomTrack() {
    return tracks.at(Math.floor(Math.random() * tracks.length));
  }

  function skip(dir: 1 | -1) {
    const index = current ? tracks.indexOf(current) : 0;

    if (isShuffle) {
      let random = getRandomTrack();

      while (random === current) {
        random = getRandomTrack();
      }

      return setCurrentId(random!.id);
    }

    if (isRepeat && !tracks.at(index + dir)) {
      return setCurrentId(tracks.at(0)!.id);
    }

    setCurrentId(tracks.at(index + dir)!.id);
  }

  return (
    <div>
      {current && (
        <audio
          controls
          controlsList="nodownload"
          key={current.id}
          autoPlay={!!current.id}
          ref={audioRef}
          onDurationChange={() =>
            audioRef.current && setDuration(audioRef.current.duration)
          }
          onEnded={() => skip(1)}
          onTimeUpdate={() =>
            audioRef.current && setProgress(audioRef.current.currentTime)
          }
          className="hidden"
        >
          <source src={current.track} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      )}
      <TrackList
        tracks={tracks}
        onSelect={(id) => {
          setIsPlaying(true);
          setCurrentId(id);
        }}
      />
      <AudioPlayer
        isPlaying={isPlaying}
        isRepeat={isRepeat}
        onRepeat={() => setIsRepeat((prev) => !prev)}
        isShuffle={isShuffle}
        onShuffle={() => setIsShuffle((prev) => !prev)}
        track={current}
        duration={duration}
        progress={progress}
        onProgressChange={(v) =>
          audioRef.current && (audioRef.current.currentTime = v)
        }
        onPause={() => {
          audioRef.current?.pause();
          setIsPlaying(false);
        }}
        onPlay={() => {
          audioRef.current?.play();
          setIsPlaying(true);
        }}
        onSkip={(dir) => skip(dir)}
      />
    </div>
  );
}
