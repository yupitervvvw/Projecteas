function populateFishSelect() {
  const select = document.getElementById("order-fish");
  if (!select) return;
  select.innerHTML = '<option value="">-- Pilih jenis ikan --</option>';
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name} - ${formatRupiah(product.price)}/${product.unit}`;
    select.appendChild(option);
  });
}

function updateOrderSummary() {
  const fishSelect = document.getElementById("order-fish");
  const qtyInput = document.getElementById("order-qty");
  const summaryDiv = document.getElementById("order-summary");
  const totalDiv = document.getElementById("order-total");
  if (!fishSelect || !qtyInput || !summaryDiv || !totalDiv) return;
  const fishId = parseInt(fishSelect.value);
  const qty = parseFloat(qtyInput.value) || 0;
  if (fishId && qty > 0) {
    const product = products.find((p) => p.id === fishId);
    if (product) {
      const total = product.price * qty;
      summaryDiv.innerHTML = `<div style="display:flex; align-items:center; gap:12px; padding:12px; background:#e6f3fa; border-radius:16px;">
        <img src="${product.img}" alt="${product.name}" style="width:56px; height:56px; border-radius:12px; object-fit:cover;">
        <div style="flex:1; min-width:0;"><p style="font-weight:700; color:#111827; font-size:14px;">${product.name}</p><p style="font-size:12px; color:#6b7280;">${formatRupiah(product.price)}/${product.unit} × ${qty} ${product.unit}</p></div></div>`;
      totalDiv.innerHTML = `<span style="font-weight:700; color:#111827;">Total</span><span style="font-weight:800; font-size:24px; color:#0077B6;">${formatRupiah(total)}</span>`;
    }
  } else {
    summaryDiv.innerHTML = `<div style="text-align:center; padding:32px 0; color:#9ca3af;"><iconify-icon icon="solar:cart-large-2-linear" style="font-size:32px;"></iconify-icon><p style="font-size:14px; margin-top:8px;">Isi formulir untuk melihat ringkasan</p></div>`;
    totalDiv.innerHTML = `<span style="font-weight:700; color:#111827;">Total</span><span style="font-weight:800; font-size:24px; color:#0077B6;">Rp 0</span>`;
  }
}

function submitOrder(event) {
  event.preventDefault();
  const name = document.getElementById("order-name").value.trim();
  const phone = document.getElementById("order-phone").value.trim();
  const fishId = document.getElementById("order-fish").value;
  const qty = document.getElementById("order-qty").value;
  const address = document.getElementById("order-address").value.trim();
  if (!name || !phone || !fishId || !qty || !address) {
    showToast("Perhatian", "Harap isi semua field yang wajib diisi", "warning");
    return;
  }
  const product = products.find((p) => p.id === parseInt(fishId));
  const fishName = product ? product.name : "Ikan";
  showToast(
    "Pesanan Terkirim! ✨",
    `${fishName} sebanyak ${qty} Kg akan segera diproses`,
  );
  document.getElementById("order-form").reset();
  updateOrderSummary();
}

document.addEventListener("DOMContentLoaded", () => {
  populateFishSelect();
  const fishSelect = document.getElementById("order-fish");
  const qtyInput = document.getElementById("order-qty");
  if (fishSelect) fishSelect.addEventListener("change", updateOrderSummary);
  if (qtyInput) qtyInput.addEventListener("input", updateOrderSummary);
  const form = document.getElementById("order-form");
  if (form) form.addEventListener("submit", submitOrder);
});
