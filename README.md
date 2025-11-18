# kwin-per-app-kbd-layout
KWin script to work around per-app keyboard layout switching bugs

This KWin script mitigates a bug present on KDE wayland:
https://bugs.kde.org/show_bug.cgi?id=412101

Also working around KDE bug `#486024` about `callDbus` not passing arguments properly:
https://bugs.kde.org/show_bug.cgi?id=486024

Use case: you have one keyboard layout set as default but you want to use an alternate layout for specific apps. I prefer to use my local layout in most apps where I write in my local language but need `us` layout for console and IDE, because my local layout has terrible placement for the symbols often used in programming. On KDE X11 you can set layout switching to per-app ('All windows of current application') and switch to your preferred layout in the apps in question, this will be remembered across reboots. But on Wayland, there is a bug which causes KDE to reset keyboard layout to the default one. Since Wayland is default on KDE and X11 development is diminishing, this might affect a number of people. I got tired of switching layouts every time and hacked this script together.

How to use: set up KDE to have the two desired layouts. Leave switching on 'All Windows' setting. Clone this repo under ~/.local/share/kwin/scripts. Adjust `altLayoutApps` in `contents/code/main.js` to your needs. Restart KDE (or just kwin) and enable the new KWin script.

How does it work? This script is run by kwin every time a window is activated. The script checks if the window is on the pre-defined list, and calls `switchToNextLayout` over dbus whenever needed.
