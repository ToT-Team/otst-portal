"use client";

export default function Footer() {
  return (
    <footer className="relative bg-cyber-bg-darker border-t border-white/5 py-12 px-6 md:px-12 overflow-hidden">
      {/* Grid background snippet */}
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left Side: Brand and Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono font-extrabold text-xl tracking-widest text-white uppercase text-glow-mint">
              OTST
            </span>
            <span className="text-[9px] font-mono text-neon-mint px-1.5 py-0.5 rounded border border-neon-mint/30 bg-neon-mint/5">
              V5
            </span>
          </div>
          <p className="text-gray-500 font-mono text-xs max-w-sm" suppressHydrationWarning>
            {new Date().getFullYear()} by Taiwanese osu! Tournaments Team.<br />
            We still can't get a 1k pp.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          {/* Twitter (X) */}
          <a
            href="https://x.com/otst_event/"
            target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all cursor-pointer"
            aria-label="X (Twitter)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Twitch */}
          <a
            href="https://www.twitch.tv/otstlive/"
            target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-400/40 hover:shadow-[0_0_10px_rgba(192,132,252,0.2)] transition-all cursor-pointer"
            aria-label="Twitch"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@taiwanosu1968/"
            target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/40 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] transition-all cursor-pointer"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/owctw/"
            target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/40 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all cursor-pointer"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>

          {/* Discord */}
          <a
            href="https://discord.com/invite/SYMBKt3"
            target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:border-indigo-400/40 hover:shadow-[0_0_10px_rgba(129,140,248,0.2)] transition-all cursor-pointer"
            aria-label="Discord"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
