import type { Track } from "./audio-view";

export function TrackList({
  tracks,
  onSelect,
  current,
}: {
  tracks: Track[] | ReadonlyArray<Track>;
  onSelect: (id: string) => void;
  current: Track | undefined;
}) {
  const grouped = Object.entries(Object.groupBy(tracks, (el) => el.album));

  return (
    <ul className="space-y-14">
      {grouped.map(([album, tracks]) => {
        return (
          <li className="space-y-6">
            <h2 className="text-3xl uppercase text-gray-700">{album}</h2>
            {tracks?.[0]?.cover && (
              <div className="max-w-80 max-h-80">
                <img
                  src={tracks![0]?.cover}
                  alt={album + " Cover"}
                  className="size-full object-contain"
                />
              </div>
            )}
            <ul className="space-y-1">
              {tracks?.map(({ title, id }, i) => (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => onSelect(id)}
                    className={`text-lg flex hover:bg-green-50 rounded-sm px-2 py-2 w-full transition-colors ${current?.id === id && "!bg-green-200"}`}
                  >
                    <div className="w-12 font-mono text-green-800 font-medium">
                      {current?.id === id ? "▶" : `${i + 1}`.padStart(2, "0")}
                    </div>
                    <span className="text-gray-700">{title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
