import { formatDuration } from "@/lib/format-duration";
import type React from "react";
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
    <ul className="space-y-20">
      {grouped.map(([album, tracks]) => {
        return (
          <li key={album}>
            <div className="mb-12 flex flex-col gap-6 md:gap-10 md:flex-row-reverse md:items-end">
              <div className="md:grow grid gap-4">
                <div className="grid gap-0.5">
                  <span className="uppercase text-gray-600">
                    {tracks![0]?.artist}
                  </span>
                  <small className="text-teal-800">
                    {tracks![0]?.release} ⸱ {tracks!.length} morceaux ⸱{" "}
                    {Math.ceil(
                      tracks!.reduce((acc, curr) => acc + curr.duration, 0) / 60
                    )}{" "}
                    min
                  </small>
                </div>

                <h2 className="text-5xl text-gray-700 font-medium">{album}</h2>
              </div>

              {tracks?.[0]?.cover && (
                <div className="max-w-80 max-h-80">
                  <img
                    src={tracks![0]?.cover}
                    alt={album + " Cover"}
                    className="size-full object-contain rounded-md shadow-lg max-md:!transform-none"
                    style={
                      {
                        "-webkit-box-reflect":
                          "below .5rem linear-gradient(to bottom, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.1))",
                        transform: "perspective(600px) rotateY(10deg)",
                      } as React.CSSProperties
                    }
                  />
                </div>
              )}
            </div>

            <ul className="space-y-1">
              {tracks?.map(({ title, id, duration }, i) => (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => onSelect(id)}
                    className={`text-lg flex items-center hover:bg-teal-100 rounded-sm px-4 py-2 w-full transition-colors ${current?.id === id && "!bg-teal-600 relative"}`}
                  >
                    <div
                      className={`w-8 text-left font-mono text-teal-800 font-medium transition-colors ${current?.id === id && "!text-white"}`}
                    >
                      {current?.id === id ? "▶" : `${i + 1}`.padStart(2, "0")}
                    </div>
                    <span
                      className={`text-gray-800 transition-colors ${current?.id === id && "!text-white"}`}
                    >
                      {title}
                    </span>
                    <span
                      className={`text-sm text-teal-800 font-medium ml-auto transition-colors ${current?.id === id && "!text-white"}`}
                    >
                      {formatDuration(duration)}
                    </span>
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
