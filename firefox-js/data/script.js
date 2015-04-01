domain = document.domain;
if (domain.slice(0, 4) == "www.") {
	domain = domain.slice(4, domain.length);
}

if (domain == "8tracks.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("now_playing").getElementsByClassName("t")[0].firstChild.nodeValue;
		} catch (err) { song = null; }
		try {
			artist = document.getElementById("now_playing").getElementsByClassName("a")[0].firstChild.nodeValue;
		} catch (err) { artist = null; }
		try {
			album = document.getElementById("now_playing").getElementsByClassName("detail")[0].firstChild.nodeValue;
		} catch (err) { artist = null; }
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
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "retro.grooveshark.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("np-meta-container").getElementsByClassName("song")[0].firstChild.nodeValue;
		} catch (err) { song = null; }
		try {
			artist = document.getElementById("np-meta-container").getElementsByClassName("artist")[0].firstChild.nodeValue;
		} catch (err) { artist = null; }
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "nightbot.tv") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("currentTitle").firstChild.nodeValue;
		} catch (err) { song = null; }
		artist = null;
		album = null;
		return [song, artist, album];
	}
} else if (domain == "pandora.com") {
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
} else if (domain == "play.google.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("playerSongTitle").firstChild.nodeValue;
		} catch (err) { song = null; }
		try {
			artist = document.getElementById("player-artist").firstChild.nodeValue;
		} catch (err) { artist = null; }
		try {
			album = document.getElementsByClassName("player-artist-album-wrapper")[0].getElementsByClassName("player-album")[0].firstChild.nodeValue;
		} catch (err) { album = null; }
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
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "plug.dj") {
	// TODO: getting banned?
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("now-playing-media").getElementsByClassName("bar-value")[0].childNodes[1].nodeValue;
			song = song.slice(4, song.length);
		} catch (err) { song = null; }
		try {
			artist = document.getElementById("now-playing-media").getElementsByClassName("author")[0].firstChild.nodeValue;
		} catch (err) { artist = null; }
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "soundcloud.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementsByClassName("playbackSoundBadge__title")[0].firstChild.nodeValue;
		} catch (err) { song = null; }
		artist = null; // TODO: get artist
		album = null; // TODO: get album
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