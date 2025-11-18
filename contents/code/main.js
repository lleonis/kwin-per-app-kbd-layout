workspace.windowActivated.connect(function (effectWindow) {
    if (!effectWindow) return;

    const altLayoutApps = ['org.kde.konsole', 'code-oss'];
    let layout = "0"; // default layout
    if(altLayoutApps.indexOf(effectWindow.resourceClass) != -1) {
        layout = "1"; // alternate layout
    }

    // setLayout is better, but buggy callDBus can't pass uint arg (#486024)
    callDBus(
        "org.kde.keyboard",
        "/Layouts",
        "org.kde.KeyboardLayouts",
        "getLayout",
        function(oldLayout) {
            if(oldLayout != layout) {
                callDBus(
                    "org.kde.keyboard",
                    "/Layouts",
                    "org.kde.KeyboardLayouts",
                    "switchToNextLayout",
                );
            }
        }
    );
});
