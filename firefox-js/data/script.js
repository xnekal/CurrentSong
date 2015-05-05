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
} else if (domain == "di.fm") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementsByClassName("track-name")[0].childNodes[2].nodeValue;
		} catch (err) { song = null; }
		try {
			artist = document.getElementsByClassName("track-name")[0].childNodes[1].firstChild.nodeValue.trim();
			artist = artist.slice(0, artist.length-2);
		} catch (err) { artist = null; }
		album = null; // TODO: get album
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
} else if (domain == "iheart.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementsByClassName("player-song")[0].firstChild.nodeValue;
			if (song.trim().length == 0 || song.slice(0,20) == "Thanks for listening") {
				song = songValue;
				artist = artistValue;
			} else {
				try {
					artist = document.getElementsByClassName("player-artist")[0].firstChild.nodeValue;
				} catch (err) { artist = null; }
			}
		} catch (err) { song = null; }
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
			song = song.slice(3, song.length);
		} catch (err) { song = null; }
		try {
			artist = document.getElementById("now-playing-media").getElementsByClassName("author")[0].firstChild.nodeValue;
		} catch (err) { artist = null; }
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "rdio.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementsByClassName("song_title")[0].firstChild.nodeValue;
		} catch (err) { song = null; }
		try {
			artist = document.getElementsByClassName("artist_title")[0].firstChild.nodeValue;
		} catch (err) { artist = null; }
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "songza.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementsByClassName("miniplayer-info-track-title")[0].firstChild.firstChild.nodeValue;
		} catch (err) { song = null; }
		try {
			artist = document.getElementsByClassName("miniplayer-info-artist-name")[0].firstChild.firstChild.nodeValue.slice(3);
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
		song = parseTrack(song);
		artist = song[1];
		song = song[0];
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "themusicninja.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("track_title").getElementsByClassName("title")[0].firstChild.nodeValue;
		} catch (err) { song = null; }
		try {
			artist = document.getElementById("track_title").getElementsByClassName("artist")[0].firstChild.nodeValue;
		} catch (err) { artist = null; }
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "tunein.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("tuner").getElementsByClassName("line1")[0].firstChild.nodeValue;
			if (song.slice(0,10) == "Loading..." || song.slice(0,10) == "Connecting" ||song.slice(0,4) == "Live") {
				song = songValue;
			}
			try {
				artist = document.getElementById("tuner").getElementsByClassName("line2")[0].firstChild.firstChild.nodeValue;
			} catch (err) { artist = artistValue; }
		} catch (err) {
			try {
				song = document.getElementById("tuner").getElementsByClassName("line1")[0].firstChild.firstChild.nodeValue;
				if (song.slice(0,10) == "Loading..." || song.slice(0,10) == "Connecting" ||song.slice(0,4) == "Live") {
					song = songValue;
				}
				try {
					artist = document.getElementById("tuner").getElementsByClassName("line2")[0].firstChild.firstChild.nodeValue;
				} catch (err) { artist = artistValue; }
			} catch (err) { song = songValue; }
		}
		
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "vk.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("ac_title").firstChild.nodeValue;
		} catch (err) {
			try {
				song = document.getElementById("gp_title").firstChild.nodeValue;
			} catch (err) { song = null; }
		}
		try {
			artist = document.getElementById("ac_performer").firstChild.nodeValue;
		} catch (err) {
			try {
				artist = document.getElementById("gp_performer").firstChild.nodeValue;
			} catch (err) { artist = null; }
		}
		album = null; // TODO: get album
		return [song, artist, album];
	}
} else if (domain == "youtube.com") {
	getInfo = function() {
		var song, artist, album;
		try {
			song = document.getElementById("eow-title").firstChild.nodeValue;
		} catch (err) { song = null; }
		song = parseTrack(song);
		artist = song[1];
		song = song[0];
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
		if (newSong != songValue || newArtist != artistValue || newAlbum != albumValue) {
			songValue = newSong;
			artistValue = newArtist;
			albumValue = newAlbum;
			saveData();
		}
	} catch (err) {}
}, interval);

function saveData() {
	var songInfo = [songValue, artistValue, albumValue];
	self.port.emit("songUpdate", songInfo);
}

self.port.on("alert", function(message) {
	window.alert(message);
});

function parseTrack(track) {
	if (self.options.preferences.parseTrack) {
		if (track.indexOf(" - ") != -1) {
			return track.split(" - ", 2).reverse();
		}
	}
	return [track, null];
}