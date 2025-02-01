import { useState } from "react";
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

  return (
    <div>
      <TrackList tracks={tracks} onSelect={(id) => setCurrentId(id)} />
      {current && (
        <audio controls controlsList="nodownload" key={currentId} autoPlay>
          <source src={current.track} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  );
}
