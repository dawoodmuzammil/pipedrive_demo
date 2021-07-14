var express = require('express');
var router = express.Router();
const axios = require('axios');
const moment = require("moment");

const API_URL = "http://connexdigital.pipedrive.com/api/v1/activities";
/* const API_TOKEN =  Removed for security purpose */

const PAOLA_ID = "11765267"; // fetch all users, looked for Paola there
const DELAY_IN_MS = 120000; // 2 * 60 * 1000

/* GET home page. */
router.get('/', async function (req, res, next) {
	var url = `${API_URL}?api_token=${API_TOKEN}&user_id=${PAOLA_ID}`;

	var paola_activities_count1 = await getActivityCount(res, url);
	await delay(5000);
	var paola_activities_count2 = await getActivityCount(res, url);

	var response = getResponse(paola_activities_count1, paola_activities_count2);

	res.send(response);
});

const delay = ms => new Promise(res => setTimeout(res, ms));

async function getActivityCount(res, url) {
	try {
		var response = await axios.get(url);
		var activities = response.data.data;

		return activities.length;
	}
	catch (error) {
		res.send(error);
	}
}

function getResponse(count1, count2) {
	var message = count2 > count1
		? "New activities added for Paola"
		: "No new activities added for Paola";

	return response = {
		time: moment().format('MMMM Do YYYY, h:mm:ss a'),
		message: message
	}
}

module.exports = router;
