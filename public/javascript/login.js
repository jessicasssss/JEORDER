document.getElementById("login_btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const alert = document.getElementById("alert");

  if (!email || !password) {
    alert.innerText = "Please fill in all fields!";
    alert.style.color = "red";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert.innerText = data.message || "Login Failed!";
      alert.style.color = "red";
      return;
    }

    alert.innerText = data.message;
    alert.style.color = "green";

    setTimeout(() => {
      window.location.href = "../html/home.html";
    }, 1500);
  } catch (error) {
    console.log("Login error: ", error);
    alert.innerText = error;
    alert.style.color = "red";
  }
});