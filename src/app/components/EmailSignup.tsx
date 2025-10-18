// src/app/components/EmailSignup.tsx
import clsx from "clsx";

type Props = {
  heading?: string;
  subtext?: string;
  /** "card" (default) gives a bordered panel; "inline" is compact/no panel */
  variant?: "card" | "inline";
  className?: string;
};

const ACTION_URL =
  "https://signalstructure.us8.list-manage.com/subscribe/post?u=e5af9cae1b9c928b6e445ad8d&id=735c685812&f_id=004a60e1f0";

export default function EmailSignup({
  heading = "Get new episodes in your inbox",
  subtext = "No spam. Just the latest drops, bonus content, and occasional metal lore.",
  variant = "card",
  className,
}: Props) {
  const Container = ({ children }: { children: React.ReactNode }) => (
    <section
      className={clsx(
        variant === "card"
          ? "rounded-2xl border border-white/10 bg-zinc-900/40 p-5 md:p-6"
          : "",
        className
      )}
    >
      {children}
    </section>
  );

  return (
    <Container>
      <div
        className={clsx(
          "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
          variant === "inline" && "gap-2 md:gap-3"
        )}
      >
        <div className="max-w-xl">
          <h3 className="text-base md:text-lg font-semibold text-white">
            {heading}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">{subtext}</p>
        </div>

        <form
          action={ACTION_URL}
          method="post"
          target="_blank"
          noValidate
          className={clsx(
            "mt-2 grid w-full gap-2 md:mt-0 md:w-auto md:grid-cols-[minmax(0,320px)_auto]"
          )}
        >
          {/* EMAIL */}
          <label className="sr-only" htmlFor="mce-EMAIL">
            Email address
          </label>
          <input
            type="email"
            name="EMAIL"
            id="mce-EMAIL"
            required
            placeholder="you@metalmail.com"
            className="h-10 rounded-lg border border-white/10 bg-black/40 px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />

          <button
            type="submit"
            name="subscribe"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-500 transition"
          >
            Subscribe
          </button>

          {/* honeypot (anti-bot) – Mailchimp requires this exact structure */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
            <input
              type="text"
              name="b_e5af9cae1b9c928b6e445ad8d_735c685812"
              tabIndex={-1}
              defaultValue=""
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
