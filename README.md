![CurrentSong](https://raw.githubusercontent.com/PacoHobi/CurrentSong/master/img/header.png)

CurrentSong is a Firefox extension that writes the current playing song from popular music sites to a text file and a XML file. The text file can be used with [OBS](https://obsproject.com), [XSplit](https://www.xsplit.com) or similar software to display the song information in an overlay. The XML file can be used to add animations to your overlay.

CurrentSong is very lightweight and non-intrusive: once you install and configure it, you can leave it and forget it. CurrentSong will not add any icons or menus to your browser and it will start working automatically when you start Firefox and go to one of the supported websites.

CurrentSong works under Windows, Mac and Linux.

Supported sites
---------------
+ [8tracks.com](http://8tracks.com)
+ [grooveshark.com](http://grooveshark.com)
+ [retro.grooveshark.com](http://retro.grooveshark.com)
+ [nightbot.tv](http://nightbot.tv/autodj)
+ [pandora.com](http://pandora.com)
+ [play.google.com](http://play.google.com/music)
+ [play.spotify.com](http://play.spotify.com)
+ [soundcloud.com](http://soundcloud.com)

CurrentSong is in its early stages, support for more music sites will be added. If you want support for a specific site, please [contact me](mailto:hey@pacohobi.com).

Installation
------------
1. Download CurrentSong latest packed version from [here](https://github.com/PacoHobi/CurrentSong/releases/latest) (the file with `.xpi` extension).
2. If you are running Firefox a dialog should appear asking you to allow the installation, click on Allow and then on Install Now. If the dialog does not appear, follow this steps:
  1. Open Firefox and go to the Add-ons Manager (`Ctrl`+`Shift`+`A`).
  2. Click on the gear icon > Install Add-on From File...
  3. Brose to the Add-on file you downloaded in step 1 and click Open.
  4. Click Install Now.
3. **Important:** Set the folder where the song info will be saved ([configuration](#configuration)).

You can download previous releases from [here](https://github.com/PacoHobi/CurrentSong/tags).

#### Development version
You can download the most up to date unpacked version (source code) clicking [here](https://github.com/PacoHobi/CurrentSong/archive/master.zip), you can also download the unpacked version of [previous releases](https://github.com/PacoHobi/CurrentSong/tags).

To be able to use the unpacked version you will need the [Mozilla Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).

Configuration
-------------
To open CurrentSong's configuration follow this steps:

1. Open Firefox and go to the Add-ons Manager (`Ctrl`+`Shift`+`A`).
2. Find CurrentSong in the extensions list and click the Preferences button.

The text and XML files will be saved in _Folder_ with names `song.txt` and `song.xml`, respectively.

License
-------
Released under the [MIT License](https://github.com/PacoHobi/CurrentSong/blob/master/LICENSE).
