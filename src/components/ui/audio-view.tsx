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
  const [currentId, setCurrentId] = useState<string | null>(null);
  const current = tracks.find((el) => el.id === currentId);

  const audioRef = useRef<HTMLAudioElement>(null);

  function skip(dir: 1 | -1, repeat: boolean) {
    const index = current ? tracks.indexOf(current) : 0;

    if (repeat && !tracks.at(index + dir)) {
      setCurrentId(tracks.at(0)!.id);
      return;
    }

    setCurrentId(tracks.at(index + dir)!.id);
  }

  return (
    <div>
      <TrackList tracks={tracks} onSelect={(id) => setCurrentId(id)} />
      {current && (
        <audio
          controls
          controlsList="nodownload"
          key={currentId}
          autoPlay={!!currentId}
          ref={audioRef}
        >
          <source src={current.track} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      )}
      <AudioPlayer track={current} />
    </div>
  );
}
