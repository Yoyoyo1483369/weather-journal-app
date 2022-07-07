/* Global Variables */

const apiKey = '&appid=6e75fdeec60f2ed0278c8b50c63c1cc5&units=imperial';
// const baseURL = 'https://api.openweathermap.org/data/2.5/weather?id=';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
console.log(d);

// Chaining Promises

document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
  const newZipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getTemp(baseURL, newZipCode, apiKey).then(function (data) {
    console.log(data);
    console.log(data.main);
    postData('/add', {
      city: data.name + '.',
      date: newDate + '.',
      temp: data.main.temp,
      content: content + '.',
    });

    retrieveData();
  });
  // .then(retrieveData())
}

const getTemp = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// POST Route

const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// dynamic (after feedback)

const retrieveData = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('temp').innerHTML =
      'Temperature: ' + Math.round(allData.temp) + ' degrees.';
    document.getElementById('content').innerHTML = 'I feel ' + allData.content;
    document.getElementById('date').innerHTML = 'Date: ' + allData.date;
    document.getElementById('city').innerHTML = 'City: ' + allData.city;
  } catch (error) {
    console.log('"error"', error);
  }
};

/***** An example of the data returned from API (New York City) ****/
// const v = {
//   coord: { lon: -73.9967, lat: 40.7484 },
//   weather: [
//     { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' },
//   ],
//   base: 'stations',
//   main: {
//     temp: 71.28,
//     feels_like: 71.76,
//     temp_min: 68.79,
//     temp_max: 74.23,
//     pressure: 1014,
//     humidity: 78,
//   },
//   visibility: 10000,
//   wind: { speed: 18.99, deg: 169, gust: 25.01 },
//   clouds: { all: 100 },
//   dt: 1655064315,
//   sys: {
//     type: 2,
//     id: 2009754,
//     country: 'US',
//     sunrise: 1655025856,
//     sunset: 1655080056,
//   },
//   timezone: -14400,
//   id: 0,
//   name: 'New York',
//   cod: 200,
// };

// dynamic (before feedback)

// const retrieveData = async () => {
//   const request = await fetch('/all');
//   try {
//     const allData = await request.json();
//     console.log(allData);
//     const numOfOperations = Object.keys(allData).length - 1;
//     console.log(numOfOperations);
//     document.getElementById('temp').innerHTML =
//       Math.round(allData[`${numOfOperations}`].temp) + ' degrees.';
//     document.getElementById('content').innerHTML =
//       allData[`${numOfOperations}`].content;
//     document.getElementById('date').innerHTML =
//       allData[`${numOfOperations}`].date;
//   } catch (error) {
//     console.log('"error"', error);
//   }
// };
