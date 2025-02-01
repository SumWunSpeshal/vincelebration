import type { Track } from "./audio-view";

export function TrackList({
  tracks,
  onSelect,
}: {
  tracks: Track[] | ReadonlyArray<Track>;
  onSelect: (id: string) => void;
}) {
  return (
    <ul>
      {tracks.map(({ title, id }) => (
        <li key={title}>
          <button type="button" onClick={() => onSelect(id)}>
            {title}
          </button>
        </li>
      ))}
    </ul>
  );
}
