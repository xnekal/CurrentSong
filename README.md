CurrentSong
===========
CurrentSong is a Firefox extension that writes the current playing song from popular music sites to a text file and a XML file. The text file can be used with [OBS](https://obsproject.com), [XSplit](https://www.xsplit.com) or similar software to display the song information in an overlay. The XML file can be used to add animations to your overlay.

CurrentSong is very lightweight and non-intrusive: once you install and configure it, you can leave it and forget it. CurrentSong will not add any icons or menus to your browser and it will start working automatically when you start Firefox and go to one of the supported websites.

CurrentSong works under Windows, Mac and Linux.

Supported sites
---------------
+ [grooveshark.com](http://grooveshark.com)
+ [pandora.com](http://pandora.com)
+ [play.spotify.com](http://play.spotify.com)

CurrentSong is in its early stages, support for more music sites will be added. If you want support for a specific site, please [contact me](mailto:hey@pacohobi.com).

Installation
------------
1. Download CurrentSong latest packed version from [here](https://github.com/PacoHobi/CurrentSong/releases/latest) (the file with `.xpi` extension).
2. Open Firefox and go to the Add-ons Manager (`Ctrl`+`Shift`+`A`).
3. Click on the gear icon > Install Add-on From File...
4. Brose to the Add-on file you downloaded in step 1 and click Open.
5. Click Install now.
6. **Important:** Set the folder where the song info will be saved ([configuration](#configuration)).

You can download previous releases from [here](https://github.com/PacoHobi/CurrentSong/releases).

#### Development version
You can download the most up to date unpacked version (source code) clicking [here](https://github.com/PacoHobi/CurrentSong/archive/master.zip), you can also download the unpacked version of [previous releases](https://github.com/PacoHobi/CurrentSong/releases).

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
