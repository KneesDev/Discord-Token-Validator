async function validate() {
    const token = document.getElementById('token').value;
    if (!token) {
        document.getElementById('result').innerHTML = "No token provided";
        document.getElementById('result').style.color = "gray";
        document.getElementById('result').style.display = "block";
        return;
    }
    document.getElementById('result').style.display = "none";
    document.getElementById('token').value = "";
    document.getElementById('validate').setAttribute("disabled", "true");
    try {
        const response = await fetch('https://discord.com/api/v9/users/@me/library', {
            headers: {
                'Authorization': token,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36'
            }
        });

        const status_code = response.status;
        if (status_code === 401) {
            document.getElementById('result').innerHTML = "Bad token";
            document.getElementById('result').style.color = "red";
            document.getElementById('result').style.display = "block";
            document.getElementById('validate').removeAttribute("disabled");
        } else if (status_code === 200) {
            document.getElementById('result').innerHTML = "Good token";
            document.getElementById('result').style.color = "green";
            document.getElementById('result').style.display = "block";
            document.getElementById('validate').removeAttribute("disabled");
        } else if (status_code === 403) {
            document.getElementById('result').innerHTML = "Locked token";
            document.getElementById('result').style.color = "orange";
            document.getElementById('result').style.display = "block";
            document.getElementById('validate').removeAttribute("disabled");
        } else if (status_code === 429) {
            document.getElementById('result').innerHTML = "Rate limited, slow down!";
            document.getElementById('result').style.color = "blue";
            document.getElementById('result').style.display = "block";
            document.getElementById('validate').removeAttribute("disabled");
        } else {
            document.getElementById('result').innerHTML = "Unknown error";
            document.getElementById('result').style.color = "gray";
            document.getElementById('result').style.display = "block";
            document.getElementById('validate').removeAttribute("disabled");
        }
    } catch (error) {
        document.getElementById('result').innerHTML = "Unknown error";
        document.getElementById('result').style.color = "gray";
        document.getElementById('result').style.display = "block";
        document.getElementById('validate').removeAttribute("disabled");
    }
}
// Made by KneesDev
// https://github.com/KneesDev/Discord-Token-Validator