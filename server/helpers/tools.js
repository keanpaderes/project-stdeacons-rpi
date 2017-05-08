function containsObject(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].proximity === obj) {
            return true;
        }
    }
    return false;
}

function incrementObject(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].proximity === obj) {
            ++list[i].tally;
            break;
        }
    }
}

function tallyCount(num, usage) {
    var count = [];
    var condition;
    var converted;
    var i = 0;
    for (i = 0; i < num.length; ++i) {
        switch(usage) {
            case 'estimate':
                condition = containsObject(num[i], count);
                if(!condition) {
                    count.push({
                        'proximity': num[i],
                        'tally': 1
                    });
                } else {
                    incrementObject(num[i], count);
                }
                break;
            default:
                converted = (usage === 'floor')?
                    Math.floor(num[i]) : num[i] * -1;
                    if (!count.hasOwnProperty(converted)) {
                        count[converted] = 1;
                    } else {
                        ++count[converted];
                    }
                break;
        }

    }
    if(usage !== 'estimate') {
        for (i = 0; i < count.length; ++i) {
            if(count[i]==null) count[i] = 0;
        }
    }

    return count;
}

function _optimizedAveraging(accuracies) {

    function getAvg(arr) {
        return arr.reduce(function(prev,curr){return prev+curr;}) / arr.length;
    };

    function roundHundredths(num) {
        return (Math.round(num*10000)/10000).toFixed(4);
    };

    var highestTally = tallyCount(accuracies, 'floor').reduce(
        function reduceHighestTally(prev, cur, i, arr) {
            return arr[prev] > cur ? prev: i;
        }, 0);

    /**
   * Get the average of the provided numbers that are:
   *  1. Less than double the most reliable number,
   *  2. More than half the most reliable number,
   *  then round it to the nearest hundredth.
   */
   return roundHundredths(getAvg(accuracies.filter(function (num){
		return Math.ceil( num ) > ( highestTally / 2 ) && Math.floor( num ) < ( highestTally * 2 );
	})));
   // return average;
}

function _rssiAveraging (rssis) {
    return tallyCount(rssis, 'negate').reduce(
        function reduceHighestTally(prev, cur, i, arr) {
            return arr[prev] > cur ? prev: i;
        }, 0) * -1;
}

function _proximityEstimation (proxs) {
    function getHighest (proxs) {
        var highest = proxs[0];
        for(var i = 0; i < proxs.length; i++) {
            if(proxs[i].tally > highest.tally)
                highest = proxs[i];
        }
        return highest.proximity;
    }
    return getHighest(tallyCount(proxs, 'estimate'));
}

module.exports = {
    optimizedAveraging: _optimizedAveraging,
    rssiAveraging: _rssiAveraging,
    proximityEstimation: _proximityEstimation
}
