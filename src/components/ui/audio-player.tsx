import { formatDuration } from "@/lib/format-duration";
import { useState } from "react";
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
  onProgressChange,
}: {
  track: Track | undefined;
  isPlaying: boolean;
  onPlay: () => void;
  isRepeat: boolean;
  onRepeat: () => void;
  isShuffle: boolean;
  duration: number;
  progress: number;
  onProgressChange: (progress: number) => void;
  onShuffle: () => void;
  onPause: () => void;
  onSkip: (dir: -1 | 1) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);

  function interactionStart() {
    setIsDragging(true);
    setDragValue(progress);
  }

  function interactionEnd() {
    setIsDragging(false);
    onProgressChange(dragValue);
  }

  return (
    <aside
      className={`fixed z-10 inset-x-0 bottom-0 flex items-start justify-center gap-6 p-4 bg-zinc-800 transition-transform translate-y-full ${!!track && "!translate-y-0"}`}
    >
      <div className="max-h-32 aspect-square rounded-lg overflow-hidden">
        {track?.cover && (
          <img
            className="object-contain size-full pointer-events-none select-none"
            src={track.cover}
            alt={track.title}
          />
        )}
      </div>
      <div className="space-y-1">
        <span className="font-medium text-white select-none">
          {track?.title}
        </span>
        <div className="space-y-0.5">
          <input
            type="range"
            name="progress"
            id="progress"
            min={0}
            max={duration}
            value={isDragging ? dragValue : progress}
            onChange={(e) => setDragValue(+e.target.value)}
            onMouseDown={interactionStart}
            onMouseUp={interactionEnd}
            onTouchStart={interactionStart}
            onTouchEnd={interactionEnd}
            style={
              {
                "--progress": (progress / duration) * 100 + "%",
              } as React.CSSProperties
            }
          />
          <div className="flex justify-between text-white text-xs">
            <span>{formatDuration(progress)}</span>
            <span>{formatDuration(duration)}</span>
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
