
document.addEventListener("DOMContentLoaded", function () {

    fetch("login.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((content) => {
            localStorage.setItem("login", JSON.stringify(content));

            const data = JSON.parse(localStorage.getItem("login"));
            console.log(data);

            document.getElementById("loginForm")
            document.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent default form submission behavior

                // Get input values
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;

                // Validate credentials
                const user = data.users.find(
                    (user) => user.username === username && user.password === password
                );

                if (user.role === "admin") {
                    alert("Login successful! Welcome, " + user.username);
                    localStorage.setItem("currentUser", user.username);
                    // Redirect to google.com
                    window.location.href = "dashboard.html";
                }
                else if (user.role === "user") {
                    window.location.href = "index.html";
                }
            });
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
});

