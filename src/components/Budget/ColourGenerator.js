var time = 0;

export var ColourGenerator = (function () {
    var instance;
    var n = 0;
    var timer;

    function createInstance(amount) {
        var letters = '89ABCDEF';
        var result = [];
        for (var i = 0; i < amount; i++) {
            var colour = '#';
            for (var j = 0; j < 6; j++) {
                colour += letters[Math.floor(Math.random() * 8)];
            }

            var colourOK = true;
            for (var k = 0; k < result.length; k++) {
                var existed = result[k];
                if ((Math.abs(parseInt(existed.slice(1, 3) - colour.slice(1, 3))) + Math.abs(parseInt(existed.slice(3, 5) - colour.slice(3, 5))) + Math.abs(parseInt(existed.slice(5, 7) - colour.slice(5, 7)))) < 20) {
                    colourOK = false;
                    break;
                }
            }

            if (colourOK) {
                result.push(colour)
            } else {
                i--;
            }
        }
        timer = setInterval(function () {
            time--;
        }, 1000);
        return result;
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