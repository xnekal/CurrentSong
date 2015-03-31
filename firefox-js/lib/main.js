const {Cu} = require("chrome");
const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});

var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var preferences = require("sdk/simple-prefs").prefs;
var worker;


pageMod.PageMod({
    include: [
        "*.pandora.com",
        "*.grooveshark.com",
        "*.play.spotify.com"],
    contentScriptFile: self.data.url("script.js"),
    contentScriptWhen: "ready",
    onAttach: startListening
});

function startListening(w) {
    worker = w;
    worker.port.on("songUpdate", function(songInfo) {
        console.log("EVENT RECEIVED: songUpdate");
        saveDataIfValidFile(songInfo);
    });
}

function saveData(file, songInfo) {
    let song   = songInfo[0] != null ? songInfo[0] : "";
    let artist = songInfo[1] != null ? songInfo[1] : "";
    let album  = songInfo[2] != null ? songInfo[2] : "";

    let text = preferences.infoFormat;
    if (song.length != 0 || artist.length != 0 || album.length != 0) {
        // text file
        text = text.replace("%song%", song);
        text = text.replace("%artist%", artist);
        text = text.replace("%album%", album);

        let encoder = new TextEncoder();
        let array = encoder.encode(text);
        let promise = OS.File.writeAtomic(file, array);

        // xml file
        text = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n" +
            "<event>\n" +
                "    <song>" + song + "</song>\n" +
                "    <artist>" + artist + "</artist>\n" +
                "    <album>" + album + "</album>\n" +
            "</event>";

        file = file.slice(0, file.length - 4) + ".xml";
        encoder = new TextEncoder();
        array = encoder.encode(text);
        promise = OS.File.writeAtomic(file, array);
    }
}

function saveDataIfValidFile(songInfo) {
    let file = preferences.saveFile;

    let promise = OS.File.stat(file);
    promise = promise.then(
        function onSuccess(stat) {
            if (stat.isDir) {
                // The path represents a directory
                worker.port.emit("alert", "CurrentSong error:\nThe selected file is a directory.\n" + file);
            } else {
                // The path represents a file, not a directory
                if (!file.endsWith(".txt")) {
                    worker.port.emit("alert", "CurrentSong error:\nThe selected file must end in '.txt'.\n" + file);
                } else {
                    // All correct, save data
                    saveData(file, songInfo);
                }
            }
        },
        function onFailure(reason) {
            if (reason instanceof OS.File.Error && reason.becauseNoSuchFile) {
                // The file does not exist
                if (!file.endsWith(".txt")) {
                    worker.port.emit("alert", "CurrentSong error:\nThe selected file must end in '.txt'.\n" + file);
                } else {
                    // All correct, save data
                    saveData(file, songInfo);
                }
            } else {
                // Some other error
                worker.port.emit("alert", "CurrentSong error:\n" + reason);
            }
        }
    );
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}