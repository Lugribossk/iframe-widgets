/**
 * Setup:
 * 1. Click the stage in the Elements panel.
 * 2. In the Properties panel, uncheck autoplay.
 * 3. Open the actions for the stage ({} icon) and add a "compositionReady" event.
 * 4. Copy-paste the code below into the event.
 */
/*global window, com, sym*/
(function () {
    "use strict";

    var node = window.document.createElement("script");
    node.type = "text/javascript";
    node.src = "//cdn-secure-api-viewer-a.eu.zmags.com/widgets/iframe.js";
    node.onload = function () {
        var Iframe = com.zmags.api.widget.Iframe;

        Iframe.addEventListener(Iframe.IFRAME_WIDGET_ACTIVATE, function () {
            sym.play();
        });

        Iframe.addEventListener(Iframe.IFRAME_WIDGET_DEACTIVATE, function () {
            sym.seek(0);
        });
    };

    var ref = window.document.getElementsByTagName("script")[0];
    ref.parentNode.insertBefore(node, ref);
}());