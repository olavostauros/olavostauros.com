import { useEffect, useState } from "react";

type Props = {
  href: string;
  label: string;
  afterId: string; // the bar appears once this element has scrolled past
  hideId: string; // and hides while this element (the real CTA) is visible
};

// A compact WhatsApp bar pinned to the bottom of the screen on phones.
export default function ContactCTA({ href, label, afterId, hideId }: Props) {
  const [past, setPast] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const after = document.getElementById(afterId);
    const hide = document.getElementById(hideId);
    if (!after || !hide) return;

    const afterObs = new IntersectionObserver(([e]) => {
      setPast(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    const hideObs = new IntersectionObserver(([e]) => setCtaVisible(e.isIntersecting));
    afterObs.observe(after);
    hideObs.observe(hide);
    return () => {
      afterObs.disconnect();
      hideObs.disconnect();
    };
  }, [afterId, hideId]);

  const show = past && !ctaVisible;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-10 border-t border-line bg-bg/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={href}
        tabIndex={show ? 0 : -1}
        target="_blank"
        rel="noopener"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-accent-ink"
      >
        {label}
      </a>
    </div>
  );
}
