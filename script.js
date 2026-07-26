const RICE_NORM = 200; // grams per meal
const DAL_NORM = 30;   // grams per meal

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const empty = document.getElementById("empty");

const tableBody = document.getElementById("tableBody");
const summaryBody = document.getElementById("summaryBody");
const exceptionBody = document.getElementById("exceptionBody");

fetch("meals.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Unable to load data.");
    }
    return response.json();
  })
  .then(data => {
    loading.classList.add("hidden");

    if (!Array.isArray(data) || data.length === 0) {
      empty.classList.remove("hidden");
      return;
    }

    displayDailyRecords(data);
    displaySummary(data);
    displayExceptions(data);

    document.getElementById("totalSchools").textContent =
      [...new Set(data.map(item => item.school))].length;

    document.getElementById("totalRecords").textContent = data.length;
  })
  .catch(err => {
    loading.classList.add("hidden");
    error.classList.remove("hidden");
    console.error(err);
  });

function displayDailyRecords(data) {

  tableBody.innerHTML = "";

  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  data.forEach(record => {

    let attendance =
      record.enrolled > 0
        ? ((record.present / record.enrolled) * 100).toFixed(1)
        : "-";

    let riceMeal = "-";
    let dalMeal = "-";

    if (record.meals > 0) {
      riceMeal = ((record.rice * 1000) / record.meals).toFixed(1);
      dalMeal = ((record.dal * 1000) / record.meals).toFixed(1);
    }

    let status = "✔ Normal";

    if (
      record.meals > record.present ||
      Object.values(record).includes("") ||
      Object.values(record).includes(null)
    ) {
      status = "⚠ Exception";
    }

    const row = `
    <tr>
        <td>${record.date}</td>
        <td>${record.school}</td>
        <td>${record.enrolled}</td>
        <td>${record.present}</td>
        <td>${attendance}%</td>
        <td>${record.meals}</td>
        <td>${record.rice}</td>
        <td>${record.dal}</td>
        <td>${riceMeal}</td>
        <td>${dalMeal}</td>
        <td>${record.organiser}</td>
        <td>${status}</td>
    </tr>
    `;

    tableBody.innerHTML += row;

  });

}

function displaySummary(data) {

  summaryBody.innerHTML = "";

  let schools = {};

  data.forEach(record => {

    if (!schools[record.school]) {

      schools[record.school] = {
        attendance: 0,
        rice: 0,
        dal: 0,
        count: 0
      };

    }

    schools[record.school].attendance +=
      (record.present / record.enrolled) * 100;

    if (record.meals > 0) {

      schools[record.school].rice +=
        (record.rice * 1000) / record.meals;

      schools[record.school].dal +=
        (record.dal * 1000) / record.meals;

    }

    schools[record.school].count++;

  });

  for (let school in schools) {

    const s = schools[school];

    summaryBody.innerHTML += `
    <tr>
        <td>${school}</td>
        <td>${(s.attendance / s.count).toFixed(1)}%</td>
        <td>${(s.rice / s.count).toFixed(1)} g</td>
        <td>${(s.dal / s.count).toFixed(1)} g</td>
    </tr>
    `;

  }

}

function displayExceptions(data) {

  exceptionBody.innerHTML = "";

  let count = 0;

  data.forEach(record => {

    let reasons = [];

    if (record.meals > record.present) {
      reasons.push("Meals > Present");
    }

    if (
      Object.values(record).includes("") ||
      Object.values(record).includes(null)
    ) {
      reasons.push("Missing Field");
    }

    if (record.meals > 0) {

      let riceMeal =
        (record.rice * 1000) / record.meals;

      let dalMeal =
        (record.dal * 1000) / record.meals;

      if (
        riceMeal > RICE_NORM + 30 ||
        riceMeal < RICE_NORM - 30
      ) {
        reasons.push("Rice outside norm");
      }

      if (
        dalMeal > DAL_NORM + 10 ||
        dalMeal < DAL_NORM - 10
      ) {
        reasons.push("Dal outside norm");
      }

    }

    if (reasons.length > 0) {

      count++;

      exceptionBody.innerHTML += `
      <tr>
          <td>${record.date}</td>
          <td>${record.school}</td>
          <td>${reasons.join(", ")}</td>
      </tr>
      `;

    }

  });

  document.getElementById("exceptionCount").textContent = count;

}