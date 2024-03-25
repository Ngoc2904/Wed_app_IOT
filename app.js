const temperatureChart = new Chart('temperature-chart-canvas', {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Temperature',
        data: [],
        borderColor: '#f44336',
        fill: false,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
  
  const humidityChart = new Chart('humidity-chart-canvas', {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Humidity',
        data: [],
        borderColor: '#2196f3',
        fill: false,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
  
  const voltageChart = new Chart('voltage-chart-canvas', {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Voltage',
        data: [],
        borderColor: '#4caf50',
        fill: false,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
  
  function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }
  
  function updateData(chart, datasetIndex, newData) {
    chart.data.datasets[datasetIndex].data.splice(0, chart.data.datasets[datasetIndex].data.length);
    newData.forEach((data) => {
      chart.data.datasets[datasetIndex].data.push(data);
    });
    chart.update();
  }
  
  // Replace the following code with real-time data from the sensors
  setInterval(() => {
    addData(temperatureChart, new Date().toTimeString().split(' ')[0], Math.random() * 100);
    addData(humidityChart, new Date().toTimeString().split(' ')[0], Math.random() * 100);
    addData(voltageChart, new Date().toTimeString().split(' ')[0], Math.random() * 10);
  }, 5000);
  
  // Fan control
  document.getElementById('fan-toggle').addEventListener('click', () => {
    const fanState = document.getElementById('fan-state');
    fanState.classList.toggle('on');
    fanState.classList.toggle('off');
  
    if (fanState.classList.contains('on')) {
      fanState.innerHTML = '<p>Fan status: On</p>';
      const ceilingContainer = document.querySelector('.ceiling-container');
      ceilingContainer.style.animation = 'spin 6ms linear infinite';
    } else {
      fanState.innerHTML = '<p>Fan status: Off</p>';
      const ceilingContainer = document.querySelector('.ceiling-container');
      ceilingContainer.style.animation = '0s';
    }
  });
  
  document.getElementById('fan-auto').addEventListener('click', () => {
    const fanState = document.getElementById('fan-state');
    fanState.innerHTML = '<p>Fan status: Auto mode</p>';
    fanState.classList.add('auto');
    const ceilingContainer = document.querySelector('.ceiling-container');
      ceilingContainer.style.animation = 'spin 6ms linear infinite';
  });
  const fanState = document.getElementById('fan-state');
  
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
}

  

  