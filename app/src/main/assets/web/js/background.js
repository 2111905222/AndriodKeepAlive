//**********************background*****************************

//查询当前背景
function getbackgrounddata() { //pageNum
    $.ajax({
        url: "/SearchMainBgUrl",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null) {
                var imgInput = document.getElementById("preview-bg");
                imgInput.innerHTML = '';
                var img = document.createElement('img');
                img.width = 640;
                img.height = 480;

                if (data.url == "default") {
                    img.src = './img/bg.jpeg';
                }
                else {
                    img.src = data.url;
                }
                imgInput.appendChild(img);
            }
        }
    })
}

//查询默认背景
function getbackgrounddata_ori() { //pageNum
    $.ajax({
        url: "/settingDefaultMainBg",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function () {
            var imgInput = document.getElementById("preview-bg");
            imgInput.innerHTML = '';
            var img = document.createElement('img');
            img.src = './img/bg.jpeg';
            img.width = 640;
            img.height = 480;
            imgInput.appendChild(img);
        },
        error: function (arg1) {
//            alert("加载数据失败");
            var imgInput = document.getElementById("preview-bg");
            imgInput.innerHTML = '';
            var img = document.createElement('img');
            img.src = './img/bg.jpeg';
            img.width = 640;
            img.height = 480;
            imgInput.appendChild(img);
            console.log(arg1);
        }
    })
}

//上传文件(人脸)
function fileUpload_background() {
    var fileInput_background = document.getElementById('fileUpload-background');//命名不能重复
    var imgPreview = document.querySelector('#imgPreview');
    var formData_background = new FormData();

    fileInput_background.addEventListener('change', function () {
        // 清空显示区域
        // while (imgPreview.firstChild) {
        //     imgPreview.removeChild(imgPreview.firstChild);  //
        // }

        imgPreview.innerHTML = ""; //两种方式均可用

        var im_file = document.getElementById('image-file');

        var file = fileInput_background.files[0];

        // 通过文件类型判断是不是图片
        if (file.type.startsWith('image/')) {
            formData_background.append('imageFile', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'data:image/png,image/jpg,image/jpeg;base64,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 上传成功，将上传的图片显示在<img>标签中
                    var img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.width = 400;
                    img.height = 400;
                    imgPreview.appendChild(img);
                    im_file.value = file.name; //获取文件名
                    im_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };
        }
        else {
            imgPreview.textContent = '不支持的文件类型';
        }
        xhr.send(formData_background);
    });
}

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

function addbackground() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var sidebar_background = document.getElementById("pullsidebar-background");
    // 显示侧边栏
    sidebar_background.style.display = "block";
    // 添加遮挡层
    addCover(parent);
}

//***获取添加数据按钮
function addDataBtn_background() {
    var addDataBtn_background = document.getElementById("add-data-btn-background");

    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_background.removeEventListener("click", addbackground());
    addDataBtn_background.addEventListener("click", addbackground());
}

//重置选择文件按钮
function resetInput(fileInput) {
    fileInput.value = '';
    fileInput.form.reset();
}

//保存和取消时关闭侧边栏
function removebackgroundview() {
    // 获取侧边栏和上传表单元素
    var sidebar_background = document.getElementById("pullsidebar-background");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    sidebar_background.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    // // 清空显示区域
    var imgPreview = document.querySelector('#imgPreview');
    imgPreview.innerHTML = "";
    var fileInput = document.getElementById('fileUpload-background');
    resetInput(fileInput);
}

function cancel_button_background() {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancelButton = document.getElementById('cancel-button-background');

    cancelButton.removeEventListener('click', removebackgroundview()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removebackgroundview());
}

//恢复默认背景
function backto_ori() {
    var confirmDialog = document.getElementById("confirm-box-background");
    var confirmBtn = document.getElementById("confirmBtn-background");
    var cancelBtn = document.getElementById("cancelBtn-background");
    var parent = document.getElementById("content");

    confirmDialog.style.display = "block";
    addCover(parent);

    confirmBtn.onclick = function () {
        confirmDialog.style.display = "none";
        getbackgrounddata_ori();
        var backto_done = document.getElementById('backto-ori');
        backto_done.style.display = "block";

        document.getElementById('close').onclick = function () {
            var backto_done = document.getElementById('backto-ori');
            backto_done.style.display = "none";
            removeCover(parent);
        }
    }


    cancelBtn.onclick = function () {
        confirmDialog.style.display = "none";
        removeCover(parent);
    }


}