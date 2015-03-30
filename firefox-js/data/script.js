song = document.getElementsByClassName("playerBarSong")[0];
songValue = "";
artist = document.getElementsByClassName("playerBarArtist")[0];
artistValue = "";
album = document.getElementsByClassName("playerBarAlbum")[0];
albumValue = "";

window.setInterval(function(){
	try {
		if (songValue != song.innerHTML || artistValue != artist.innerHTML || albumValue != album.innerHTML) {
			songValue = song.innerHTML;
			artistValue = artist.innerHTML;
			albumValue = album.innerHTML;
			saveData();
		}
	} catch (err) {}
}, 5000);

function saveData() {
	var songInfo = [songValue, artistValue, albumValue];
	self.port.emit("songUpdate", songInfo);
}

self.port.on("alert", function(message) {
	window.alert(message);
});