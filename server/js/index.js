



// 选项卡
function Tab(){
    this.li = document.querySelectorAll("#t-nav li");
    this.cont = document.querySelectorAll(".shop #cont");
    this.cont2 = document.querySelector(".shop #cont2");
    this.index = 0;
    

    this.init();
   
}

Tab.prototype.init = function(){
    var that = this
    for(var i=0;i<this.li.length;i++){
        this.li[i].xuhao = i
        this.li[i].onclick = function(){

            that.changeIndex(this)
            
        }
    }
  
}



Tab.prototype.changeIndex=function(ele){
    this.index = ele.xuhao
    this.hide()
}
Tab.prototype.hide=function(){
    for(var i=0;i<this.li.length;i++){
        this.li[i].className="";
        // this.cont[i].innerHTML = ""
        // console.log(this.cont[i])
    }
    this.show()
  
}
Tab.prototype.show=function(){
    this.li[this.index].className="te";
    // this.cont2.style.display = "block"
    // this.cont.style.display = "none"

}

new Tab();


// 商品列表
function Goods(){
    this.cont = document.querySelector(".shop #cont");
    this.url = "http://localhost:5555/date/shop.json";
    this.li = document.querySelectorAll(".shop #cont li");
    
    this.span = document.querySelector(".h-r .h-r-r span");
    // console.log(this.span)

    this.init();
    this.addEvent();
}

Goods.prototype.init = function(){
    var that = this
    ajaxGet(this.url).then(function(res){
        that.res = JSON.parse(res)
        // console.log(that.res)
        that.display()
    })
}

Goods.prototype.display = function(){
    
    var str = ""
    for(var i=0;i<this.res.length;i++){
        // console.log(this.res[i].url)
        
        str += `
        <li index="${this.res[i].id}">
                    <a  href="${this.res[i].src}">
                    <img src="${this.res[i].url}">
                    <span>${this.res[i].price}</span>
                    <p>${this.res[i].name}</p></a>
                    <em class="add">加入购物车</em>
                </li>`    
    }
    this.cont.innerHTML = str 
    
}

Goods.prototype.addEvent = function(){
    
    var that = this
    addEvent(this.cont,"click",function(eve){
        // alert("加入购物车成功")
        var e = eve || window.event
        var target = e.target || e.srcElement
        if(target.className == "add"){
            that.id = target.parentNode.getAttribute("index")
         
            that.setCookie()
        }
    })
}

function addEvent(ele,type,callback){
    if(ele.addEventListener){
        ele.addEventListener(type,callback,false)
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,callback)
    }else{
        ele["on"+type] = callback;
    }
}

Goods.prototype.setCookie = function(){
    this.goods = getCookie("goods")
    // this.span.innerHTML = this.goods.length
    if(this.goods == ""){
        this.goods=[{
            id:this.id,
            num:1
        }]
    }else{
        var onoff = true
        this.goods = JSON.parse(this.goods)
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                this.goods[i].num++
                onoff = false
                break
            }
        }
        if(onoff){
            this.goods.push({
                id:this.id,
                num:1
            })
        }
    }
    setCookie("goods",JSON.stringify(this.goods))
}


new Goods();

