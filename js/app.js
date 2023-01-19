const userSearch = document.querySelector(".userSearch");
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
console.log(userPhoto);
const userAction = async () => {
	const octocat = await fetch("https://api.github.com/users/octocat");
	const octocatJson = await octocat.json();
	console.log(octocatJson);
	const response = await fetch(
		"https://api.github.com/users/" + userSearch.value
	);
	const myJson = await response.json();
	console.log(myJson);
	if (myJson.message == "Not Found") {
		userPhoto.src = octocatJson.avatar_url;
		userName.innerText = octocatJson.name;
	} else {
		if (myJson.name == null) {
			userName.innerText = myJson.login;
		} else {
			userName.innerText = myJson.name;
		}
		userUsername.innerText = "@" + myJson.login;
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

userAction();
