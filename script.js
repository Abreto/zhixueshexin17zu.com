function random01() {
    return Number(Math.random() > 0.5);
}
var visit_time = (new Date()).getTime();
var game_time;
var current = 0;
var keys = [102, 106];
var topress;
var begintime;
var tdata = [];
var ended = 0;
function record(right, time) {
    if(current >= formal_test_offset) {
        tdata.push([right, time]);
    }
}
function postdata() {
    $.post('record.php', {
        'r':randomid,
        'v':visit_time,
        's':game_time,
        't':tdata
    });
}
function showone(id, rand) {
    $('#cls1').html(dic[id][rand]);
    $('#cls2').html(dic[id][1-rand]);
    $('#word').html(dic[id][2]);
}
function endgame() {
    if(!ended) {
        ended = 1;
        alert('Game is over.');
        postdata();
    }
}
function nextround() {
    var rand = random01();
    ++current;
    if( current >= dic.length ) {
        endgame();
        return;
    }
    showone(current, rand);
    topress = keys[rand];
    begintime = (new Date()).getTime();
    if( current == formal_test_offset )
        game_time = begintime;
}
(function () {
    current = -1;
    nextround();
    document.onkeypress = function (e) {
        if(e.charCode == topress) {
            var corretime = (new Date()).getTime();
            var used = corretime - begintime;
            record(1, used);
            //将接下来一行前两个斜杠去掉，可以达到即时输出时间的效果。
            //$('result').innerHTML += '<p>Problem '+(current+1)+': '+used+'ms</p>';
            nextround();
        } else {
            var cid = 0;
            if( e.charCode == 102 ) cid = 1;
            else if (e.charCode == 106) cid = 2;
            if( cid > 0 )
            {
                var el = '#cls'+cid;
                $(el).html($(el).html()+'<span class="tred">&#x2718;</span>');
            }
            var corretime = (new Date()).getTime();
            var used = corretime - begintime;
            record(0, used);
            setTimeout("nextround()",99);
        }
    }
})();
