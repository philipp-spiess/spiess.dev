import React from "react";

interface NewsletterFormProps {
  className?: string;
  title?: string;
  description?: string;
}

export default function NewsletterForm({
  className = "",
  title = "Subscribe to my newsletter",
  description = "Get updates on what's on my mind. No spam, pinky promise.",
}: NewsletterFormProps) {
  return (
    <div className={className}>
      <h3 className="font-black text-lg mb-2">{title}</h3>
      <p className="mb-4 text-(--muted-color)">{description}</p>

      <form
        action="https://buttondown.com/api/emails/embed-subscribe/spiess"
        method="post"
        target="popupwindow"
        className="space-y-3"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            defaultValue={""}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 border border-[color-mix(in_oklch,rgb(var(--fg-color))_20%,transparent)] rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-(--accent-color) focus:border-transparent disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          className="w-full px-3 py-2 font-semibold text-(--bg-color) bg-(--accent-color) rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--accent-color) focus:ring-offset-2 focus:ring-offset-(--bg-color) disabled:opacity-50 transition-opacity"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
