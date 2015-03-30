const {Cu} = require("chrome");
const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});

var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var preferences = require("sdk/simple-prefs").prefs;
var worker;


pageMod.PageMod({
    include: ["*.pandora.com", "*.grooveshark.com"],
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
    let song   = songInfo.length > 0 ? songInfo[0] : "";
    let artist = songInfo.length > 1 ? songInfo[1] : "";
    let album  = songInfo.length > 2 ? songInfo[2] : "";

    let text = preferences.infoFormat;
    if (song.length != 0 || artist.length != 0 || album.length != 0) {
        text = text.replace("%song%", songInfo[0]);
        text = text.replace("%artist%", songInfo[1]);
        text = text.replace("%album%", songInfo[2]);

        let encoder = new TextEncoder();
        let array = encoder.encode(text);
        let promise = OS.File.writeAtomic(file, array);   
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