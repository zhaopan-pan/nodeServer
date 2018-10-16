// const $=require("/static/javascript/libs/jquery-1.7.2.min.js");

$("#clickMe").on("click",function(){

    $.ajax({
        url:"/user/ajaxUser/getUserList",
        type:"post",
        dataType:"json",
        data:{id:"1"},
        success:function(res){
            console.log(res);
            const code=res.code;
            const msg=res.msg;
            if(code){
                $("#userList").toString(res);
            }
        },
        error:function(xhr,errorText,errorType){
            console.log(errorType);
            console.log(errorText);
        }
    })
});
$("#submitBtn").on("click",function(){
    var userName=$("#userName").val();
    var sex=$("#sex").val();
    var age=$("#age").val();
    var phoneNumber=$("#phoneNumber").val();
    const data={
        userName:userName,
        sex:sex,
        age:age,
        phoneNumber:phoneNumber
    };
    if(!data.userName){
        alert("没写名字");
        return;
    }
    if(!data.phoneNumber){
        alert("没写号码");
        return;
    }
    $.ajax({
        url:"/user/ajaxUser/addUser",
        type:"post",
        dataType:"json",
        data:data,
        success:function(result){
            console.log(result);
        },
        error:function(xhr,errorText,errorType){
            console.log(errorType);
            console.log(errorText);
        }
    })
});

