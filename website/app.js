document.getElementById("generate").addEventListener("click", performAction);

function performAction() {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeatherData(zip)
    .then((data) =>
      postData("/add", { date: new Date(), temp: data.main.temp, feelings })
    )
    .then(() => updateUI())
    .catch((error) => console.error(error));
}

async function getWeatherData(zip) {
  const apiKey = "6f07aa224573416d20b2f408cc417df4";
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

async function updateUI() {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${Math.round(
      allData.temp
    )} degrees`;
    document.getElementById("content").innerHTML = `Feeling: ${allData.feel}`;
  } catch (error) {
    console.error("Error", error);
  }
}
