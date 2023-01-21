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
const searchError = document.querySelector(".user__searchNotFound");

window.onload = () => {
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		bodyTheme.classList.add("dark-theme");
		bodyTheme.classList.remove("light-theme");
		themeBtn.innerText = "LIGHT";
	} else {
		bodyTheme.classList.add("light-theme");
		bodyTheme.classList.remove("dark-theme");
		themeBtn.innerText = "DARK";
	}
};

const catLoader = async () => {
	const octocat = await fetch("https://api.github.com/users/octocat");
	const octocatJson = await octocat.json();
	console.log(octocatJson);
	const date = new Date(octocatJson.created_at);
	const company = octocatJson.company.substring(1);

	userSearch.value = "";
	userPhoto.src = octocatJson.avatar_url;
	userName.innerText = octocatJson.name;
	userUsername.innerText = "@" + octocatJson.login;
	userJoinedDay.innerText = date.toLocaleString("en", { day: "numeric" }) + " ";
	userJoinedMonth.innerText =
		date.toLocaleString("en", { month: "short" }) + " ";
	userJoinedYear.innerText = date.toLocaleString("en", { year: "numeric" });
	octocatJson.bio == null
		? ((userBio.innerText = "This profile has no bio"),
		  userBio.classList.add("noBio"))
		: (userBio.innerText = octocatJson.bio);
	userRepos.innerText = octocatJson.public_repos;
	userFollowers.innerText = octocatJson.followers;
	userFollowing.innerText = octocatJson.following;
	userLocation.innerText = octocatJson.location;
	userWebsite.innerText = octocatJson.blog;
	userWebsite.href = octocatJson.blog;
	octocatJson.twitter_username == null
		? ((userTwitter.innerText = "Not Available"),
		  userTwitter.parentElement.classList.add("noData"),
		  (userTwitter.href = "javascript:void(0)"))
		: ((userTwitter.innerText = octocatJson.twitter_username),
		  (userTwitter.href =
				"https://twitter.com/" + octocatJson.twitter_username));
	userCompany.innerText = octocatJson.company;
	userCompany.href = "https://github.com/" + company;
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

		if (userSearch.value == "") {
			alert("Empty username!");
		} else if (myJson.message == "Not Found") {
			searchError.style.display = "inline-block";
		} else {
			searchError.style.display = "none";
			userPhoto.src = myJson.avatar_url;
			myJson.name == null
				? (userName.innerText = myJson.login)
				: (userName.innerText = myJson.name);

			userUsername.innerText = "@" + myJson.login;
			userJoinedDay.innerText =
				date.toLocaleString("en", { day: "numeric" }) + " ";
			userJoinedMonth.innerText =
				date.toLocaleString("en", { month: "short" }) + " ";
			userJoinedYear.innerText = date.toLocaleString("en", { year: "numeric" });
			myJson.bio == null
				? ((userBio.innerText = "This profile has no bio"),
				  userBio.classList.add("noBio"))
				: ((userBio.innerText = myJson.bio), userBio.classList.remove("noBio"));

			userRepos.innerText = myJson.public_repos;
			userFollowers.innerText = myJson.followers;
			userFollowing.innerText = myJson.following;
			myJson.location == null || myJson.location == ""
				? ((userLocation.innerText = "Not Available"),
				  userLocation.parentElement.classList.add("noData"))
				: ((userLocation.innerText = myJson.location),
				  userLocation.parentElement.classList.remove("noData"));

			myJson.blog == null || myJson.blog == ""
				? ((userWebsite.innerText = "Not Available"),
				  userWebsite.parentElement.classList.add("noData"),
				  (userWebsite.href = "javascript:void(0)"))
				: ((userWebsite.innerText = myJson.blog),
				  userWebsite.parentElement.classList.remove("noData"),
				  (userWebsite.href = myJson.blog));

			myJson.twitter_username == null || myJson.twitter_username == ""
				? ((userTwitter.innerText = "Not Available"),
				  userTwitter.parentElement.classList.add("noData"),
				  (userTwitter.href = "javascript:void(0)"))
				: ((userTwitter.innerText = myJson.twitter_username),
				  userTwitter.parentElement.classList.remove("noData"),
				  (userTwitter.href =
						"https://twitter.com/" + myJson.twitter_username));

			myJson.company == null || myJson.company == ""
				? ((userCompany.innerText = "Not Available"),
				  userCompany.parentElement.classList.add("noData"),
				  (userCompany.href = "javascript:void(0)"))
				: ((userCompany.innerText = myJson.company),
				  userCompany.parentElement.classList.remove("noData"),
				  (userCompany.href =
						"https://github.com/" + myJson.company.substring(1)));
		}
	};
	userFinder();
};

themeBtn.onclick = () => {
	if (themeBtn.innerText == "DARK") {
		bodyTheme.classList.remove("light-theme");
		bodyTheme.classList.add("dark-theme");
		themeBtn.innerText = "LIGHT";
	} else {
		bodyTheme.classList.remove("dark-theme");
		bodyTheme.classList.add("light-theme");
		themeBtn.innerText = "DARK";
	}
};
