async function loadProduct() {
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
      let productRes;
      let product;

      if (data.role === "admin") {
        productRes = await fetch("http://localhost:3000/admin/product/view", {
          method: "GET",
          credentials: "include",
        });
        product = await productRes.json();
        renderProducts(product, data.role);

      } else if (data.role === "user") {
        productRes = await fetch("http://localhost:3000/product/all", {
          method: "GET",
          credentials: "include",
        });
        console.log(productRes)
        product = await productRes.json();
        renderProducts(product, data.role);
      }
    }
  } catch (error) {
    console.log("Unauthorized!");
  }
}

function renderProducts(product, role) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  let title = document.createElement("h2");
  title.textContent = role === "admin" ? "My Products" : "All Products";
  container.appendChild(title);

  const row = document.createElement("div");
  row.classList.add("row", "g-2");

  console.log(product)
  if(!product || product.length  === 0) {
    const col = document.createElement("div");
    col.classList.add("col-12");
    col.innerHTML = `
    <div class="alert alert-primary" role="alert">
    No Product Found!
    </div>
    `
    row.appendChild(col);
    container.appendChild(row);
    return;
  }

  product.forEach((p) => {
    const col = document.createElement("div");
    col.classList.add("col-lg-2", "col-md-3", "col-sm-4", "col-6"); 

    col.innerHTML = `
    <a href="product-detail.html?pid=${p.id}" style="text-decoration:none; color:inherit;">
        <div class="card shadow-sm h-100" style="min-height: 280px; max-height: 350px; cursor:pointer;">
          <img src="http://localhost:3000${p.images[0]}"
               class="card-img-top"
               alt="${p.name}"
               style= object-fit:cover;">
          <div class="card-body d-flex flex-column justify-content-between p-2">
            <h6 class="card-title text-truncate" title="${p.name}">${p.name}</h6>
            <p class="card-text small text-truncate" style="max-width: 150px">
              ${p.description}
            </p>
            <div>
              <p class="card-text fw-bold mb-1">Rp ${p.price.toLocaleString("id-ID")}</p>
            </div>
          </div>
        </div>
      </a>
    `;
    row.appendChild(col);
  });

  container.appendChild(row);
}

loadProduct();
