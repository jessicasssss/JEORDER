const alert = document.getElementById("alert");
const url = new URLSearchParams(window.location.search);
const pid = url.get("pid");

async function getProduct() {
  if (!pid) {
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/product/view/${pid}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    const product = data.result;

    if (!res.ok) {
      console.error("ress erorr");
      alert.innerText = "Failed to load profile!";
      alert.style.color = "red";
      return;
    }
    console.log(product)
    console.log(product.description)
    console.log(product.price)
    document.getElementById("nameP").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
  } catch (error) {
    console.log("Failed to get product data!");
  }
}

document.getElementById("update_btn").addEventListener("click",async () => {

  const name = document.getElementById("nameP").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = Number(document.getElementById("price").value.trim());
  const stock = Number(document.getElementById("stock").value.trim());
  const img = document.getElementById("image");
  const image = img.files;

  if (!name || !description || !price || !stock) {
    alert.innerText = "Please fill all fields!";
    alert.style.color = "red";
    return;
  }
  if (name.length < 5) {
    alert.innerText = "Product name must be more than 5 letters!";
    alert.style.color = "red";
    return;
  }
  if (name.length > 100) {
    alert.innerText = "Product name must be less than 50 letters!";
    alert.style.color = "red";
    return;
  }
  if (description.length < 10) {
    alert.innerText = "Product description must be more than 10 letters!";
    alert.style.color = "red";
    return;
  }
  if (description.length > 5000) {
    alert.innerText = "Product description must be less than 5000 letters!";
    alert.style.color = "red";
    return;
  }
  if (isNaN(stock) || stock <= 0) {
    alert.innerText = "Stock must be a positive number!";
    alert.style.color = "red";
    return;
  }
  if (!Number.isInteger(stock)) {
    alert.innerText = "Stock must be a whole number!";
    alert.style.color = "red";
    return;
  }
  if (isNaN(price) || price <= 0) {
    alert.innerText = "Price must be a positive number!";
    alert.style.color = "red";
    return;
  }

  if (image.length > 4) {
    alert.innerText = "You can only upload a maximum of 4 images!";
    alert.style.color = "red";
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("stock", stock);
  if (image.length > 0) {
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
  }


  try {
    const res = await fetch(
      `http://localhost:3000/admin/product/update/${pid}`,
      {
        method: "PATCH",
        credentials: "include",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert.innerText = data.message;
      alert.style.color = "red";
      return;
    }

    alert.innerText = data.message;
    alert.style.color = "green";
    return;
  } catch (error) {
    alert.innerText = error;
    alert.style.color = "red";
  }
});

getProduct();