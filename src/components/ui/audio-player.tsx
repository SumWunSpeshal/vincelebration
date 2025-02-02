import { formatDuration } from "@/lib/format-duration";
import type { Track } from "./audio-view";

export function AudioPlayer({
  track,
  isPlaying,
  isRepeat,
  isShuffle,
  duration,
  progress,
  onPlay,
  onPause,
  onSkip,
  onRepeat,
  onShuffle,
}: {
  track: Track | undefined;
  isPlaying: boolean;
  onPlay: () => void;
  isRepeat: boolean;
  onRepeat: () => void;
  isShuffle: boolean;
  duration: number | undefined;
  progress: number;
  onShuffle: () => void;
  onPause: () => void;
  onSkip: (dir: -1 | 1) => void;
}) {
  return (
    <aside
      className={`fixed inset-x-0 bottom-0 flex gap-6 p-4 bg-zinc-800 transition-transform translate-y-full ${!!track && "!translate-y-0"}`}
    >
      <div className="size-28 rounded-lg overflow-hidden">
        {track?.cover && (
          <img
            className="object-contain size-full pointer-events-none select-none"
            src={track.cover}
            alt={track.title}
          />
        )}
      </div>
      <div className="space-y-2">
        <span className="font-medium font-mono text-white select-none">
          {track?.title}
        </span>
        <div className="space-y-0.5">
          <div className="h-1 bg-red-50"></div>
          <div className="flex justify-between text-white text-xs">
            <span>{formatDuration(progress)}</span>
            <span>{formatDuration(duration ?? 0)}</span>
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <button type="button" onClick={() => onRepeat()} className="relative">
            <span className="sr-only">Repeat</span>
            <img src="repeat.svg" alt="Repeat" />
            <div
              className={`size-1 bg-white rounded-full absolute top-full left-1/2 -translate-x-1/2 ${isRepeat ? "block" : "hidden"}`}
            ></div>
          </button>
          <div className="flex gap-4 items-center">
            <button type="button" onClick={() => onSkip(-1)}>
              <span className="sr-only">Backward</span>
              <img src="forward.svg" alt="Backward" className="rotate-180" />
            </button>
            {isPlaying ? (
              <button type="button" onClick={() => onPause()}>
                <span className="sr-only">Pause</span>
                <img src="pause.svg" alt="Pause" />
              </button>
            ) : (
              <button type="button" onClick={() => onPlay()}>
                <span className="sr-only">Play</span>
                <img src="play-music.svg" alt="Play" />
              </button>
            )}
            <button type="button" onClick={() => onSkip(1)}>
              <span className="sr-only">Backward</span>
              <img src="forward.svg" alt="Backward" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => onShuffle()}
            className="relative"
          >
            <span className="sr-only">Shuffle</span>
            <img src="shuffle.svg" alt="Shuffle" />
            <div
              className={`size-1 bg-white rounded-full absolute top-full left-1/2 -translate-x-1/2 ${isShuffle ? "block" : "hidden"}`}
            ></div>
          </button>
        </div>
      </div>
    </aside>
  );
}
