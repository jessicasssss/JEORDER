async function loadOrder() {
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
      let orderRes;
      let order;

      if (data.role === "admin") {
        orderRes = await fetch("http://localhost:3000/admin/allorder", {
          method: "GET",
          credentials: "include",
        });
      } else if (data.role === "user") {
        orderRes = await fetch("http://localhost:3000/user/allorder", {
          method: "GET",
          credentials: "include",
        });
        console.log(orderRes);
      }

      order = await orderRes.json();
      renderProducts(order, data.role);
    }
  } catch (error) {
    console.log(error);
  }
}

function renderProducts(order, role) {
  const container = document.getElementById("order-container");
  container.innerHTML = "";

  let title = document.createElement("h2");
  title.textContent = "All Orders";
  container.appendChild(title);

  const row = document.createElement("div");
  row.classList.add("row", "g-2");

  console.log(order)
  if (!order || order.length === 0) {
    const col = document.createElement("div");
    col.classList.add("col-12");
    col.innerHTML = `
        <div class="alert alert-primary" role="alert">
            No Order Yet!
        </div>
    `;
    row.appendChild(col);
    container.appendChild(row);
    return;
  }

  order.message.forEach((o) => {
    const col = document.createElement("div");
    col.classList.add("col-6");

    col.innerHTML = `
        <div class="card mb-2 align-items-center">
            <div class="card-body d-flex align-items-center">
                <img src="http://localhost:3000${o.image}" alt="${o.name}" 
                class="rounded me-3" style="width: 200px; height: 200px; object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${o.name}</h6>
                    <p class="mb-1 text-muted">Rp ${o.price.toLocaleString(
                      "id-ID"
                    )}</p>
                    <small>Quantity: ${o.quantity}</small><br>
                    <small><strong>Status:</strong> ${o.status}</small><br>
                    <small>Ordered at: ${o.created_at}</small>
                    <div id="action-${o.id}" class="mt-2"></div>
                </div>
            </div>
        </div>
        `;
    row.appendChild(col);

    const actionDiv = col.querySelector(`#action-${o.id}`);

    if (role === "user" && o.status === "SHIPPED") {
      const btn = document.createElement("button");
      btn.classList.add("btn", "btn-success");
      btn.textContent = "Received";
      btn.onclick = async () => {
        try {
          console.log(o.id);
          const res = await fetch(`http://localhost:3000/user/status/${o.id}`, {
            method: "PATCH",
            credentials: "include",
          });

          if (res.ok) {
            alert("Order marks as received!");
            loadOrder();
          }
        } catch (error) {
          console.log(error);
        }
      };
      actionDiv.appendChild(btn);
    }

    if (role === "admin" && o.status === "PAID") {
      const btn = document.createElement("button");
      btn.classList.add("btn", "btn-primary");
      btn.textContent = "Shipped";
      btn.onclick = async () => {
        try {
          console.log(o.id);
          const res = await fetch(
            `http://localhost:3000/admin/status/${o.id}`,
            {
              method: "PATCH",
              credentials: "include",
            }
          );

          if (res.ok) {
            alert("Order status updated to shipped!");
            loadOrder();
          }
        } catch (error) {
          console.log(error);
        }
      };
      actionDiv.appendChild(btn);
    }
  });
  container.appendChild(row);
}

loadOrder();
