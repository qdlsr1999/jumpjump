import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function App() {
  return (
    <View style={styles.wrap}>
       <Text style={styles.text1}>Press the mouse to charge, release the mouse and the ball starts to move</Text>
        <Text style={{fontSize:20}}>Score：</Text>
        <Text style={{fontSize:20}}>History：</Text>
       <View style={styles.con}></View>
       <View style={styles.blc}></View>
   </View>

  );
}

const activeSlideRef = useRef(null);
function randomInt(min, max) { 
            return Math.round(Math.random() * (max - min)) + min;
        }

        function randomColor() { 
            var map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
            var str = '#';
            for (var i = 0; i < 6; i++) {
                var index = randomInt(0, 15);
                str += map[index];
            }
            return str;
        }
        if (activeSlideRef.current){
        var wrap =  activeSlideRef.current.wrap;
        var con = activeSlideRef.current.con;
        
        var oldtime = 0; 
        var timer2 = null; 
        var timer3 = null; 
        var num = 0; 
        var mouseD = false; 
        var mouseUp = true; 
        var text1 = activeSlideRef.current.text1;
        var text2 =activeSlideRef.current.text2;
        var max = localStorage.getItem('max');
        var view = activeSlideRef.current.view; 
        text2.innerText = 'history：' + localStorage.getItem('max');
        view.style.height =40;
        view.style.width = 30;
        view.className = 'blc'; 
        view.style.backgroundColor = randomColor(); 
        wrap.appendChild(view); 
       activeSlideRef.current.onmousedown = function () { 
            if (!mouseD) { 
                var blc = activeSlideRef.current.blc1; 
                oldtime = Date.now(); 
                var target = blc[blc.length - 2]; 
                var down_c = 10; 
                var left = target.offsetLeft; 
                var bottom = 40 - target.offsetHeight / 2; 
                var con_l = con.offsetLeft; 
                var con_b = 30; 
                timer3 = setInterval(() => { 
                    down_c -= 0.03; 
                    if (down_c <= 0) { 
                        down_c = 0.03;
                    }
                
                }, 1);
                mouseD = true; 
                mouseUp = false; 
            }
        }
        activeSlideRef.current.onmouseup = function () {
            if (!mouseUp) { 
                mouseUp = true; 
                clearInterval(timer3); 
                var timer4 = null; 
                var blc = activeSlideRef.current.blc; 
                var target = blc[blc.length - 2]; 
                var left = target.offsetLeft;
                var down_time = 0;
                var down_c = 0;
                var click_time = Date.now() - oldtime;
                var bottom = 40 - target.offsetHeight / 2 - (click_time * 0.03 > 10 ? 10 : click_time *
                0.03); 
                timer4 = setInterval(() => { 
                    down_time++;
                    if (down_time > click_time) {
                        clearInterval(timer4);
                    }
                    down_c += 0.03;
                    if (down_c >= 10) {
                        down_c = 10;
                    }
               
                }, 1);
                var clicktime = (Date.now() - oldtime) * 1.5; 
                var time2 = 0;
                var y = 30; 
                var x = con.offsetLeft; 
                clearTimeout(tout); 
                timer2 = setInterval(() => { 
                    time2 += 20;
                    y = 30 + clicktime / 50 * Math.sin(time2 * Math.PI /
                    clicktime); 
               
                }, 20);
                var tout = setTimeout(function () { 
                    clearInterval(timer2); 
                    x = con.offsetLeft; 
                    var blc = activeSlideRef.current.blc; 
                    if (con.offsetLeft >= wrap.lastElementChild.offsetLeft && con.offsetLeft <= wrap
                        .lastElementChild.offsetLeft + wrap.lastElementChild.offsetHeight - 10
                        ) { 
                        num += 10; 
                        text1 = 'score：' + num; 
                    
                        var view_sex2 = randomInt(40, 60);
                        var newdiv = activeSlideRef.current.view;
                        newview.style.backgroundColor = randomColor();
                        newview.className = 'blc';
                        wrap.appendChild(newview);
                    } else {
                        alert('Gameend,score：' + num);
                        max = max > num ? max : num;
                        localStorage.setItem('max', max) 
                        location.reload(); 
                    }
                    wrap.scrollLeft = wrap.scrollWidth; 
                    mouseD = false; 
                    mouseUp = true; 
                }, clicktime)
            }
        }
        }
const styles = StyleSheet.create({

  text1:{
        fontSize:30,
        margin: 0,
        padding: 0,
        position: 'center',
 
    },
    wrap :{ argin: 0,
            padding: 0,
          
            position: 'relative',
            overflow: 'hidden',
        },
    con:{
            margin: 0,
            padding: 0,
             backgroundColor: 'hotpink',
             //backgroundImage: radial-gradient(10 4 4,
                    //rgba(0, 0, 0, 0),`
                   // rgba(2, 2, 2, 1)),
            width: 20,
            height: 20,
        
            position: 'absolute',
            left: 70,
            bottom: 30,
            zIndex: 2,
    },
    blc:{  
            margin: 0,
            padding: 0,
      
            width: 40,
            height: 40,
            backgroundColor: 'midnightblue',
            position: 'absolute',
            left: 60,
            bottom:0,

    }

});
