async function checkLogOut(){
    try{
        const res = await fetch("http://localhost:3000/auth/me", {
            method: "GET",
            credentials: "include"
        })

        if(res.ok){
            window.history.back()
        }
    }
    catch(error){
        console.log("Already Logged In!");
    }
}

checkLogOut();