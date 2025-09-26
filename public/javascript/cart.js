async function checkUser() {
  try {
    const res = await fetch("http://localhost:3000/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      window.location.href = "./login.html";
      return;
    } else {
      const data = await res.json();
      console.log("User login: ", data.userid);
      if (data.role !== "user") {
        window.history.back();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function showCarT() {
  try {
    const res = await fetch("http://localhost:3000/cart/view-all", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const col = document.createElement("div");
      col.classList.add("col-12");
      document.getElementById("cart-list").innerHTML = `
            <div class="alert alert-primary" role="alert">
            No Product Found!
            </div>
            `;
      document.getElementById("checkout-btn").style.display = "none";
      return;
    }

    const data = await res.json();

    const cart = document.getElementById("cart-list");
    cart.innerHTML = "";

    data.items.forEach((c) => {
      c.product.forEach((p) => {
        const col = document.createElement("div");
        col.className = "col-12";

        col.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body d-flex align-items-center">
                        <input type="checkbox" name="selected" value="${
                          p.id
                        }" class="form-check-input me-3" />
                            <img src=  "http://localhost:3000${
                              p.images
                            }" alt="${
          p.name
        }" class="rounded me-3" style="width: 80px; height: 80px; object-fit: cover;">
                        <div class="flex-grow-1">
                            <h5 class="card-title mb-1">${p.name}</h5>
                            <p class="mb-1 text-muted">Rp ${p.price.toLocaleString(
                              "id-ID"
                            )}</p>
                            <div class="d-flex align-items-center">
                                <button type="button" class="btn btn-outline-secondary btn-sm me-2" onclick="decreaseQty(${
                                  p.pid
                                }, -1)">-</button>
                                <span id="qty-${p.pid}" class="mx-2">${
          p.quantity
        }</span>
                                <button type="button" class="btn btn-outline-secondary btn-sm ms-2" onclick="increaseQty(${
                                  p.pid
                                }, ${p.stock})">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        cart.appendChild(col);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function increaseQty(pid, stock) {
  const qtyElem = document.getElementById(`qty-${pid}`);
  let qty = parseInt(qtyElem.textContent);
  if (qty < stock) {
    qty = qty + 1;
    qtyElem.textContent = qty;

    updateQty(pid, qty);
  }
}

async function decreaseQty(pid) {
  const qtyElem = document.getElementById(`qty-${pid}`);
  let qty = parseInt(qtyElem.textContent);
  if (qty > 0) {
    qty = qty - 1;
    qtyElem.textContent = qty;
    await updateQty(pid, qty);

    if (qty === 0) {
      const card = qtyElem.closest(".col-12");
      if (card) {
        card.remove();
      }
      showCarT();
    }
  }
}

async function updateQty(pid, qty) {
  try {
    const res = await fetch(`http://localhost:3000/cart/update/qty/${pid}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qty: qty }),
    });

    if (!res.ok) {
      console.log(res.err);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

checkUser();
showCarT();

document.getElementById("checkout-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  const co = Array.from(
    document.querySelectorAll("input[name='selected']:checked")
  ).map((c) => c.value);
  if (co.length === 0) {
    alert("Please select at least one item for checkout!");
    return;
  }

  console.log(co);
  const param = new URLSearchParams();
  param.append("selected", co.join(","));
  window.location.href = `./checkOutDetails.html?${param.toString()}`;
});
