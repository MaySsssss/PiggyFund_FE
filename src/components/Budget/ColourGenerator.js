var time = 0;

export var ColourGenerator = (function () {
    var instance;
    var n = 0;
    var timer;

    function createInstance(amount) {
        var letters = '0123456789ABCDEF';
        var colours = [];
        var hoverColours = [];
        var colourDiff = (256 * 7 / 8) * 3 / (2 * amount);
        for (var i = 0; i < amount; i++) {
            var c = '#';
            var hc = '#';
            for (var j = 0; j < 6; j++) {
                if (j % 2 == 0) {
                    var pos = Math.floor(Math.random() * 7);
                    c += letters[pos + 7];
                    hc += letters[pos];
                } else {
                    var pos = Math.floor(Math.random() * 16);
                    c += letters[pos];
                    hc += letters[pos];
                }
            }

            var colourOK = true;
            for (var k = 0; k < colours.length; k++) {
                var existed = colours[k];
                if ((Math.abs(parseInt(existed.slice(1, 3), 16) - parseInt(c.slice(1, 3), 16)) + Math.abs(parseInt(existed.slice(3, 5), 16) - parseInt(c.slice(3, 5), 16)) + Math.abs(parseInt(existed.slice(5, 7), 16) - parseInt(c.slice(5, 7), 16))) < colourDiff) {
                    colourOK = false;
                    break;
                }
            }

            if (colourOK) {
                colours.push(c)
                hoverColours.push(hc)
            } else {
                i--;
            }
        }
        timer = setInterval(function () {
            time--;
        }, 1000);
        return [colours, hoverColours];
    }

    return {
        getInstance: function (amount) {
            if (!instance || n != amount || time == 0) {
                clearInterval(timer);
                time = 3;
                n = amount;
                instance = createInstance(amount);
            }
            return instance;
        }
    }
})();