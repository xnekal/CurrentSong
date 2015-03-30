domain = document.domain;
if (domain.slice(0, 4) == "www.") {
	domain = domain.slice(4, domain.length);
}

if (domain == "pandora.com") {
	console.log("pandora.com");
	song = document.getElementsByClassName("playerBarSong")[0];
	artist = document.getElementsByClassName("playerBarArtist")[0];
	album = document.getElementsByClassName("playerBarAlbum")[0];
} else if (domain == "grooveshark.com") {
	console.log("grooveshark.com");
	var container = document.getElementById("now-playing-metadata");
	song = container.getElementsByClassName("song")[0];
	artist = container.getElementsByClassName("artist")[0];
	album = null; // TODO: get the album name
}
songValue = "";
artistValue = "";
albumValue = "";

window.setInterval(function(){
	try {
		var change = false;
		if (song != null && songValue != song.innerHTML) {
			change = true;
			songValue = song.innerHTML;
		}
		if (artist != null && artistValue != artist.innerHTML) {
			change = true;
			artistValue = artist.innerHTML;
		}
		if (album != null && albumValue != album.innerHTML) {
			change = true;
			albumValue = album.innerHTML;
		}
		if (change) {
			saveData();
		}
	} catch (err) {console.log("ERROR: "+err)}
}, 5000);

function saveData() {
	var songInfo = [songValue, artistValue, albumValue];
	self.port.emit("songUpdate", songInfo);
}

self.port.on("alert", function(message) {
	window.alert(message);
});