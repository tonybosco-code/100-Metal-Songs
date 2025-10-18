// src/app/components/SignupCta.tsx
import Icon from "./Icon";

export default function SignupCta() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/60 px-3 py-1 text-xs text-white/80">
          <Icon name="mail" size={14} /> Get new episodes
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-white">Be first to know</h3>
        <p className="mt-2 text-sm text-white/70">
          Placeholder only — we’ll wire your email provider (Mailchimp, etc.) after launch.
        </p>
        <div className="mt-4 flex gap-3">
          <input
            disabled
            placeholder="you@metalmail.com"
            className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 ring-1 ring-white/10"
          />
          <button
            disabled
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white opacity-70 cursor-not-allowed"
          >
            Notify me
          </button>
        </div>
      </div>
    </div>
  );
}
