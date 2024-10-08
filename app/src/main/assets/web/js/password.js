//**********************password*****************************

//添加遮挡层,必须用这种函数才成功
function addCover(parent) {
    var cover = parent.querySelector('.cover'); //必须为var
    if (!cover) {
        cover = document.createElement("div");
        cover.classList.add("cover");
        parent.appendChild(cover);
        cover.style.display = "block";
    }
}

//删除遮挡层
function removeCover(parent) {
    const cover = parent.querySelector('.cover'); //必须为const
    if (cover) {
        cover.remove();
    }
}

function verifyPassword(url) {
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            var pwd = document.getElementById('password-ori');
            var wrong = document.getElementById("wrong");
            if (data != null) {
                if (data.result == true) {
                    pwd.value = "";
                    oriDiv.style.display = "none";
                    newDiv.style.display = "block";
                }
                else {
                    pwd.style.color = "red";
                    wrong.style.display = "inline";
                    pwd.onclick = function () {
                        pwd.value = "";
                        pwd.style.color = "black";
                        wrong.style.display = "none";
                    }
                }
            }
        },
        error: function (arg1) {
            alert("密码验证失败");
            console.log(arg1);
            pwd.value = "";
            wrong.style.display = "none";
        }
    })
}

function show_pwd() {
    showPwd.prop('type', 'text');
    showPwdim.style.display = "none";
    hidePwdim.style.display = "inline"
}

function hide_pwd() {
    showPwd.prop('type', 'password');
    showPwdim.style.display = "inline";
    hidePwdim.style.display = "none"
}

function show_pwd_new() {
    showPwdnew.prop('type', 'text');
    showPwdimnew.style.display = "none";
    hidePwdimnew.style.display = "inline"
}

function hide_pwd_new() {
    showPwdnew.prop('type', 'password');
    showPwdimnew.style.display = "inline";
    hidePwdimnew.style.display = "none"
}

function show_pwd_confirm() {
    showPwdcf.prop('type', 'text');
    showPwdimcf.style.display = "none";
    hidePwdimcf.style.display = "inline"
}

function hide_pwd_confirm() {
    showPwdcf.prop('type', 'password');
    showPwdimcf.style.display = "inline";
    hidePwdimcf.style.display = "none"
}

function confirmPwd() {
    var url = 'VerifyPassword?password=' + pwd.value;
    verifyPassword(url);
}

function cancelPwd() {
    pwd.value = "";
    var wrong = document.getElementById("wrong");
    wrong.style.display = "none";
    hide_pwd();
}

function changePassword(url) {
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function () {
            pwdNew.value = "";
            pwdConfirm.value = "";
            cfWrong.style.display = "none";
            var change = document.getElementById("change-ok");
            change.style.display = "block";            
        },
        error: function (arg1) {
            alert("密码修改失败");
            console.log(arg1);
        }
    })
}


function confirmPwd_new() {
    if ((pwdNew.value != "") && (pwdConfirm.value != "") && (pwdNew.value != pwdConfirm.value)) {
        cfWrong.style.display = "inline";
    }
    else{
        url = 'changePassword?newPassword=' + pwdConfirm.value;
        changePassword(url);
    }
}

function cancelPwd_new() {
    oriDiv.style.display = "block";
    newDiv.style.display = "none";
}