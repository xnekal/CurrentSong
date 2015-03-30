CurrentSong
===========
CurrentSong is a Firefox extension that saves the current playing song from pandora.com to a text file. The text file can be used with [OBS](https://obsproject.com), [XSplit](https://www.xsplit.com) or similar software to display the song information in an overlay.

For now CurrentSong only supports pandora.com, but support for more popular music sites will be added.

Supported sites
---------------
+ [pandora.com](http://pandora.com)

Installation
------------
1. Download CurrentSong latest packed version from [here](https://github.com/PacoHobi/CurrentSong/releases/latest) (the file with .xpi extension).
2. Open Firefox and go to the Add-ons Manager.
3. Click on the gear icon > Install Add-on From File...
4. Brose to the Add-on file you downloaded in step 1 and click Open.
5. Click Install now.
6. [Configure CurrentSong](#configuration).

You can download previous releases from [here](https://github.com/PacoHobi/CurrentSong/releases).

#### Development version
You can download the most up to date unpacked version (source code) clicking [here](https://github.com/PacoHobi/CurrentSong/archive/master.zip), you can also download the unpacked version of [previous releases](https://github.com/PacoHobi/CurrentSong/releases).

To be able to use the unpacked version you will need the [Mozilla Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).

Configuration
-------------
You need to configure CurrentSong for it to work properly.

1. Open Firefox and go to the Add-ons Manager.
2. Find CurrentSong in the extensions list and click the Preferences button.
3. Customize _Format_ to your needs.
4. _File_ must be a path to a file with extension `.txt` in an **existing folder**. E.g.:
  * `C:\Users\Paco\Stream\song.txt` is valid if the folder `C:\Users\Paco\Stream\` exists.
  * `C:\Users\Paco\Stream\song` is **not** valid because the file `song` does not have the `.txt` extension.

License
-------
Released under the [MIT License](https://github.com/PacoHobi/CurrentSong/blob/master/LICENSE).
