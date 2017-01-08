var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');    

// function to get distance
function distance(x, y, xx, yy) {
   return Math.sqrt(Math.pow(x - xx, 2) + Math.pow(y - yy, 2) );
}

// function gets the direction of a line
function direction(x, y, xx, yy) {
   var angV = Math.acos( (xx - x) / Math.sqrt( Math.pow(x - xx, 2) + Math.pow(y - yy, 2) ) );

   if (y - yy > 0) angV = - angV; // check the sign

   return (angV + Math.PI * 2) % (Math.PI * 2); // makes the angle positive. 
                                                // Not needed but for this 
                                                // makes it easier to understand
}


//draw the triangle
function draw(){
    var x1 = document.getElementById("x1").value;
    var x2 = document.getElementById("x2").value;
    var y1 = document.getElementById("y1").value;
    var y2 = document.getElementById("y2").value;
    var x3 = document.getElementById("x3").value;
    var y3 = document.getElementById("y3").value;

    var a = { x: x1, y: y1};
    var b = { x: x2, y: y2};
    var c = { x: x3, y: y3};

    function drawAngle(x, y, dirA, dirB){
        dirB += Math.PI;              // revers second direction
        var sweepAng = dirB - dirA;   // angle between lines
        var startAng = dirA;          // angle to start the sweep of the arc
        var textX = x + Math.cos(startAng + sweepAng / 2) * minDist *2;
        var textY = y + Math.sin(startAng + sweepAng / 2) * minDist *2;
        if(Math.abs(sweepAng) > Math.PI){  // if the angle is greater then 180
            sweepAng = Math.PI * 2 - sweepAng;  // get the smaller angle
            startAng = dirB;          // and change the start angle
        }
        context.beginPath();
        if(sweepAng < 0){                  // if the angle is sweeping anticlockwise
            context.arc(x, y, minDist ,startAng + sweepAng , startAng);
        }else{                        // draw clockwise angle
            context.arc(x, y, minDist, startAng, startAng + sweepAng);
        }
        context.stroke();                 // all done
    }

    context.beginPath();
    context.strokeStyle="#FF0000";
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    //context.moveTo(x2,y2);
    context.lineTo(x3,y3);
    //context.moveTo(x3,y3);
    context.lineTo(x1,y1);
    context.stroke();



    // now work out the radius of the angle stroke
     var dist1 = distance(x1, y1, x2, y2);  // get the 3 distance of the lines
     var dist2 = distance(x2, y2, x3, y3);
     var dist3 = distance(x3, y3, x1, y1);
     var minDist = Math.min(dist1, dist2, dist3); // get the min dist;
     if(minDist === 0){
        return; // there are no angles to draw and exit 
                // to avoid divide by zero in direction function
     }
     minDist /= 5; // get the amgle arc radius 1/5th

     var dir1 = direction(x1, y1, x2, y2);  // get the 3 directions of the lines
     var dir2 = direction(x2, y2, x3, y3);
     var dir3 = direction(x3, y3, x1, y1);

    drawAngle(x1, y1, dir1, dir3); // draw the angle stoke first corner;
    drawAngle(x2, y2, dir2, dir1); // draw the angle stoke second corner;
    drawAngle(x3, y3, dir3, dir2); // draw the angle stoke third;
    

    var ab = dist1;
    var bc = dist2;
    var ac = dist3;

    var angleBAC = (Math.acos(((ab*ab)+(ac*ac)-(bc*bc))/(2*(ab*ac)))) * 180 / Math.PI;
    console.log(angleBAC);
    var angleABC = (Math.acos(((ab*ab)+(bc*bc)-(ac*ac))/(2*(ab*bc)))) * 180 / Math.PI;
    console.log(angleABC);
    var angleBCA = (Math.acos(((bc*bc)+(ac*ac)-(ab*ab))/(2*(bc*ac)))) * 180 / Math.PI;
    console.log(angleBCA);
    console.log(ab);
    console.log(ac);
    console.log(bc);

     // Draw the intersection points
    context.fillText('A:'+angleBAC, x1,y1);
    context.fillText('B:'+angleABC, x2,y2);
    context.fillText('C:'+angleBCA, x3,y3);
    localStorage.setItem('myCanvas', canvas.toDataURL());
    window.location="index2.html";

}//end of draw()

    

    function load() {
        var dataURL = localStorage.getItem('myCanvas');
        var img = new Image;
        img.src = dataURL;
        img.onload = function () {
        context.drawImage(img, 0, 0);
        };
    }


function clearcanvas1()
{
    
    context.clearRect(0, 0, canvas.width, canvas.height);
}

