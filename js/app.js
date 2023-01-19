const userSearch = document.querySelector(".user__searchInput");
const userPhoto = document.querySelector(".user__photo");
const userName = document.querySelector(".user__name");
const userUsername = document.querySelector(".user__userName");
const userJoined = document.querySelector(".user__joined");
const userBio = document.querySelector(".user__bio");
const userRepos = document.querySelector(".user__repos");
const userFollowers = document.querySelector(".user__followers");
const userFollowing = document.querySelector(".user__following");
const userLocation = document.querySelector(".user__location");
const userWebsite = document.querySelector(".user__website");
const userTwitter = document.querySelector(".user__twitter");
const userCompany = document.querySelector(".user__company");
const searchButton = document.querySelector(".user__searchBtn");
console.log(userPhoto);
const catLoader = async () => {
	const octocat = await fetch("https://api.github.com/users/octocat");
	const octocatJson = await octocat.json();
	console.log(octocatJson);
	const response = await fetch(
		"https://api.github.com/users/" + userSearch.value
	);
	const myJson = await response.json();
	const date = new Date(octocatJson.created_at);
	console.log(myJson);
	userSearch.value = "";
	userPhoto.src = octocatJson.avatar_url;
	userName.innerText = octocatJson.name;
	userUsername.innerText = octocatJson.login;
	userJoined.innerText = date.toDateString();
	octocatJson.bio == null
		? (userBio.innerText = "No Bio")
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
			userJoined.innerText = date.toDateString();
			if (myJson.bio == null) {
				userBio.innerText = "No Bio";
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
