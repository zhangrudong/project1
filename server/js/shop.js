
function Magnifier(){
    // 1.选元素
    this.sBox = document.querySelector(".s-l .simg");
    this.sImg = document.querySelector(".s-l .simg img");
    this.span = document.querySelector(".s-l .simg span");
    this.bBox = document.querySelector(".s-l .bimg");
    this.list = document.querySelectorAll(".s-l .s-b ul li");
    this.bImg = document.querySelector(".s-l .bimg img");
    
    // console.log(this.list)

    this.index = 0;
    this.init()
}
Magnifier.prototype.show = function(){

    this.span.style.display = "block";
    this.bBox.style.display = "block";
}
Magnifier.prototype.hide = function(){

    this.span.style.display = "none";
    this.bBox.style.display = "none";
}
Magnifier.prototype.move = function(pos){

    // console.log(pos.x)

    var l = pos.x - this.span.offsetWidth*1.6;
    var t = pos.y - this.span.offsetHeight*2.1;
    // console.log(this.span.offsetWidth)
    
    if(l<0) l=0;
    if(t<0) t=0;
    (l>this.sBox.offsetWidth-this.span.offsetWidth) && 
    (l=this.sBox.offsetWidth-this.span.offsetWidth);
     
    (t>this.sBox.offsetHeight-this.span.offsetHeight) && 
    (t=this.sBox.offsetHeight-this.span.offsetHeight);

    this.span.style.left = l + "px";
    this.span.style.top = t + "px";

    var x=  l / (this.sBox.offsetWidth-this.span.offsetWidth);
    var y = t / (this.sBox.offsetHeight-this.span.offsetHeight)

    this.bImg.style.left = -x * (this.bImg.offsetWidth-this.bBox.offsetWidth) + "px";
    this.bImg.style.top = -y * (this.bImg.offsetHeight-this.bBox.offsetHeight) + "px";
}
Magnifier.prototype.init = function(){
    var that = this;

    this.sBox.onmouseover = function(){

        that.show()
        this == that.sBox
        this.onmousemove = function(eve){
            var e = eve || window.event;
            // console.log(this.offsetLeft)

            that.move({
                x:e.pageX - this.offsetLeft,
                y:e.pageY - this.offsetTop
            })
        }
    }
    this.sBox.onmouseout = function(){
        that.hide()
    }

    // for(var i=0;i<this.list.length;i++){
    //     // console.log(this.list[i])
    //     this.list[i].onclick = function(){
    //         // console.log("dianjile ")
    //     }
        
    //     // this.sImg = this.list[this.index].children[0]
    // }
}



new Magnifier;