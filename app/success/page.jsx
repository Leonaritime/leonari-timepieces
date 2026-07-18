import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SuccessPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@leonaritime.com";
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-xs uppercase tracking-widest2 text-gold">Order Confirmed</p>
        <h1 className="mt-4 font-display text-4xl text-parchment">Thank you for your purchase.</h1>
        <p className="mt-4 font-body text-sm leading-relaxed text-parchment/60">
          A confirmation has been sent to your email. We'll be in touch shortly with tracking and insured shipping details.
          Questions in the meantime? Reach us at{" "}
          <a href={`mailto:${email}`} className="text-gold hover:underline">{email}</a>.
        </p>
        <a
          href="/"
          className="mt-8 rounded-sm border border-gold/60 px-6 py-3 font-body text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-ink"
        >
          Back to Collection
        </a>
      </main>
      <Footer />
    </>
  );
}
