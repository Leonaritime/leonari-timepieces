"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BLANK_FORM = {
  brand: "", model: "", reference: "", year: "", condition: "",
  includes: "", price: "", description: "", imageUrl: "", featured: false
};

export default function AdminDashboard() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function loadWatches() {
    setLoading(true);
    const res = await fetch("/api/products?admin=1");
    const data = await res.json();
    setWatches(data);
    setLoading(false);
  }

  useEffect(() => {
    loadWatches();
  }, []);

  function startEdit(watch) {
    setEditingId(watch.id);
    setForm({
      brand: watch.brand, model: watch.model, reference: watch.reference || "",
      year: watch.year || "", condition: watch.condition || "", includes: watch.includes || "",
      price: watch.priceCents ? (watch.priceCents / 100).toString() : "",
      description: watch.description || "", imageUrl: watch.imageUrl, featured: watch.featured
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(BLANK_FORM);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      brand: form.brand,
      model: form.model,
      reference: form.reference,
      year: form.year,
      condition: form.condition,
      includes: form.includes,
      priceCents: Math.round(parseFloat(form.price || "0") * 100),
      description: form.description,
      imageUrl: form.imageUrl,
      featured: form.featured
    };

    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      cancelEdit();
      loadWatches();
    } else {
      const data = await res.json();
      alert(data.error || "Something went wrong.");
    }
    setSaving(false);
  }

  async function toggleSold(watch) {
    await fetch(`/api/products/${watch.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: watch.status === "SOLD" ? "IN_STOCK" : "SOLD" })
    });
    loadWatches();
  }

  async function handleDelete(id) {
    if (!confirm("Remove this watch permanently?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadWatches();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-ink px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl text-parchment">
            Leonari <span className="text-gold">Admin</span>
          </h1>
          <button onClick={handleLogout} className="font-body text-xs uppercase tracking-widest text-parchment/50 hover:text-gold">
            Sign Out
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 rounded-sm border border-line/60 bg-panel p-6">
          <h2 className="font-display text-xl text-parchment">{editingId ? "Edit Watch" : "Add a Watch"}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Brand *"><input required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="input" /></Field>
            <Field label="Model *"><input required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="input" /></Field>
            <Field label="Reference #"><input value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} className="input" /></Field>
            <Field label="Year"><input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="input" /></Field>
            <Field label="Condition"><input value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} className="input" placeholder="Excellent" /></Field>
            <Field label="Includes"><input value={form.includes} onChange={(e) => setForm({ ...form, includes: e.target.value })} className="input" placeholder="Watch, Box & Booklets" /></Field>
            <Field label="Price (USD, leave blank or 0 for Inquire)">
              <input type="number" min="0" step="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input" placeholder="0" />
            </Field>
            <Field label="Image URL *"><input required value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="input" placeholder="https://..." /></Field>
          </div>
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input h-24" />
          </Field>
          <label className="mt-3 flex items-center gap-2 font-body text-sm text-parchment/70">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Feature at top of collection
          </label>
          <div className="mt-5 flex gap-3">
            <button type="submit" disabled={saving} className="rounded-sm bg-gold px-6 py-2 font-body text-xs uppercase tracking-widest text-ink hover:bg-goldbright disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Watch"}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="rounded-sm border border-line px-6 py-2 font-body text-xs uppercase tracking-widest text-parchment/60 hover:border-gold hover:text-gold">
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="mt-12 font-display text-xl text-parchment">Inventory ({watches.length})</h2>
        {loading ? (
          <p className="mt-4 font-body text-sm text-parchment/50">Loading...</p>
        ) : (
          <div className="mt-4 divide-y divide-line/60 rounded-sm border border-line/60 bg-panel">
            {watches.map((watch) => (
              <div key={watch.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={watch.imageUrl} alt="" className="h-14 w-14 rounded-sm object-cover" />
                  <div>
                    <p className="font-body text-sm text-parchment">{watch.brand} {watch.model}</p>
                    <p className="font-body text-xs text-parchment/40">
                      {watch.priceCents ? `$${(watch.priceCents / 100).toLocaleString()}` : "Inquire"} · {watch.status}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleSold(watch)} className="rounded-sm border border-line px-3 py-1.5 font-body text-xs uppercase tracking-widest text-parchment/60 hover:border-gold hover:text-gold">
                    Mark {watch.status === "SOLD" ? "In Stock" : "Sold"}
                  </button>
                  <button onClick={() => startEdit(watch)} className="rounded-sm border border-line px-3 py-1.5 font-body text-xs uppercase tracking-widest text-parchment/60 hover:border-gold hover:text-gold">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(watch.id)} className="rounded-sm border border-line px-3 py-1.5 font-body text-xs uppercase tracking-widest text-red-400/70 hover:border-red-400 hover:text-red-400">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {watches.length === 0 && (
              <p className="p-4 font-body text-sm text-parchment/50">No watches yet — add your first one above.</p>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          margin-top: 0.375rem;
          border-radius: 0.125rem;
          border: 1px solid #2a2723;
          background: #0a0a0b;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #f3ede1;
        }
        .input:focus-visible { border-color: #c6a45c; outline: none; }
      `}</style>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="block font-body text-xs uppercase tracking-widest text-parchment/50">
      {label}
      {children}
    </label>
  );
}
