async function checkUser() {
  try {
    const res = await fetch("http://localhost:3000/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      window.location.href = "./login.html";
      return;
    }

    const data = await res.json();
    if (data.role !== "user") {
      window.history.back();
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

async function showCO() {
  const url = new URLSearchParams(window.location.search);
  const items = url.get("selected");
  const selectedItems = items ? items.split(",") : [];

  console.log(selectedItems);
  console.log("Aopaa");

  try {
    const res = await fetch("http://localhost:3000/checkout/details", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid: selectedItems }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.log(data.err);
      document.getElementById(
        "checkout-list"
      ).innerHTML = `<p class="text-danger">${data.message}</p>`;
      return;
    }

    const coList = document.getElementById("checkout-list");
    coList.innerHTML = "";

    data.items.forEach((i) => {
      const sellerDiv = document.createElement("div");
      sellerDiv.className = "mb-4";

      const sellerHeader = document.createElement("h5");
      sellerHeader.textContent = `Seller: ${i.seller}`;
      sellerDiv.appendChild(sellerHeader);

      i.product.forEach((p) => {
        const item = document.createElement("div");
        item.className = "card mb-2 shadow-sm";

        item.innerHTML = `
            <div class="card-body d-flex align-items-center">
                <img src="http://localhost:3000${p.images}" alt="${p.name}" 
                class="rounded me-3" style="width: 70px; height: 70px; object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${p.name}</h6>
                    <p class="mb-1 text-muted">Rp ${p.price.toLocaleString(
                      "id-ID"
                    )}</p>
                    <small>Quantity: ${p.quantity}</small>
                    </div>
            </div>
            `;

        sellerDiv.appendChild(item);
      });
      coList.appendChild(sellerDiv);
    });

    document.getElementById("total-amount").textContent =
      data.total.toLocaleString("id-ID");
    document
      .getElementById("checkout-btn")
      .addEventListener("click", async () => {
        const res = await fetch(`http://localhost:3000/checkout/order`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({cid: selectedItems}),
        })
        
        if(!res.ok){
            console.log(res.err)
            return
        }

        alert("Checkout Succesfull! You can check your order in order page");
        window.location.href = './home.html'

      });
  } catch (error) {
    console.log(error);
  }
}

checkUser();
showCO();
