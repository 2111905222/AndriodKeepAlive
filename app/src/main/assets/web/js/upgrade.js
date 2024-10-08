//**********************app*****************************

//查询全部导览路线信息
function getUpgradedata() { //pageNum
    $.ajax({
        url: "/SearchApk",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            var new_app = document.getElementById('no-box-upgrade');
            // console.log(data);
            if (data != null) {
                if (data.length == 0) {
                    img_upgrade.style.display = "inline";
                    table_upgrade.style.display = "none";
                    new_app.style.display = "block";

                }
                else {
                    new_app.style.display = "none";
                    img_upgrade.style.display = "none";
                    table_upgrade.style.display = "table";
                    data_upgrade.length = 0;
                    gen_data_upgrade(data.APK);
                }
            }
        }
    })
}

//新增上传文件(app)
function apkuploadFile() {
    var fileInput_app = document.getElementById('fileUpload-app');//命名不能重复
    const formData_app = new FormData();

    fileInput_app.addEventListener('change', function () {
        var app_file = document.getElementById('app-file');
        var chooseFile = document.getElementById('choose-app');
        chooseFile.style.display = 'none';

        var file = fileInput_app.files[0];
        formData_app.append('appFile', file);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'data:file/apk;base64,');
        xhr.onload = function () {
            if (xhr.status === 200) {
                if (fileInput_app.files.length == 0) {
                    app_file.value = "";
                }
                else {
                    if (file.name.indexOf("apk") == -1) {
                        chooseFile.style.display = 'inline';
                    }
                    else {
                        app_file.value = file.name; //获取文件名
                        app_file.style.color = "black";
                    }

                }

            } else {
                alert('上传失败：' + xhr.statusText);
            }
        };
        xhr.send(formData_app);
    });
}

// function apkuploadFilebj() {
//     var fileInput_app = document.getElementById('fileUpload-app-bj');//命名不能重复
//     const formData_app = new FormData();

//     fileInput_app.addEventListener('change', function () {
//         var app_file = document.getElementById('app-file-bj');
//         var chooseFile = document.getElementById('choose-app-bj');
//         chooseFile.style.display = 'none';

//         var file = fileInput_app.files[0];
//         formData_app.append('appFile', file);

//         var xhr = new XMLHttpRequest();
//         xhr.open('POST', 'data:file/apk;base64,');
//         xhr.onload = function () {
//             if (xhr.status === 200) {
//                 if (fileInput_app.files.length == 0) {
//                     app_file.value = "";
//                 }
//                 else {
//                     if (file.name.indexOf("apk") == -1) {
//                         chooseFile.style.display = 'inline';
//                     }
//                     else {
//                         app_file.value = file.name; //获取文件名
//                         app_file.style.color = "black";
//                     }

//                 }

//             } else {
//                 alert('上传失败：' + xhr.statusText);
//             }
//         };
//         xhr.send(formData_app);
//     });
// }

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

//添加按钮打开侧边栏
function add_app() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var sidebar_app = document.getElementById("pullsidebar-app");
    // 显示侧边栏
    sidebar_app.style.display = "block";
    // sidebar_app.classList.add("in");
    // 
    addCover(parent);
}

function addDataBtn_app() {
    var addDataBtn_app = document.getElementById("add-data-btn-app");

    addDataBtn_app.removeEventListener("click", add_app());
    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_app.addEventListener("click", add_app());
}

//重置选择文件按钮
function resetInput(fileInput) {
    fileInput.value = '';
    fileInput.form.reset();
}

//保存和取消时关闭侧边栏
function removeappview() {
    // 获取侧边栏和上传表单元素
    var sidebar_app = document.getElementById("pullsidebar-app");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    sidebar_app.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    var fileInput = document.getElementById('fileUpload-app');
    resetInput(fileInput);
    var app_file = document.getElementById('app-file');
    app_file.value = "";
    var chooseFile = document.getElementById('choose-app');
    chooseFile.style.display = 'none';

}

function cancel_button_app(input) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancelButton = document.getElementById('cancel-button-app');

    cancelButton.removeEventListener('click', removeappview()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removeappview());
}



function gen_data_upgrade(fileInput) {
    var table = document.getElementById("data-table-upgrade");
    // 创建新的数据行
    // 创建新的一行
    var row = table.insertRow(-1);
    // var newRow = document.createElement("tr");

    // 创建新的数据单元格，并设置其内容为文件名
    // 获取表格中最后一行的序号，如果表格中没有行，则从 1 开始
    var lastRowIndex = table.rows.length - 2;
    var lastRowNumber = lastRowIndex >= 1 ? parseInt(table.rows[lastRowIndex].cells[0].innerText) : 0;
    // console.log(lastRowIndex) //控制端显示

    // 设置新行的序号
    var cell0 = row.insertCell(0);
    var RowNumber = lastRowNumber + 1;
    cell0.innerText = RowNumber;

    // 设置新行的其他单元格
    var cell1 = row.insertCell(1);
    cell1.innerText = fileInput;
    var cell2 = row.insertCell(2);
    // var link1 = document.createElement("a");
    // link1.href = "#";
    // link1.textContent = "下载";
    // link1.className = "download-upgrade-link";
    // link1.onclick = download_upgrade();
    // cell2.appendChild(link1);
    var link2 = document.createElement("a");
    link2.href = "#";
    link2.textContent = "更新";
    link2.className = "upgrade-link";
    link2.onclick = upgrade_app();
    cell2.appendChild(link2);
    // var link3 = document.createElement("a");
    // link3.href = "#";
    // link3.textContent = "更换APP";
    // link3.className = "upload-link";
    // link3.onclick = upload_app();
    // cell2.appendChild(link3);

    table.querySelector("tbody").appendChild(row);
    // 将 tr 数据加入到 data 数组中
    data_upgrade.push(row);
    // console.log(data_upgrade);


    // 更新总行数和总页数
    // totalRows_upgrade = table.rows.length; //算上的th行
    totalRows_upgrade = data_upgrade.length;
    totalPages_upgrade = Math.ceil(totalRows_upgrade / rowsPerPage_upgrade);

    // 计算新行所处的页码
    var newRowIndex_upgrade = totalRows_upgrade - 1;
    var newPage_upgrade = Math.ceil((newRowIndex_upgrade + 1) / rowsPerPage_upgrade);
    currentPage_upgrade = newPage_upgrade;

    // console.log(table.rows.length, totalRows_upgrade % rowsPerPage_upgrade, totalRows_upgrade, currentPage_upgrade, totalPages_upgrade)

    // 如果当前页满了，就换页
    if (totalRows_upgrade % rowsPerPage_upgrade == 1 && currentPage_upgrade != 1) {
        updatePageNumber_upgrade();
    }
    displayTable_upgrade(data_upgrade);
    // localStorage.setItem("data_upgrade", JSON.stringify(data_upgrade));
}

// 显示表格
function displayTable_upgrade(data_upgrade) {
    // console.log("row:",data_upgrade);
    // console.log(data_upgrade.length);
    // console.log(table_upgrade);
    if (data_upgrade.length > 0) {
        img_upgrade.style.display = "none";
        table_upgrade.style.display = "table";
    }
    else {
        img_upgrade.style.display = "inline";
        table_upgrade.style.display = "none";
    }
    // 清空表格
    table_upgrade.querySelector("tbody").innerHTML = "";


    // 计算当前页的数据
    var startIndex_upgrade = (currentPage_upgrade - 1) * rowsPerPage_upgrade;
    var endIndex_upgrade = Math.min(startIndex_upgrade + rowsPerPage_upgrade, data_upgrade.length);
    var pageData_upgrade = data_upgrade.slice(startIndex_upgrade, endIndex_upgrade);

    // console.log(pageData);

    // 生成表格数据
    pageData_upgrade.forEach(row => {
        // const row = document.createElement("tr");
        // rowData.forEach(cellData => {
        //     const cell = document.createElement("td");
        //     cell.textContent = cellData;
        //     row.appendChild(cell);
        // });

        table_upgrade.querySelector("tbody").appendChild(row);
    });

    var tableBody = document.getElementById("tbody-upgrade");


    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_upgrade - 1) * rowsPerPage_upgrade + i + 1;
    }

    if (totalPages_upgrade > 1) {
        var pagination = document.getElementById("pagination-upgrade");
        pagination.style.display = "flex";
    }
}

// 更新页码函数
function updatePageNumber_upgrade() {
    // 找到页码元素
    var pageNumberElement_upgrade = document.getElementById("page-number-upgrade");

    if (currentPage_upgrade > totalPages_upgrade) currentPage_upgrade = totalPages_upgrade;

    // 更新页码文本
    pageNumberElement_upgrade.innerHTML = `${currentPage_upgrade}/${totalPages_upgrade}`;

    // 找到上一页和下一页元素
    var prevPageLink_upgrade = document.getElementById("prev-page-upgrade");
    var nextPageLink_upgrade = document.getElementById("next-page-upgrade");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_upgrade == 1) {
        prevPageLink_upgrade.classList.add("disabled");
    } else {
        prevPageLink_upgrade.classList.remove("disabled");
    }

    if (currentPage_upgrade == totalPages_upgrade) {
        nextPageLink_upgrade.classList.add("disabled");
    } else {
        nextPageLink_upgrade.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_upgrade == 1) || (totalPages_upgrade == 0)) {
        currentPage_upgrade = 1;
        displayTable_upgrade(data_upgrade);
        var pagination = document.getElementById("pagination-upgrade");
        pagination.style.display = "none";
    }
}

// 首页显示
function show_first_upgrade() {
    currentPage_upgrade = 1;
    updatePageNumber_upgrade();
    displayTable_upgrade(data_upgrade);
}

// 上一页函数
function prevPage_upgrade() {
    if (currentPage_upgrade > 1) {
        // showPage(currentPage_upgrade - 1);
        currentPage_upgrade--;
        displayTable_upgrade(data_upgrade);
        updatePageNumber_upgrade();
    }
}

// 下一页函数
function nextPage_upgrade() {
    if (currentPage_upgrade < totalPages_upgrade) {
        // showPage(currentPage_upgrade + 1);
        currentPage_upgrade++;
        displayTable_upgrade(data_upgrade);
        updatePageNumber_upgrade();
    }
}

function gotoPage_upgrade() {
    // 找到输入框和确定按钮元素
    var inputBox_upgrade = document.getElementById("page-input-upgrade");
    var button_upgrade = document.getElementById("goto-button-upgrade");

    // 获取输入的页码
    var pageNumber_upgrade = parseInt(inputBox_upgrade.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_upgrade >= 1 && pageNumber_upgrade <= totalPages_upgrade) {
        // showPage(pageNumber);
        currentPage_upgrade = pageNumber_upgrade;
        displayTable_upgrade(data_upgrade);
        updatePageNumber_upgrade();
    }

    // 清空输入框
    inputBox_upgrade.value = "";
}





function downloadFile() {
    var progress_div = document.getElementById('myProgress');
    var progress = document.getElementById('progress');
    var status = document.getElementById('myStatus');
    var download = document.getElementById("download-box-upgrade");
    var parent = document.getElementById("content");
    var close = document.getElementById("close");
    var progressPercentage = document.getElementById('progress-percentage');


    // 自动更新进度条,采用定时器
    progress.value = 0; //重置
    progress_div.style.display = "block";
    var intervalId = setInterval(function () {
        if (progress.value < progress.max) {
            progress.value += 10;
            progressPercentage.innerHTML = progress.value + '%'; // 更新百分数显示
        } else {
            clearInterval(intervalId);
            progress_div.style.display = 'none';
            status.innerHTML = '更新安装完成,点击关闭按钮';
            status.style.display = 'block';
        }
    }, 100);

    close.addEventListener('click', function () {
        download.style.display = "none";
        status.style.display = 'none';
        //删除遮挡
        removeCover(parent);
    })

}

function noupgrade() {
    var noupgrade = document.getElementById("no-box-upgrade");
    var close = document.getElementById("close-no");
    var parent = document.getElementById("content");

    noupgrade.style.display = 'block';
    addCover(parent);

    close.addEventListener('click', function () {
        noupgrade.style.display = "none";
        //删除遮挡
        removeCover(parent);
    })
}



//下载该版本
function download_upgrade() {
    // 获取所有删除链接，并添加点击事件
    var tableBody = document.getElementById("tbody-upgrade");
    var confirmDialog = document.getElementById("confirm-box-download");
    var confirmBtn = document.getElementById("confirmBtn-download");
    var cancelBtn = document.getElementById("cancelBtn-download");
    var download = document.getElementById("download-box-upgrade");

    tableBody.onclick = function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        if (target.classList.contains("download-upgrade-link")) {
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                confirmDialog.style.display = "none";
                download.style.display = "block";
                downloadFile();
            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    };
}

function installApk() {
    $.ajax({
        url: '/installAPK',//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function () {
//            downloadFile();
        }
    })
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
            var psw = document.getElementById('password');
            var confirmDialog = document.getElementById("confirm-box-upgrade");
            var parent = document.getElementById("content");
            var wrong = document.getElementById("wrong");
            var download = document.getElementById("download-box-upgrade");
            if (data != null) {
                if (data.result == true) {
                    psw.value = "";
                    confirmDialog.style.display = "none";
                    removeCover(parent);
                    download.style.display = "block";
                    downloadFile();
                    installApk();
                }
                else {
                    psw.style.color = "red";
                    wrong.style.display = "inline";
                    psw.onclick = function () {
                        psw.value = "";
                        psw.style.color = "black";
                        wrong.style.display = "none";
                    }
                }
            }
        },
        error: function (arg1) {
            alert("密码验证失败");
            console.log(arg1);
            psw.value = "";
            confirmDialog.style.display = "none";
            removeCover(parent);
        }
    })
}



function upgrade_app() {
    var tableBody = document.getElementById("tbody-upgrade");
    // var cancelButton = document.getElementById('cancel-button-app');
    // 获取弹窗元素
    var confirmDialog = document.getElementById("confirm-box-upgrade");
    var confirmBtn = document.getElementById("confirmBtn-upgrade");
    var cancelBtn = document.getElementById("cancelBtn-upgrade");

    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        // 输出每个元素的名称和值
        // console.log(formData_ad.getAll('imageFile'));
        var wrong = document.getElementById("wrong");
        var psw = document.getElementById('password');

        if (target.classList.contains("upgrade-link")) {
            event.stopImmediatePropagation();
            // 显示侧边栏
            confirmDialog.style.display = "block";
            addCover(parent);
            wrong.style.display = "none";
            psw.value = "";

            confirmBtn.onclick = function () {
                var url = 'VerifyPassword?password=' + psw.value;
                verifyPassword(url);
            }

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                removeCover(parent);
                psw.value = "";
            };

        }
    });
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