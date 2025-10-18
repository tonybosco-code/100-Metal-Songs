export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 py-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-white">Contact</h1>
      <p className="mt-3 text-zinc-300">
        Drop us a line and we’ll route it to the right place.
      </p>

      {/* Replace the action with your form service or an internal API route */}
      <form
        action="https://formspree.io/f/your-id"
        method="POST"
        className="mt-6 space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Your email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-md bg-zinc-900/60 px-3 py-2 text-zinc-100 ring-1 ring-white/10 focus:outline-none focus:ring-white/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-400">Message</label>
          <textarea
            name="message"
            required
            rows={6}
            placeholder="How can we help?"
            className="w-full rounded-md bg-zinc-900/60 px-3 py-2 text-zinc-100 ring-1 ring-white/10 focus:outline-none focus:ring-white/20"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-white/10 px-4 py-2 text-zinc-100 ring-1 ring-white/15 hover:bg-white/15"
        >
          Send
        </button>
      </form>

      <p className="mt-6 text-xs text-zinc-500">
        Prefer email? Use the form and we’ll reply from our show inbox.
      </p>
    </main>
  );
}
