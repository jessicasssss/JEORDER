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

  function dobFormatted(dob) {
    const [year, month, day] = dob.split("-");

    return `${year}-${month}-${day}`;
  }


  document.getElementById("reg_btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const password = document.getElementById("password").value.trim();
    const alert = document.getElementById("alert");

    if (!username || !email || !dob || !password) {
      alert.innerText = "Please fill all fields!";
      alert.style.color = "red";
      return;
    }

    if (username.length < 5 || username.length > 10) {
      alert.innerText = "Username must be longer than 4 and less than 10!";
      alert.style.color = "red";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert.innerText = "Email must be in valid format";
      alert.style.color = "red";
      return;
    }

    if (email.length < 5) {
      alert.innerText = "Email must be in valid format";
      alert.style.color = "red";
      return;
    }

    if (!dobVal(dob)) {
      alert.innerText = "You must be at least 17 years old to register!";
      alert.style.color = "red";
      return;
    }

    const formatedDOB = dobFormatted(dob);
    console.log(formatedDOB)
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, dob: formatedDOB, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert.innerText = data.message || "Register Failed!";
        alert.style.color = "red";
        return;
      }

      alert.innerText = data.message;
      alert.style.color = "green";

      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1500);
    } catch (error) {
      console.log("Login error: ", error);
      alert.innerText = error;
      alert.style.color = "red";
    }
  });