function drawChart(
  label,
  numberof,
  yAxis,
  xAxis,
  boolean,
  type,
  canvasId,
  title,
  color
) {
  const ctx = document.getElementById(canvasId);
  new Chart(ctx, {
    type: type,
    data: {
      labels: label,
      datasets: [
        {
          label: title,
          data: numberof,
          borderWidth: 3,
          backgroundColor: color,
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        datalabels: {
          color: "white",
          formatter: function (context, args) {
            const index = args.dataIndex;
            if (type === "pie") {
              if (xAxis === "Age") {
                if (
                  args.chart.data.labels[index] === "Inconnu" ||
                  args.chart.data.labels[index] === "Age Inconnu"
                ) {
                  return (args.chart.data.labels[index] = "Age Inconnu");
                } else {
                  // args.chart.data.labels[index] =
                  //   args.chart.data.labels[index] + " ans";
                  return args.chart.data.labels[index] + " ans";
                }
              } else {
                return args.chart.data.labels[index];
              }
            } else if (xAxis === "Age" && type !== "pie") {
              context = "";
              return context;
            } else {
              return context;
            }
          },
          font: {
            weight: "bold",
            size: 16,
          },
        },
      },
      scales: {
        y: {
          display: boolean,
          beginAtZero: true,
          title: {
            display: boolean,
            text: yAxis,
          },
        },
        x: {
          display: boolean,
          title: {
            display: boolean,
            text: xAxis,
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}
try {
  //Recupération et traitement des datas en fonction du filter
  fetch("/api/passengers")
    .then((res) => res.json())
    .then((data) => {
      const passengers = data.passengers;
      const totalPassengers = passengers.length;
      let totalDeaths = 0;
      let filter = document.getElementById("filter").innerHTML;
      let labelData = [];
      let numberOf = [];
      let ageInterval = {};
      let ageIntervalDeaths = {};
      if (filter === "Age") {
        const ageCount = {};
        for (const passenger of passengers) {
          if (passenger.Survived === 0) {
            totalDeaths++;
          }
          if (passenger.Age === null) {
            labelData.push("Inconnu");
            ageInterval["Inconnu"] = ageInterval["Inconnu"]
              ? ageInterval["Inconnu"] + 1
              : 1;
            if (passenger.Survived === 0) {
              ageIntervalDeaths["Inconnu"] = ageIntervalDeaths["Inconnu"]
                ? ageIntervalDeaths["Inconnu"] + 1
                : 1;
            }
          }
          if (passenger.Age && passenger.Age >= 0) {
            let age = parseInt(passenger.Age.toFixed(0), 10);
            labelData.push(age);
            if (age >= 0 && age <= 17) {
              ageInterval["0-17"] = ageInterval["0-17"]
                ? ageInterval["0-17"] + 1
                : 1;
            }
            if (age >= 0 && age <= 17) {
              if (passenger.Survived === 0) {
                ageIntervalDeaths["0-17"] = ageIntervalDeaths["0-17"]
                  ? ageIntervalDeaths["0-17"] + 1
                  : 1;
              }
            }
            if (age >= 18 && age <= 35) {
              ageInterval["18-35"] = ageInterval["18-35"]
                ? ageInterval["18-35"] + 1
                : 1;
            }
            if (age >= 18 && age <= 35) {
              if (passenger.Survived === 0) {
                ageIntervalDeaths["18-35"] = ageIntervalDeaths["18-35"]
                  ? ageIntervalDeaths["18-35"] + 1
                  : 1;
              }
            }
            if (age >= 36 && age <= 60) {
              ageInterval["36-60"] = ageInterval["36-60"]
                ? ageInterval["36-60"] + 1
                : 1;
            }
            if (age >= 36 && age <= 60) {
              if (passenger.Survived === 0) {
                ageIntervalDeaths["36-60"] = ageIntervalDeaths["36-60"]
                  ? ageIntervalDeaths["36-60"] + 1
                  : 1;
              }
            }
            if (age > 60) {
              ageInterval["60+"] = ageInterval["60+"]
                ? ageInterval["60+"] + 1
                : 1;
            }
            if (age > 60) {
              if (passenger.Survived === 0) {
                ageIntervalDeaths["60+"] = ageIntervalDeaths["60+"]
                  ? ageIntervalDeaths["60+"] + 1
                  : 1;
              }
            }
            if (ageCount[age]) {
              ageCount[age]++;
            } else {
              ageCount[age] = 1;
            }
          }
        }
        let finalAgeArray = [];
        ageIntervalDeaths = Object.keys(ageIntervalDeaths)
          .sort()
          .reduce((obj, key) => {
            obj[key] = ageIntervalDeaths[key];
            return obj;
          }, {});
        for (const age in ageIntervalDeaths) {
          let tempAge = ((ageIntervalDeaths[age] / totalDeaths) * 100).toFixed(
            2
          );
          finalAgeArray.push(tempAge);
        }
        for (const age in ageCount) {
          numberOf.push(ageCount[age]);
        }
        let uniqueLabel = [...new Set(labelData)];
        uniqueLabel.sort((a, b) =>
          a.toString().localeCompare(b, undefined, { numeric: true })
        );
        drawChart(
          uniqueLabel,
          numberOf,
          "Nombre de passagers",
          "Age",
          true,
          "bar",
          "titanicChart",
          "Nombre de passagers",
          "black"
        );
        let labelArray = ["0-17", "18-35", "36-60", "60+", "Inconnu"];
        let colorArray = [
          "#3D3D3D",
          "#C1C1C1",
          "#868686",
          "#5A5E6B",
          "#000000",
        ];
        drawChart(
          labelArray,
          finalAgeArray,
          "Nombre de passagers",
          "Age",
          false,
          "pie",
          "titanicPieChart",
          "% de mortalité totale par tranche d'age",
          colorArray
        );
      } else if (filter === "Sex") {
        const sexCount = {};
        let numberOfDeaths = {};
        let labelData = [];
        let numberOf = [];
        for (const passenger of passengers) {
          if (passenger.Survived === 0) {
            totalDeaths++;
          }
          if (passenger.Sex && passenger.Sex !== "") {
            let sex = passenger.Sex;
            let sexLabel = sex === "male" ? "Hommes" : "Femmes";
            labelData.push(sexLabel);
            if (sexCount[sex]) {
              sexCount[sex]++;
            } else {
              sexCount[sex] = 1;
            }
            if (!numberOfDeaths[sex]) {
              numberOfDeaths[sex] = 0;
            }
            if (passenger.Survived === 0) {
              numberOfDeaths[sex]++;
            }
          }
        }
        for (const sex in sexCount) {
          numberOf.push(sexCount[sex]);
        }
        numberOf.splice(1, 0, numberOfDeaths["male"]);
        numberOf.splice(3, 0, numberOfDeaths["female"]);
        const uniqueLabel = [...new Set(labelData)];
        uniqueLabel.sort((a, b) => a - b);
        let span1 = document.getElementById("pourcentage1");
        let span2 = document.getElementById("pourcentage2");
        let span3 = document.getElementById("pourcentage3");
        let span4 = document.getElementById("pourcentage4");
        span1.innerHTML =
          "Taux d'hommes <span class='blue'>" +
          ((numberOf[0] / (numberOf[0] + numberOf[2])) * 100).toFixed(2) +
          "%</span>";
        span2.innerHTML =
          "Taux mortalité hommes <span class='red'>" +
          ((numberOf[1] / numberOf[0]) * 100).toFixed(2) +
          "%";
        span3.innerHTML =
          "Taux de femmes <span class='blue'>" +
          ((numberOf[2] / (numberOf[2] + numberOf[0])) * 100).toFixed(2) +
          "%</span>";
        span4.innerHTML =
          "Taux mortalité femmes <span class='red'>" +
          ((numberOf[3] / numberOf[2]) * 100).toFixed(2) +
          "%</span>";
        uniqueLabel.splice(1, 0, "Morts hommes");
        uniqueLabel.splice(3, 0, "Morts femmes");
        let labelArray = ["Hommes", "Femmes"];
        let pieNumber = [
          ((numberOf[1] / totalDeaths) * 100).toFixed(2),
          ((numberOf[3] / totalDeaths) * 100).toFixed(2),
        ];
        drawChart(
          uniqueLabel,
          numberOf,
          "Nombre de passagers",
          "Sexe",
          true,
          "bar",
          "titanicChart",
          "Nombre de passagers",
          "black"
        );
        drawChart(
          labelArray,
          pieNumber,
          "Nombre de passagers",
          "Sexe",
          false,
          "pie",
          "titanicPieChart",
          "% de mortalité totale par sexe",
          ["#3D3D3D", "#C1C1C1"]
        );
      } else if (filter === "Classe") {
        const classeCount = {};
        const numberOfDeaths = {};
        let labelData = [];
        let numberOf = [];
        for (const passenger of passengers) {
          if (passenger.Survived === 0) {
            totalDeaths++;
          }
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
        let pieLabel = ["1ere classe", "2eme classe", "3eme classe"];
        let pieNumber = [
          ((numberOf[1] / totalDeaths) * 100).toFixed(2),
          ((numberOf[3] / totalDeaths) * 100).toFixed(2),
          ((numberOf[5] / totalDeaths) * 100).toFixed(2),
        ];
        let colorArray = ["#3D3D3D", "#C1C1C1", "#868686"];
        drawChart(
          uniqueLabel,
          numberOf,
          "Nombre de passagers",
          "Classe",
          true,
          "bar",
          "titanicChart",
          "Number of passengers",
          "black"
        );
        drawChart(
          pieLabel,
          pieNumber,
          "Nombre de passagers",
          "Classe",
          false,
          "pie",
          "titanicPieChart",
          "% de mortalité totale par classe",
          colorArray
        );
      }
    });
} catch (err) {
  console.log(err);
}
