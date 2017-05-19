            function random01() {
                return Number(Math.random() > 0.5);
            }
            function $(id) {
                return document.getElementById(id);
            }
            
            var visit_time = (new Date()).getTime();
            var current = 0;
            var keys = [102, 106];
            var topress;
            var begintime;
            function showone(id, rand) {
                $('cls1').innerHTML = dic[id][rand];
                $('cls2').innerHTML = dic[id][1-rand];
                $('word').innerHTML = dic[id][2];
            }
            function endgame() {
                alert('Game is over.');
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
            }
            (function () {
                current = -1;
                nextround();
                document.onkeypress = function (e) {
                    if(e.charCode == topress) {
                        var corretime = (new Date()).getTime();
                        var used = corretime - begintime;
                        console.log("right");
                        console.log(used);
                        //将接下来一行前两个斜杠去掉，可以达到即时输出时间的效果。
                        //$('result').innerHTML += '<p>Problem '+(current+1)+': '+used+'ms</p>';
                        nextround();
                    } else {
                        var cid = 0;
                        if( e.charCode == 102 ) cid = 1;
                        else if (e.charCode == 106) cid = 2;
                        if( cid > 0 )
                        {
                            $('cls'+cid).innerHTML += '<span class="tred">&#x2718;</span>';
                        }
                        console.log("wrong");
                        var corretime = (new Date()).getTime();
                        var used = corretime - begintime;
                        console.log(used);
                        setTimeout("nextround()",1000);
                    }
                }
            })();