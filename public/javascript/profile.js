function dobVal(dob) {
  const [year, month, day] = dob.split("-");

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dateDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dateDiff < 0)) {
    age--;
  }
  return age >= 17;
}

async function getProfile() {
  const alert = document.getElementById("alert");
  try {
    const res = await fetch("http://localhost:3000/profile/view", {
      method: "GET",
      credentials: "include",
    });
    console.error("res:", res);
    if (!res.ok) {
      console.error("ress erorr");
      alert.innerText = "Failed to load profile!";
      alert.style.color = "red";
      return;
    }

    const data = await res.json();
    document.getElementById("username").value = data.username || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("dob").value = data.date_of_birth || "";
    document.getElementById("role").value = data.role || "";
    document.getElementById("address").value = data.address || "";
  } catch (error) {
    console.error("Profile load error:", error);
    alert.innerText = "Failed to load profile!";
    alert.style.color = "red";
  }
}
getProfile();

document.getElementById("update").addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const address = document.getElementById("address").value.trim();

  const alert = document.getElementById("alert");

  if (!username || !dob || !address) {
    alert.innerText = "Please fill every fields!";
    alert.style.color = "red";
    return;
  }

  if (username.length < 5 || username.length > 10) {
    alert.innerText = "Username must be longer than 4 and less than 10!";
    alert.style.color = "red";
    return;
  }

  if (!dobVal(dob)) {
    alert.innerText = "You must be at least 17 years old to register!";
    alert.style.color = "red";
    return;
  }

  if (address.length < 5) {
    alert.innerText = "Address must be longer than 5!";
    alert.style.color = "red";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/profile/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, date_of_birth: dob, address }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert.innerText = data.message;
      alert.style.color = "red";
      return;
    }
    alert.innerText = data.message;
    alert.style.color = "green";
  } catch (error) {
    console.log("Error in updating profile!");
    alert.innerText = data.message;
    alert.style.color = "red";
    return;
  }
});
