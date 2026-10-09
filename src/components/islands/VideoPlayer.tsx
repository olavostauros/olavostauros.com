import { useState } from "react";

type Props = {
  youtubeId: string | null;
  poster: string | null;
  title: string;
};

// Shows a local poster and loads the YouTube embed only after a tap, so the
// page makes no request to YouTube until the visitor asks for the video.
export default function VideoPlayer({ youtubeId, poster, title }: Props) {
  const [playing, setPlaying] = useState(false);

  if (!youtubeId) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-surface text-center">
        <PlayIcon className="size-10 text-muted" />
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted">Vídeo em breve</p>
      </div>
    );
  }

  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1&cc_load_policy=1&hl=pt-BR`;

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-ink">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={embedUrl}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex size-full items-center justify-center"
            aria-label={`Assistir: ${title}`}
          >
            {poster && (
              <img
                src={poster}
                alt=""
                className="absolute inset-0 size-full object-cover"
                loading="eager"
                decoding="async"
              />
            )}
            <span className="relative flex size-16 items-center justify-center rounded-full bg-accent text-accent-ink shadow-lg transition-transform group-hover:scale-105 sm:size-20">
              <PlayIcon className="ml-1 size-7 sm:size-8" />
            </span>
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-muted">
        Não abriu?{" "}
        <a href={watchUrl} target="_blank" rel="noopener" className="text-accent underline underline-offset-4">
          Assistir no YouTube ↗
        </a>
      </p>
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.2-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}
