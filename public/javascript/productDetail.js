async function loadProductDetail() {
  const url = new URLSearchParams(window.location.search);
  const pid = url.get("pid");
  if(!pid){
    return;
  }

  const resAuth = await fetch("http://localhost:3000/auth/me", {
    method: "GET",
    credentials: "include",
  });
  const user = await resAuth.json();

  const res = await fetch(`http://localhost:3000/product/view/${pid}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  const product = data.result;

  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = "Rp " + product.price.toLocaleString("id-ID");
   document.getElementById("product-description").innerHTML = product.description.replace(/\n/g, "<br>");
  document.getElementById("product-stock").textContent = product.stock;

  const indicators = document.getElementById("carousel-indicators");
  const images = document.getElementById("carousel-images");

  indicators.innerHTML = product.image_url
    .map(
      (_, i) => `
      <button type="button" data-bs-target="#carousel" data-bs-slide-to="${i}"
        class="${i === 0 ? "active" : ""}" ${
        i === 0 ? 'aria-current="true"' : ""
      }
        aria-label="Slide ${i + 1}"></button>
    `
    )
    .join("");

  images.innerHTML = product.image_url
    .map(
      (img, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img src="http://localhost:3000${img}" 
             class="d-block mx-auto w-75 img-fluid rounded"
             style= "max-width:400px; object-fit" 
             alt="${product.name}">
      </div>
    `
    )
    .join("");
  const action = document.getElementById("product-action");
  if(user.role === "admin"){
    action.innerHTML = `
    <button onclick="updateProduct(${product.id})" class="btn btn-warning mt-3">Update Product</button>
    <button onclick="deleteProduct(${product.id})" class="btn btn-danger mt-3">Delete Product</button>
  `;
  }
  else if (user.role === "user"){
    console.log(product)
    action.innerHTML = `
    <div class="d-flex align-items-center mb-3">
      <label class="me-3 fw-bold">Quantity</label>
      <button class="btn btn-outline-secondary btn-sm" onclick="decreaseQty(${product.id})">-</button>
      <span id="qty-${product.id}" class="mx-3 text-danger fw-bold">1</span>
      <button class="btn btn-outline-secondary btn-sm" onclick="increaseQty(${product.id}, ${product.stock})">+</button>
    </div>
    <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>

    <div class="col-md-12 mt-5">
      <h5>Seller</h5>
      <span >${product.username}</span>
    </div>
  `;
  }
}

function updateProduct(pid){
  window.location.href = `./update-product.html?pid=${pid}`;
}

async function deleteProduct(pid){
 
  try{
    const res = await fetch(`http://localhost:3000/admin/product/delete/${pid}`, {
      method: "DELETE",
      credentials: "include"
    })

    if(!res.ok){
      console.log(res.statusText)
      return;
    }
    await res.json();
    window.location.href = "./home.html"
  }
  catch(error){
    console.log("Failed to delete product!")
  }
}

function increaseQty(pid, stock){
  const qtyElem = document.getElementById(`qty-${pid}`);
  let qty = parseInt(qtyElem.textContent);
  if (qty < stock) {
    qtyElem.textContent = qty + 1;
  }
}

function decreaseQty(pid){
  const qtyElem = document.getElementById(`qty-${pid}`);
  let qty = parseInt(qtyElem.textContent);
  if (qty > 1){
    qtyElem.textContent = qty - 1;
  }
}


async function addToCart(pid) {
    const qtyElem = document.getElementById(`qty-${pid}`);
    const quantity = qtyElem ? parseInt(qtyElem.textContent) : 1;
    console.log(quantity)
  try {
    const res = await fetch(`http://localhost:3000/cart/add/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({quantity})
    });
    const data = await res.json();
    if (!res.ok) return alert("Error: " + data.message);
    alert(data.message);
  } catch (err) {
    console.error("Add to Cart failed:", err);
    alert("Something went wrong, please try again!");
  }
}

loadProductDetail();
