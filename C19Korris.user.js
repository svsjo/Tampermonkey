// ==UserScript==
// @name         C19 Korris WInkel
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://dep19.die-staemme.de/*screen=map*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=die-staemme.de
// @grant        none
// @updateURL    https://github.com/svsjo/Tampermonkey/raw/main/C19Korris.user.js
// @downloadURL  https://github.com/svsjo/Tampermonkey/raw/main/C19Korris.user.js
// ==/UserScript==

var win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

win.$.getScript("https://shinko-to-kuma.com/scripts/mapSdk.js", function() {
    if (win.MapSdk) {
        console.error("MapSdk ist verfügbar.");
        addLinesToMap();
        win.MapSdk.mapOverlay.reload();
    } else {
        console.error("MapSdk ist nicht verfügbar.");
    }
});

function addLinesToMap(){
    addPolygon(487, 12, 580, 30, "Keks", "blue", 0);
    addPolygon(474, 12, 580, 30, "Motz", "blue", 0);

    addPolygon(461, 12, 580, 30, "Lorenzo", "blue", 5);
    addPolygon(448, 12, 580, 30, "Maple", "yellow", 10);
    addPolygon(435, 12, 575, 30, "Pippi", "blue", 15);
    addPolygon(430, 12, 565, 30, "Liz Keen", "blue", 45);
    addPolygon(425, 12, 552, 30, "Tik", "blue", 75);
    addPolygon(420, 12, 539, 30, "Alex", "blue", 80);
    addPolygon(420, 12, 526, 30, "Alexander", "blue", 85);

    addPolygon(420, 12, 513, 30, "Fear", "blue", 90);
    addPolygon(420, 12, 500, 30, "Bergi", "blue", 90);

    addPolygon(420, 10, 489, 30, "Drizzt", "blue", 90);
    addPolygon(420, 10, 478, 30, "Riddle", "blue", 90);

    addPolygon(420, 10, 467, 30, "Oberlin", "blue", 95);
    addPolygon(422, 10, 456, 30, "sharkbit", "blue", 100);
    addPolygon(427, 10, 446, 30, "Afrax", "blue", 110);
    addPolygon(433, 10, 438, 30, "amrita", "blue", 120);

    addPolygon(440, 10, 430, 30, "Steinfaust", "blue", 135);

    addPolygon(448, 10, 424, 30, "Beer", "blue", 150);
    addPolygon(457, 10, 418, 30, "carsten", "blue", 160);
    addPolygon(466, 10, 412, 30, "olla", "blue", 170);
    addPolygon(477, 10, 410, 30, "Thorgean", "blue", 175);

    addPolygon(488, 10, 410, 30, "Exxez", "blue", 180);
    addPolygon(499, 10, 410, 30, "lemme", "blue", 180);
}

function addPolygon(x1, width, y1, height, player, color, rotation){
    // Konvertiere Grad in Radiant
    var rad = rotation * Math.PI / 180;

    // Startpunkt
    var p1 = {x: x1, y: y1};
    var p2 = rotatePoint(x1 + width, y1, x1, y1, rad); // var p2 = {x: x1 + width, y: y1};
    var p3 = rotatePoint(x1 + width, y1 + height, x1, y1, rad);
    var p4 = rotatePoint(x1, y1 + height, x1, y1, rad);

    win.MapSdk.polygons.push({
        coords: [p1, p2, p3, p4],
        styling: {
            main: {
                "strokeStyle": color,
                "lineWidth": 3,
                "fillStyle": "rgba(239,239,249,0.1)",
            },
            mini: {
                "strokeStyle": color,
                "lineWidth": 1,
                "fillStyle": "rgba(239,239,24,0.1)"
            }
        },
        drawOnMini: true,
        drawOnMap: true,
    });
    win.MapSdk.texts.push({
        text: player,
        x: (p1.x + p3.x) / 2,
        y: (p1.y + p3.y) / 2,
        font: "35px Arial",
        miniFont: "15px Arial",
        color: color,
        drawOnMap: true,
        drawOnMini: true,
    });
}

function rotatePoint(x, y, cx, cy, rad){
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    var nx = (cos * (x - cx)) - (sin * (y - cy)) + cx;
    var ny = (sin * (x - cx)) + (cos * (y - cy)) + cy;
    return {x: nx, y: ny};
}
