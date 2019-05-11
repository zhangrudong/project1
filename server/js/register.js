

// 注册
class Login{
    constructor(){
        // this.url = "http://www.icodeilife.cn/ctrl/register.php";
        this.tel = $("#tel");
        this.pass = $("#pass");
        this.apass = $("#apass");
        this.sub = $("#sub"); 
        this.span = $("#span");
        this.aspan = $(".write span");
        this.radio = $("#radio");

        this.init();
        this.getData();
        // console.log(this.apass)
        
    }

    init(){
        
        var that = this
        this.radio.click(function(){ 
            that.sub.css("background","rgb(255, 115, 0)")
            that.sub.click(function(){
                that.setData();
            })
        });

       this.tel.blur(function(){
        // console.log(that.tel.val())
            var reg = /^1[3-9]\d{9}$/;
            if(reg.test(that.tel.val())){

                that.aspan.eq(0).html("");
               
            }else{
                that.aspan.eq(0).html("请输入正确的手机号");

            }
        });

        this.pass.blur(function(){

            var lengthReg = /^.{6,18}$/;
            if(!lengthReg.test(that.pass.val())){
                that.aspan.eq(1).html("密码长度不符");
                
            }else{
                that.aspan.eq(1).html("");
            }
    
           
        });
    
        this.apass.blur(function(){
            if(that.apass.val() != ""){
                if(that.apass.val() == that.pass.val()){
                    // console.log(that.pass.val())
                    that.aspan.eq(2).html("");

                }else{
                    that.aspan.eq(2).html("密码不一致");

                }
            }
        });

    }
    
    getData(){
        this.date = localStorage.getItem("date");
        // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
        if(this.date == null){
            this.date = [];
        }else{
            this.date = JSON.parse(this.date)
        }
        // console.log(this.date)
    }
    setData(){
        if(this.date.length == 0){
            // 第一次注册
            this.date.push({
                tel:this.tel.val(),
                pass:this.pass.val(),
                onoff:0
            })
            // this.aspan.eq(3).html("注册成功");
            alert("注册成功，点击立即跳转到登录页面！");
            location.href="login.html";
            localStorage.setItem("date",JSON.stringify(this.date))
        }else{
            // 不是第一次注册，如果不是第一次注册，需要判断这次注册的和之前注册的是否重名，如果重名，不执行
            for(var i=0;i<this.date.length;i++){
                if(this.date[i].tel === this.tel.val()){
                    // console.log(this.date[i].user)
                    this.aspan.eq(3).html("已经被注册了，重新换个吧！");
                    return;
                }
            }
            // 如果执行了，表示没重名，那就再增加一个
            this.date.push({
                tel:this.tel.val(),
                pass:this.pass.val(),
                onoff:0
            })
            // this.aspan.eq(3).html("注册成功");
            alert("注册成功，点击立即跳转到登录页面！");
            location.href="login.html";
            localStorage.setItem("date",JSON.stringify(this.date))
        }
    }
}
new Login();

