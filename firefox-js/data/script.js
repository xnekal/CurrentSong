domain = document.domain;
if (domain.slice(0, 4) == "www.") {
	domain = domain.slice(4, domain.length);
}

if (domain == "pandora.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementsByClassName("playerBarSong")[0].firstChild.nodeValue;
		} catch (err) { song = null; }
		try {
			artist = document.getElementsByClassName("playerBarArtist")[0].firstChild.nodeValue;
		} catch (err) { artist = null; }
		try {
			album = document.getElementsByClassName("playerBarAlbum")[0].firstChild.nodeValue;
		} catch (err) { album = null; }
		return [song, artist, album];
	}
} else if (domain == "grooveshark.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("now-playing-metadata").getElementsByClassName("song")[0].firstChild.nodeValue;
		} catch (err) { song = null; }
		try {
			artist = document.getElementById("now-playing-metadata").getElementsByClassName("artist")[0].firstChild.nodeValue;
		} catch (err) { artist = null; }
		album = null; // TODO: get album name
		return [song, artist, album];
	}
} else if (domain == "play.spotify.com") {
	getInfo = function() {
		var song, artist = [], album;
		try {
			song = document.getElementById("app-player").contentWindow.document.getElementById("track-name").childNodes[0].firstChild.nodeValue;
			if (song == " ") song = null;
		} catch (err) { song = null; }
		try {
			var artists = document.getElementById("app-player").contentWindow.document.getElementById("track-artist").getElementsByTagName("a");
			var i;
			for (i=0; i<artists.length; i++) {
				artist.push(artists[i].firstChild.nodeValue);
			}
			artist = artist.join(", ");
		} catch (err) { artist = null; }
		album = null; // TODO: get album name
		return [song, artist, album];
	}
}

songValue = null;
artistValue = null;
albumValue = null;

interval = self.options.preferences.interval;
interval = interval > 0 ? 1000*interval : 5000;
window.setInterval(function(){
	try {
		var songInfo = getInfo();
		var newSong = songInfo[0], newArtist = songInfo[1], newAlbum = songInfo[2];
		// var newSong = getSong(), newArtist = getArtist(), newAlbum = getAlbum();
		if (newSong != songValue || newArtist != artistValue || newAlbum != albumValue) {
			songValue = newSong;
			artistValue = newArtist;
			albumValue = newAlbum;
			saveData();
		}
	} catch (err) {console.log("ERROR: "+err)}
}, interval);

function saveData() {
	var songInfo = [songValue, artistValue, albumValue];
	self.port.emit("songUpdate", songInfo);
}

self.port.on("alert", function(message) {
	window.alert(message);
});