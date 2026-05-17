"use client";

import { useState } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { site } from "@/lib/site";

const services = [
  "New roof",
  "Replacement",
  "Restoration",
  "Storm repair",
] as const;

export function Contact() {
  const [service, setService] = useState<(typeof services)[number]>(
    "Replacement",
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      address: String(data.get("address") ?? ""),
      message: String(data.get("message") ?? ""),
      service,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({ error: null }));
        throw new Error(msg ?? `Request failed (${res.status})`);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative bg-ink text-bone py-32 lg:py-44 border-t border-bone-faint/15"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 50% 0%, #C9A96E 0%, transparent 60%)",
        }}
      />

      <div className="container-edge relative">
        <p className="eyebrow mb-10 flex items-center gap-3">
          <span className="block w-8 h-px bg-champagne" />
          05 — Request a Survey
        </p>

        <h2 className="display text-bone text-[14vw] sm:text-[10vw] lg:text-[9.5rem] xl:text-[11rem] leading-[0.92] text-balance">
          <SplitText as="span" by="word" className="block">
            Start with the
          </SplitText>
          <SplitText
            as="span"
            by="word"
            delay={0.2}
            className="block italic"
          >
            survey.
          </SplitText>
        </h2>

        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            {!submitted ? (
              <form onSubmit={onSubmit} className="flex flex-col gap-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
                  <Field name="name" label="Full name" autoComplete="name" />
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
                  <Field name="phone" type="tel" label="Phone" autoComplete="tel" />
                  <Field name="address" label="Project address" />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
                    Project type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setService(opt)}
                        data-cursor="hover"
                        className={`px-4 py-2 text-[11px] uppercase tracking-[0.18em] border transition-colors duration-500 ${
                          service === opt
                            ? "border-champagne text-bone bg-champagne/10"
                            : "border-bone-faint/30 text-bone-dim hover:text-bone hover:border-bone-faint/60"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <Field
                  name="message"
                  label="Project notes"
                  multiline
                  placeholder="A few lines about the building, your architect, the material you're considering, and your ideal timeline."
                />

                <button
                  type="submit"
                  data-cursor="hover"
                  disabled={submitting}
                  className="group self-start mt-4 inline-flex items-center gap-5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-display text-3xl lg:text-4xl text-bone">
                    {submitting ? "Sending…" : "Schedule survey"}
                  </span>
                  <span className="block w-16 h-px bg-bone overflow-hidden">
                    <span className="block h-px bg-champagne origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </span>
                  <span className="text-bone text-2xl transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>
                </button>

                {error && (
                  <p
                    role="alert"
                    className="text-sm text-red-300/90 border-t border-red-300/20 pt-4"
                  >
                    {error}
                  </p>
                )}
              </form>
            ) : (
              <div className="border-t border-bone-faint/30 pt-10">
                <p className="font-display italic text-bone text-4xl lg:text-5xl leading-tight">
                  Thank you. A foreman will be in touch within one business day
                  to schedule your site survey.
                </p>
                <p className="mt-6 text-bone-dim text-sm">
                  — The {site.shortBrand} office
                </p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-bone-faint/15">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
              Direct
            </p>
            <a
              href={`mailto:${site.company.email}`}
              data-cursor="hover"
              className="mt-3 block font-display text-2xl lg:text-3xl text-bone leading-tight hover:text-champagne transition-colors duration-500"
            >
              {site.company.email}
            </a>
            <a
              href={`tel:${site.company.phone.replace(/\s+/g, "")}`}
              data-cursor="hover"
              className="mt-2 block font-display text-2xl lg:text-3xl text-bone leading-tight hover:text-champagne transition-colors duration-500"
            >
              {site.company.phone}
            </a>

            <div className="mt-12 space-y-6 text-bone-dim text-sm leading-relaxed">
              <div>
                <p className="eyebrow mb-2">Shop</p>
                <p>{site.company.address}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Hours</p>
                <p>{site.company.hours}</p>
                <p className="text-bone-faint">24-hour storm response</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Service area</p>
                <p>{site.company.serviceArea}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Credentials</p>
                <p>{site.company.affiliation}</p>
                <p>{site.company.license}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  multiline = false,
  placeholder,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const shared =
    "peer w-full bg-transparent border-0 border-b border-bone-faint/30 focus:border-champagne outline-none py-3 text-bone placeholder:text-bone-faint/60 transition-colors duration-500 text-base";
  return (
    <label htmlFor={name} className="group flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
        {label}
      </span>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          required
          placeholder={placeholder}
          className={shared + " resize-none"}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={shared}
        />
      )}
    </label>
  );
}
