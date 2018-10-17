// const $=require("/static/javascript/libs/jquery-1.7.2.min.js");

$("#getUserListBtn").on("click", function () {
    $("#zp_tbody").empty();
    $.ajax({
        url: "/user/ajaxUser/getUserList",
        type: "post",
        dataType: "json",
        data: "",
        success: function (res) {
            console.log(res);
            const code = res.code;
            const msg = res.msg;
            if (code == 1) {
                const datalist = res.datas.dataList;
                var str = ""
                for (let i = 0; i < datalist.length; i++) {
                    const datas = datalist[i]
                    console.log(datas);
                    str += "<tr>"
                        + "<td>" + datas.userName + "</td>"
                        + "<td>" + datas.sex + "</td>"
                        + "</tr>";


                }
                $("#zp_tbody").append(str);
            }
        },
        error: function (xhr, errorText, errorType) {
            console.log(errorType);
            console.log(errorText);
        }
    })
});


$("#searchBtn").on("click", function () {
    const searchWord=$("#searchWord").val();
    const option={
        searchWord:searchWord
    }
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
                    console.log(datas);
                    str += "<tr>"
                        + "<td>" + datas.userName + "</td>"
                        + "<td>" + datas.sex + "</td>"
                        + "</tr>";


                }
                $("#zp_tbody").append(str);
            }

        }
    });
});
$("#submitBtn").on("click", function () {
    var userName = $("#userName").val();
    var sex = $("#sex").val();
    var age = $("#age").val();
    var phoneNumber = $("#phoneNumber").val();
    const data = {
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
    $.ajax({
        url: "/user/ajaxUser/addUser",
        type: "post",
        dataType: "json",
        data: data,
        success: function (result) {
            console.log(result);
        },
        error: function (xhr, errorText, errorType) {
            console.log(errorType);
            console.log(errorText);
        }
    })
});

