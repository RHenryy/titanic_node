function drawChart(label, numberof, yAxis, xAxis) {
  const ctx = document.getElementById("titanicChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: label,
      datasets: [
        {
          label: "Number",
          data: numberof,
          borderWidth: 3,
          backgroundColor: "black",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: yAxis,
          },
        },
        x: {
          title: {
            display: true,
            text: xAxis,
          },
        },
      },
    },
  });
}
try {
  //Recupération et traitement des datas en fonction du filter
  fetch("/api/passengers")
    .then((res) => res.json())
    .then((data) => {
      const passengers = data.passengers;
      let filter = document.getElementById("filter").innerHTML;
      let labelData = [];
      let numberOf = [];
      console.log(filter);
      if (filter === "Age") {
        const ageCount = {};
        for (const passenger of passengers) {
          if (passenger.Age && passenger.Age >= 1) {
            let age = parseInt(passenger.Age.toFixed(0), 10);
            labelData.push(age);
            if (ageCount[age]) {
              ageCount[age]++;
            } else {
              ageCount[age] = 1;
            }
          }
        }
        for (const age in ageCount) {
          numberOf.push(ageCount[age]);
        }
        const uniqueLabel = [...new Set(labelData)];
        uniqueLabel.sort((a, b) => a - b);

        drawChart(uniqueLabel, numberOf, "Nombre de passagers", "Age");
      } else if (filter === "Sex") {
        const sexCount = {};
        let labelData = [];
        let numberOf = [];
        for (const passenger of passengers) {
          if (passenger.Sex && passenger.Sex !== "") {
            let sex = passenger.Sex;
            labelData.push(sex);
            if (sexCount[sex]) {
              sexCount[sex]++;
            } else {
              sexCount[sex] = 1;
            }
          }
        }
        for (const sex in sexCount) {
          numberOf.push(sexCount[sex]);
        }
        const uniqueLabel = [...new Set(labelData)];
        uniqueLabel.sort((a, b) => a - b);
        let span1 = document.getElementById("pourcentage1");
        let span2 = document.getElementById("pourcentage2");
        span1.innerHTML =
          "Taux d'hommes <span class='red'>" +
          ((numberOf[0] / (numberOf[0] + numberOf[1])) * 100).toFixed(2) +
          "%</span>";
        span2.innerHTML =
          "Taux de femmes <span class='red'>" +
          ((numberOf[1] / (numberOf[1] + numberOf[0])) * 100).toFixed(2) +
          "%</span>";
        drawChart(uniqueLabel, numberOf, "Nombre de passagers", "Sexe");
      } else if (filter === "Classe") {
        const classeCount = {};
        const numberOfDeaths = {};
        let labelData = [];
        let numberOf = [];
        for (const passenger of passengers) {
          if (passenger.Pclass && passenger.Pclass !== "") {
            let Pclass = passenger.Pclass;
            labelData.push(Pclass);
            if (classeCount[Pclass]) {
              classeCount[Pclass]++;
            } else {
              classeCount[Pclass] = 1;
            }
            if (!numberOfDeaths[Pclass]) {
              numberOfDeaths[Pclass] = 0;
            }
            if (passenger.Survived === 0) {
              numberOfDeaths[Pclass]++;
            }
          }
        }
        for (const classe in classeCount) {
          numberOf.push(classeCount[classe]);
        }
        const labelArray = [...new Set(labelData)];
        labelArray.sort((a, b) => a - b);
        let appendString = " e classe";
        const uniqueLabel = labelArray.map((item) => item + appendString);
        for (const death in numberOfDeaths) {
          console.log(death);
          if (death == 1) {
            uniqueLabel.splice(1, 0, "Morts en " + death + appendString);
            numberOf.splice(1, 0, numberOfDeaths[death]);
          }
          if (death == 2) {
            uniqueLabel.splice(3, 0, "Morts en " + death + appendString);
            numberOf.splice(3, 0, numberOfDeaths[death]);
          }
          if (death == 3) {
            uniqueLabel.splice(5, 0, "Morts en " + death + appendString);
            numberOf.splice(5, 0, numberOfDeaths[death]);
          }
        }
        let span1 = document.getElementById("pourcentage1");
        let span2 = document.getElementById("pourcentage2");
        let span3 = document.getElementById("pourcentage3");
        span1.innerHTML =
          "Taux de mortalité <strong>1ere classe:</strong> <span class='red'>" +
          ((numberOf[1] / numberOf[0]) * 100).toFixed(2) +
          "%</span>";
        span2.innerHTML =
          "Taux de mortalité <strong>2eme classe:</strong> <span class='red'>" +
          ((numberOf[3] / numberOf[2]) * 100).toFixed(2) +
          "%</span>";
        span3.innerHTML =
          "Taux de mortalité <strong>3eme classe:</strong> <span class='red'>" +
          ((numberOf[5] / numberOf[4]) * 100).toFixed(2) +
          "%</span>";
        drawChart(uniqueLabel, numberOf, "Nombre de passagers", "Classe");
      }
    });
} catch (err) {
  console.log(err);
}
