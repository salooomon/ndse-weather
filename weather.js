const http = require('http');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });
const myAPIKey = process.env.myAPIKey;

function getWeather() {
	rl.question('Enter the name of the city \n', (input) => {
		const url = `http://api.weatherapi.com/v1/current.json?key=${myAPIKey}&q=${input}&aqi=yes`
		http.get(url, (res) => {
		const {statusCode} = res
		if(statusCode !== 200) {
			console.log(`statusCode ${statusCode}`, myAPIKey)
			return
		}
		res.setEncoding('utf8');
		let data = '';
		res.on('data', (chunk) => data += chunk);
		res.on('end', () => {
			let parseData = JSON.parse(data);
			console.log(`The weather in ${parseData.location.name} ${parseData.current.temp_c} degrees С and ${parseData.current.temp_f} degrees F`);
		})
		}).on('error', (err) => {
			console.log(err);
		})
		rl.close();
	})
}
getWeather();