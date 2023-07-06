const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "Alone",
		emblem: "Life Is Better With Music ",
		"bg-color": ["#0d1a27", "#0D1827"],
		"accent-color": "#ffffff",
		url: "https://i1.sndcdn.com/artworks-000324193000-9thla1-t500x500.jpg",
		spotify:
			"https://open.spotify.com/embed/track/3MEYFivt6bilQ9q9mFWZ4g?utm_source=generator"
	},
    {
		album: "Let-Me X Mello",
		emblem: "Life Is Better With Music",
		"bg-color": ["#61322f", "#0d0b38"],
		"accent-color": "#ebeae6",

		url:
			"https://cdn.globaldanceelectronic.com/wp-content/uploads/2016/12/Screen-Shot-2016-12-02-at-1.37.34-AM.png",
		spotify:
			"https://open.spotify.com/embed/track/6Hx9gLuAKkOfoZoL79OSI1?utm_source=generator"
	},
	{
		album: "Chasing Stars",
		emblem: "Life is better with music",
		"bg-color": ["#f687ff", "#7bc1d1"],
		"accent-color": "#f687ff",
		url: "https://4.bp.blogspot.com/-UR_o1zK175s/WLGMiK3Y9_I/AAAAAAAArzI/4Gd4wrrSpXc_9xB80xJbjm5lopEdKA5_wCLcB/s1600/marshmello.jpg",
		spotify:
			"https://open.spotify.com/embed/track/6y6xhAgZjvxy5kR5rigpY3?utm_source=generator"
	},
	{
		album: "Wolves",
		emblem: "Life is better with music",
		"bg-color": ["#041438", "#3a435e"],
		"accent-color": "#3a435e",
		url:
			"https://i.ytimg.com/vi/cH4E_t3m3xM/maxresdefault.jpg",
		spotify:
			"https://open.spotify.com/embed/track/0tBbt8CrmxbjRP0pueQkyU?utm_source=generator"
	},
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};
let index = 0;

const updateDisplay = (index) => {
	let DELIMITER = "";

	const album = albums[index];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = index + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (index === 3) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);
 