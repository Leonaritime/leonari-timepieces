import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SuccessPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-8 pt-24 text-center">
        <p className="plate-label">Order Confirmed</p>
        <h1 className="mt-4 font-display text-4xl font-light text-ivory">Thank you for your acquisition.</h1>
        <p className="mt-4 font-body text-sm leading-relaxed text-steel">
          A confirmation has been sent to your email. We'll be in touch shortly with tracking and insured shipping details.
          Questions in the meantime? Reach us at{" "}
          <a href={`mailto:${email}`} className="text-champagne hover:underline">{email}</a>.
        </p>
        <a
          href="/#collection"
          className="mt-10 border border-champagne/60 px-8 py-3 font-body text-xs uppercase tracking-widest text-champagne hover:bg-champagne hover:text-ink"
        >
          Back to the Collection
        </a>
      </main>
      <Footer />
    </>
  );
}
