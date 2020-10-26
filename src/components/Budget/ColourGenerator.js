var time = 0;

export var ColourGenerator = (function () {
    var instance;
    var n = 0;
    var timer;

    function createInstance(amount) {
        var letters = '89ABCDEF';
        var hoverLetters = '01234567';
        var colours = [];
        var hoverColours = [];
        for (var i = 0; i < amount; i++) {
            var c = '#';
            var hc = '#';
            for (var j = 0; j < 6; j++) {
                var pos = Math.floor(Math.random() * 8);
                c += letters[pos];
                hc += hoverLetters[pos];
            }

            var colourOK = true;
            for (var k = 0; k < colours.length; k++) {
                var existed = colours[k];
                if ((Math.abs(parseInt(existed.slice(1, 3) - c.slice(1, 3))) + Math.abs(parseInt(existed.slice(3, 5) - c.slice(3, 5))) + Math.abs(parseInt(existed.slice(5, 7) - c.slice(5, 7)))) < 20) {
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