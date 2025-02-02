import type { Track } from "./audio-view";

export function AudioPlayer({ track }: { track: Track | undefined }) {
  return (
    <aside
      className={`fixed inset-x-0 bottom-0 flex gap-6 h-24 p-4 bg-slate-800 transition-transform translate-y-full ${!!track && "!translate-y-0"}`}
    >
      <div className="size-20 rounded-lg overflow-hidden">
        {track?.cover && (
          <img
            className="object-contain size-full pointer-events-none select-none"
            src={track.cover}
            alt={track.title}
          />
        )}
      </div>
      <div>
        <span className="font-medium font-mono text-white">{track?.title}</span>
      </div>
    </aside>
  );
}
