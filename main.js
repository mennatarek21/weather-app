document.getElementById("homeLink").addEventListener("click", () => showSection("home"));
document.getElementById("contactLink").addEventListener("click", () => showSection("contact"));

function showSection(section) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(sec => {
        if (sec.id === section) {
            sec.style.display = "block"; 
        } else {
            sec.style.display = "none"; 
        }
    });
}

const apiKey = "ad89e9293a764482989181732240912"; 
const baseUrl = "https://api.weatherapi.com/v1";

document.getElementById("searchButton").addEventListener("click", async function () {
    const city = document.getElementById("cityInput").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const forecastCards = document.getElementById("forecastCards");

    if (!city) {
        errorMsg.innerText = "Please enter a city name.";
        errorMsg.style.display = "block";
        return;
    }

    try {
        const forecastResponse = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${city}&days=3`);
        if (!forecastResponse.ok) throw new Error();
        const forecastData = await forecastResponse.json();

        forecastCards.innerHTML = ""; 
        forecastData.forecast.forecastday.forEach((day) => {
            const card = `
            <div class="col-md-4">
                <div class="card text-center">
                    <div class="card-body">
                        <h5>${day.date}</h5>
                        <p>${day.day.avgtemp_c}°C</p>
                        <p>${day.day.condition.text}</p>
                    </div>
                </div>
            </div>`;
            forecastCards.innerHTML += card;
        });

        errorMsg.style.display = "none"; 
    } catch (error) {
        errorMsg.innerText = "City not found. Please try again.";
        errorMsg.style.display = "block";
        forecastCards.innerHTML = ""; 
    }
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    console.log("Contact Form Data:", { name, email, subject, message });

    alert("Your message has been sent!");
});
