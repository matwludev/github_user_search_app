const userSearch = document.querySelector(".user__searchInput");
const userPhoto = document.querySelector(".info__userPhoto");
const userName = document.querySelector(".info__userName");
const userUsername = document.querySelector(".info__userUsername");
const userJoinedDay = document.querySelector(".info__userJoinedDay");
const userJoinedMonth = document.querySelector(".info__userJoinedMonth");
const userJoinedYear = document.querySelector(".info__userJoinedYear");
const userBio = document.querySelector(".info__userBio");
const userRepos = document.querySelector(".info__userRepos");
const userFollowers = document.querySelector(".info__userFollowers");
const userFollowing = document.querySelector(".info__userFollowing");
const userLocation = document.querySelector(".info__userLocation");
const userWebsite = document.querySelector(".info__userWebsite");
const userTwitter = document.querySelector(".info__userTwitter");
const userCompany = document.querySelector(".info__userCompany");
const searchButton = document.querySelector(".user__searchBtn");
const bodyTheme = document.querySelector("body");
const themeBtn = document.querySelector(".header__switchThemeBtn");

window.onload = () => {
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		bodyTheme.classList.add("dark-theme");
		bodyTheme.classList.remove("light-theme");
		themeBtn.innerText = "light";
	} else {
		bodyTheme.classList.add("light-theme");
		bodyTheme.classList.remove("dark-theme");
		themeBtn.innerText = "dark";
	}
};
const catLoader = async () => {
	const octocat = await fetch("https://api.github.com/users/octocat");
	const octocatJson = await octocat.json();
	const response = await fetch(
		"https://api.github.com/users/" + userSearch.value
	);
	const myJson = await response.json();
	const date = new Date(octocatJson.created_at);
	userSearch.value = "";
	userPhoto.src = octocatJson.avatar_url;
	userName.innerText = octocatJson.name;
	userUsername.innerText = octocatJson.login;
	userJoinedDay.innerText = date.toLocaleString("en", { day: "numeric" }) + " ";
	userJoinedMonth.innerText =
		date.toLocaleString("en", { month: "short" }) + " ";
	userJoinedYear.innerText = date.toLocaleString("en", { year: "numeric" });
	octocatJson.bio == null
		? (userBio.innerText = "This profile has no bio")
		: (userBio.innerText = octocatJson.bio);
	userRepos.innerText = octocatJson.public_repos;
	userFollowers.innerText = octocatJson.followers;
	userFollowing.innerText = octocatJson.following;
	userLocation.innerText = octocatJson.location;
	userWebsite.innerText = octocatJson.blog;
	octocatJson.twitter_username == null
		? (userTwitter.innerText = "Not Available")
		: (userTwitter.innerText = octocatJson.twitter_username);
	userCompany.innerText = octocatJson.company;
};

catLoader();
searchButton.onclick = () => {
	const userFinder = async () => {
		const response = await fetch(
			"https://api.github.com/users/" + userSearch.value
		);
		const myJson = await response.json();
		console.log(myJson);
		const date = new Date(myJson.created_at);
		if (myJson.message == "Not Found") {
			alert("No user!");
		} else {
			userPhoto.src = myJson.avatar_url;
			if (myJson.name == null) {
				userName.innerText = myJson.login;
			} else {
				userName.innerText = myJson.name;
			}
			userUsername.innerText = "@" + myJson.login;
			userJoinedDay.innerText =
				date.toLocaleString("en", { day: "numeric" }) + " ";
			userJoinedMonth.innerText =
				date.toLocaleString("en", { month: "short" }) + " ";
			userJoinedYear.innerText = date.toLocaleString("en", { year: "numeric" });
			if (myJson.bio == null) {
				userBio.innerText = "This profile has no bio";
			} else {
				userBio.innerText = myJson.bio;
			}
			userRepos.innerText = myJson.public_repos;
			userFollowers.innerText = myJson.followers;
			userFollowing.innerText = myJson.following;
			if (myJson.location == null) {
				userLocation.innerText = "Not Available";
			} else {
				userLocation.innerText = myJson.location;
			}
			if (myJson.blog == null) {
				userWebsite.innerText = "Not Available";
			} else {
				userWebsite.innerText = myJson.blog;
			}
			if (myJson.Twitter == null) {
				userTwitter.innerText = "Not Available";
			} else {
				userTwitter.innerText = myJson.twitter_username;
			}
			if (myJson.company == null) {
				userCompany.innerText = "Not Available";
			} else {
				userCompany.innerText = myJson.company;
			}
		}
	};
	userFinder();
};

themeBtn.onclick = () => {
	if (themeBtn.innerText == "dark") {
		bodyTheme.classList.remove("light-theme");
		bodyTheme.classList.add("dark-theme");
		themeBtn.innerText = "light";
	} else {
		bodyTheme.classList.remove("dark-theme");
		bodyTheme.classList.add("light-theme");
		themeBtn.innerText = "dark";
	}
};
