document.getElementById("logout_btn").addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
    }

    window.location.href = "./login.html"
  } catch (error) {
    console.log("Login error: ", error);
  }
});
