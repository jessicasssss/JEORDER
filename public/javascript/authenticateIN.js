async function checkLogin(){
    try{
        const res = await fetch("http://localhost:3000/auth/me", {
            method: "GET",
            credentials: "include"
        })

        if(!res.ok){
            window.location.href = "./login.html"
            return
        }
        else{
            const data = await res.json()
            console.log("User login: ", data.userid);
            if(data.role !== "admin"){
                document.getElementById("for-admin").style.display = "none"
            }
            else if(data.role !== "user"){
                 document.getElementById("for-user").style.display = "none"
            }
        }

    } 
    catch (error){
        console.error("Auth check error:", error);
        window.location.href = "./login.html";
        return
    }
}


checkLogin();