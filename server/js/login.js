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
        this.sub.click(function(){
            if(that.tel.val()!=""&&that.pass.val()!=""){
                that.Proving()
            }else{
                that.aspan.eq(0).html("请输入正确的手机号");
            }
            
        })
        // this.radio.click(function(){ 
        //     that.sub.css("background","red")
        // });

       this.tel.blur(function(){
        // console.log(that.tel.val())
            var reg = /^1[3-9]\d{9}$/;
            if(reg.test(that.tel.val())){

                that.aspan.eq(0).html("");
               
            }else{
                that.aspan.eq(0).html("手机号有误，请重新输入！");

            }
        });

        this.pass.blur(function(){

            var lengthReg = /^.{6,18}$/;
            if(!lengthReg.test(that.pass.val())){
                that.aspan.eq(1).html("密码错误！");
                
            }else{
                that.aspan.eq(1).html("");
            }
    
           
        });
        
        
        // this.apass.blur(function(){
        //     if(that.apass.val() != ""){
        //         if(that.apass.val() == that.pass.val()){
        //             // console.log(that.pass.val())
        //             that.aspan.eq(2).html("");

        //         }else{
        //             that.aspan.eq(2).html("用户名密码不符");

        //         }
        //     }
        // });

    }
    getData(){
        this.date = localStorage.getItem("date");
        // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
        if(this.date == null){
            this.date = [];
        }else{
            this.date = JSON.parse(this.date)
        }
    }
    Proving(){
        for(var i=0;i<this.date.length;i++){
            if(this.date[i].tel == this.tel.val() && this.date[i].pass == this.pass.val()){
                alert( "登录成功,点击跳转到首页");

                this.date[i].onoff = 1;

                localStorage.setItem("date",JSON.stringify(this.date));

                setTimeout(()=>{
                    location.href = "index.html";
                },0)
                return;
            }
        }
        this.aspan.eq(0).html("用户名密码不符");
    }
}

new Login();