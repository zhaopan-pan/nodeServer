
//点击搜索
$("#searchBtn").on("click", function () {
    const searchWord = $("#searchWord").val();
    const option = {
        searchWord: searchWord
    }
    console.log(option);
    console.log(option.__proto__);
    $("#zp_tbody").empty();
    $.ajax({
        url: "/user/ajaxUser/getUserList",
        type: "post",
        dataType: "json",
        data: option,
        success: function (res) {
            console.log(res);
            const code = res.code;
            const msg = res.msg;
            if (code == 1) {
                const datalist = res.datas.dataList;
                var str = ""
                for (let i = 0; i < datalist.length; i++) {
                    const datas = datalist[i]
                    const userInfoId = datas.userInfoId;
                    str += "<tr>"
                        + "<td>" + datas.userName + "</td>"
                        + "<td>" + (datas.sex == 1 ? "男" : "女") + "</td>"
                        + "<td>" + datas.age + "</td>"
                        + "<td>" + datas.phoneNumber + "</td>"
                        + "<td>"
                        + "<span id='deleteUser' data-id=" + userInfoId + ">删除</span>"
                        + "<span id='updataUserInfo' data-id=" + userInfoId + ">修改</span>"
                        + "</td>"
                        + "</tr>";


                }
                $("#zp_tbody").append(str);
            }

        }
    });
});


/**
 * 点击修改
 */
$("#zp_tbody").on("click", "#updataUserInfo", function () {
    const dataId = $(this).attr("data-id");
    $("#submitBtn").attr("data-id", dataId);
    $("#submitBtn").text("修改");
    $("#cancelBtn").removeClass("hide");
    $(".input").val("");

});

/**
 * 取消按钮
 */
$("#cancelBtn").on("click", function () {
    $(this).addClass("hide");
    $("#submitBtn").removeAttr("data-id");
    $("#submitBtn").text("新增");

})


/**
 * 删除单个
 */
$("#zp_tbody").on("click", "#deleteUser", function () {
    const sureDelete = confirm("三思啊")
    if (!sureDelete) {
        return;
    }
    console.log("--------");
    console.log($(this).attr("data-id"));
    const dataId = $(this).attr("data-id");
    const data = {
        userInfoId: dataId
    }
    $.ajax({
        url: "/user/ajaxUser/deleteUser",
        type: "post",
        dataType: "json",
        data: data,
        success: function (res) {
            console.log(res);
            const code = res.code;
            const msg = res.msg;
            if (code == 1) {
                alert(msg);
            }else{
                alert(msg);
            }
        },
        error: function (xhr, errorText, errorType) {
            console.log(errorType);
            console.log(errorText);
        }
    })
})

//添加用户
$("#submitBtn").on("click", function () {
    const dataId = $(this).attr("data-id");

    var userName = $("#userName").val();
    var sex = $("#sex").val();
    var age = $("#age").val();
    var phoneNumber = $("#phoneNumber").val();
    let data = {
        userName: userName,
        sex: sex,
        age: age,
        phoneNumber: phoneNumber
    };
    if (!data.userName) {
        alert("没写名字");
        return;
    }
    if (!data.phoneNumber) {
        alert("没写号码");
        return;
    }

    if (dataId) {
        data.dataId=dataId;
        updateUserInfo(data);
        return;
    } else {
        $.ajax({
            url: "/user/ajaxUser/addUser",
            type: "post",
            dataType: "json",
            data: data,
            success: function (res) {
                console.log(res);
                const code = res.code;
                const msg = res.msg;
                if (code == 1) {
                    alert(msg);
                }else{
                    alert(msg);
                }
            },
            error: function (xhr, errorText, errorType) {
                console.log(errorType);
                console.log(errorText);
            }
        })
    }

});


function updateUserInfo(data) {

    $.ajax({
        url: "/user/ajaxUser/updateUserInfo",
        type: "post",
        dataType: "json",
        data: data,
        success: function (res) {
            console.log(res);
            const code = res.code;
            const msg = res.msg;
            if (code == 1) {
                alert(msg);
            }else{
                alert(msg);
            }
        },
        error: function (xhr, errorText, errorType) {
            console.log(errorType);
            console.log(errorText);
        }
    })
}
