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

  //MQTT_INIT
var temperature;
var humidity;
var voltage;
var fan_on;
var fan_off;
var mode_auto;
var ota;
const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt');
client.on('connect', () => {
  console.log('Connected to MQTT broker!');
  client.subscribe('topic/iot1.1', (err) => {
    if (err) {
      console.error('Error subscribing to topic:', err);
    } else {
      console.log('Subscribed to topic/iot1.1');
    }
  });
});

client.on('message', (topic, message) => {

  console.log('Received message:', message.toString(), 'on topic:', topic);
  var data = JSON.parse(message);
  
   temperature = data.Temperature;
  humidity = data.Humidity;
  voltage = data.Voltage;
  fan_on=data.fan_on;
  fan_off=data.fan_off;
  mode_auto=data.mode;
ota=data.OTA;
 console.log("Temperature:", temperature);
 console.log("Humidity:", humidity);
 console.log("Voltage:", voltage);
 console.log("fan_on:", fan_on);
 console.log("fan_off:", fan_off);
 console.log("mode_auto:", mode_auto);
 console.log("ota:", ota);
 document.getElementById('temperature').innerText = temperature + "°C";
 document.getElementById('humidity').innerText = humidity + "%";
 document.getElementById('voltage').innerText = voltage + "V";
});
//PROCESS
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
    addData(temperatureChart, new Date().toTimeString().split(' ')[0], temperature);
    addData(humidityChart, new Date().toTimeString().split(' ')[0], humidity);
    addData(voltageChart, new Date().toTimeString().split(' ')[0], voltage);
  }, 10000);
  
  // Fan control
  document.getElementById('fan-toggle').addEventListener('click', () => {
    const fanState = document.getElementById('fan-state');
    fanState.classList.toggle('on');
    fanState.classList.toggle('off');
   
    if (fanState.classList.contains('on')) {
      client.publish('topic/data', "fanon",(err) => {
        if (err) {
          console.error('Error publishing message:', err);
        } else {
          console.log('Published message to topic/data');
        }
      });
      if(fan_on=true){
      fanState.innerHTML = '<p>Fan status: On</p>';
      const ceilingContainer = document.querySelector('.ceiling-container');
      ceilingContainer.style.animationDuration= 0.5+"s";
      }
   
    } else {
      client.publish('topic/data', "fanoff", (err) => {
        if (err) {
          console.error('Error publishing message:', err);
        } else {
          console.log('Published message to topic/data');
        }
      });
      client.publish('topic/data', "fanoff", (err) => {
        if (err) {
          console.error('Error publishing message:', err);
        } else {
          console.log('Published message to topic/data');
        }
      });
    if(fan_off=true){
      fanState.innerHTML = '<p>Fan status: Off</p>';
      const ceilingContainer = document.querySelector('.ceiling-container');
      ceilingContainer.style.animation = 'spin 0ms linear infinite'; 
     
      function countTime() {
      seconds++; 
       console.log(seconds + " giây đã trôi qua.");
      }
      var timer = setInterval(countTime, 1000);
      setTimeout(function() {
        clearInterval(timer); 
         console.log("Đã đủ 60 giây. FAN Auto ");
         client.publish('topic/data', "mode_on", (err) => {
          if (err) {
            console.error('Error publishing message:', err);
          } else {
            console.log('Published message to topic/data');
          }
        });
        console.log("Đã đủ 60 giây. FAN Auto ");
        client.publish('topic/data', "mode_on", (err) => {
         if (err) {
           console.error('Error publishing message:', err);
         } else {
           console.log('Published message to topic/data');
         }
       });
        if(fan_on=true){
          fanState.innerHTML = '<p>Fan status: Auto </p>';
          const ceilingContainer = document.querySelector('.ceiling-container');
          ceilingContainer.style.animation = 'spin 6ms linear infinite';
          }
    }, 10000);
    }

  }
  });
  
  document.getElementById('fan-auto').addEventListener('click', () => {
    const fanState = document.getElementById('fan-state');
    client.publish('topic/data', "mode_on", (err) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Published message to topic/data');
      }
    });
    if(mode_auto=true){
    fanState.innerHTML = '<p>Fan status: Auto </p>';
    fanState.classList.add('auto');
    const ceilingContainer = document.querySelector('.ceiling-container');
      ceilingContainer.style.animation = 'spin 8ms linear infinite';
    }
  }); 
  document.getElementById('OTA').addEventListener('click', () => {
    const fanState = document.getElementById('OTA');
    client.publish('topic/data', "0ta", (err) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Published message totopic/data');
      }
    });
    if(ota=true){
    fanState.innerHTML = '<p2>Firmware Updatesuccessful</p2>';
    }
  }); 

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
  var data=slider.value;
  var data_fan=(101-data)/60;
  const ceilingContainer = document.querySelector('.ceiling-container');
  ceilingContainer.style.animationDuration= data_fan+"s";
  client.publish('topic/data',data.toString(), (err) => {
    if (err) {
      console.error('Error publishing message:', err);
    } else {
      console.log('Published message to topic/data');
    }
  });
}