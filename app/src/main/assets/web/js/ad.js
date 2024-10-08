//**********************广告*****************************
//查询全部广告信息
function getAdvdata() { //pageNum
    $.ajax({
        url: "/SearchAllAdv",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null) {
                if (data.length == 0) {
                    img_ad.style.display = "inline";
                    table_ad.style.display = "none";
                }
                else {
                    img_ad.style.display = "none";
                    table_ad.style.display = "table";
                    data_ad.length = 0;
                    for (var i = 0; i < data.length; i++) {
                        gen_data_ad(table_ad, 'null', data[i].id);
                    }
                }
            }

            // if (data_ad.length > 0) show_first_ad();
        }
    })
}

function getAdvdata1() {
    var table = document.getElementById("data-table-ad");
    data_ad.length = 0;
    gen_data_ad(table, 'g', 1);
    gen_data_ad(table, 's', 2);
    gen_data_ad(table, 'f', 3);
    // if (data_ad.length > 0) show_first_ad();

}

// 广告
function fileUpload_ad() {
    //上传文件(广告)
    var fileInput_ad = document.getElementById('fileUpload-ad');
    // var previewDiv = document.getElementById('preview');
    var previewDiv = document.querySelector('#preview');
    const formData_ad = new FormData();
    // 获取FormData中的所有元素
    const entries = formData_ad.entries();

    fileInput_ad.addEventListener('change', function () {
        // 清空显示区域
        previewDiv.innerHTML = '';
        var ad_file = document.getElementById('ad-file');

        var file = fileInput_ad.files[0];

        var xhr = new XMLHttpRequest();

        // 通过文件类型判断是图片还是视频
        if (file.type.startsWith('image/')) {

            formData_ad.append('imageFile', file);

            xhr.open('POST', 'data:image/png,image/jpg,image/jpeg;base64,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 是图片，显示在页面上
                    var img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.width = 320;
                    img.height = 400;
                    previewDiv.appendChild(img);
                    ad_file.value = file.name;
                    ad_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };

        } else if (file.type.startsWith('video/')) {
            // 是视频，显示在页面上
            formData_ad.append('videoFile', file);

            xhr.open('POST', 'data:video/mp4,video/webm,video/ogg;charset=UTF-8,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 是图片，显示在页面上
                    var video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    // // 设置视频宽度和高度
                    video.width = 320;
                    video.height = 160;

                    // // 设置视频边框样式
                    // video.style.border = '1px dashed #aca9a9';
                    previewDiv.appendChild(video);
                    ad_file.value = file.name;
                    ad_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };

        } else {
            // 不是图片也不是视频，给出错误提示
            previewDiv.textContent = '不支持的文件类型';
        }

        xhr.send(formData_ad);
    });
}


function fileUpload_adbj() {
    //上传文件(广告)
    var fileInput_ad = document.getElementById('fileUpload-ad-bj');
    // var previewDiv = document.getElementById('preview');
    var previewDiv = document.querySelector('#preview-bj');
    const formData_ad = new FormData();
    // 获取FormData中的所有元素
    const entries = formData_ad.entries();

    fileInput_ad.addEventListener('change', function () {
        // 清空显示区域
        previewDiv.innerHTML = '';
        var ad_file = document.getElementById('ad-file-bj');

        var file = fileInput_ad.files[0];

        var xhr = new XMLHttpRequest();

        // 通过文件类型判断是图片还是视频
        if (file.type.startsWith('image/')) {

            formData_ad.append('imageFile', file);

            xhr.open('POST', 'data:image/png,image/jpg;base64,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 是图片，显示在页面上
                    var img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.width = 320;
                    img.height = 400;
                    previewDiv.appendChild(img);
                    ad_file.value = file.name;
                    ad_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };

        } else if (file.type.startsWith('video/')) {
            // 是视频，显示在页面上
            formData_ad.append('videoFile', file);

            xhr.open('POST', 'data:video/mp4,video/webm,video/ogg;charset=UTF-8,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 是图片，显示在页面上
                    var video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    // // 设置视频宽度和高度
                    video.width = 320;
                    video.height = 160;

                    // // 设置视频边框样式
                    // video.style.border = '1px dashed #aca9a9';
                    previewDiv.appendChild(video);
                    ad_file.value = file.name;
                    ad_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };

        } else {
            // 不是图片也不是视频，给出错误提示
            previewDiv.textContent = '不支持的文件类型';
        }

        xhr.send(formData_ad);
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
    var cover = parent.querySelector('.cover'); //必须为const
    if (cover) {
        cover.remove();
    }
}


//添加按钮打开侧边栏
function add_ad() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var sidebar_ad = document.getElementById("pullsidebar-ad");
    // 显示侧边栏
    sidebar_ad.style.display = "block";
    // sidebar_ad.classList.add("in");
    // 
    addCover(parent);
}

function addDataBtn_ad() {
    var addDataBtn_ad = document.getElementById("add-data-btn-ad");

    addDataBtn_ad.removeEventListener("click", add_ad());
    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_ad.addEventListener("click", add_ad());
}

//保存和取消时关闭侧边栏
function removeadview() {
    // 获取侧边栏和上传表单元素
    var sidebar_ad = document.getElementById("pullsidebar-ad");
    var parent = document.getElementById("content");
    // 关闭侧边栏
    sidebar_ad.style.display = 'none';
    // sidebar_ad.classList.remove("in");
    //删除遮挡
    removeCover(parent);
    var fileInput = document.getElementById('fileUpload-ad');
    resetInput(fileInput);
    var previewDiv = document.querySelector('#preview');
    previewDiv.innerHTML = '';

}

function save_button_ad(input) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var saveButton = document.getElementById('save-button-ad');

    //自动添加表格行
    var not_save = addtrad(event);

    if (!not_save) {
        // 为保存按钮添加点击事件处理程序
        saveButton.removeEventListener('click', removeadview());
        saveButton.addEventListener('click', removeadview());
    }
    else {
        var fileInput = document.getElementById("ad-name");
        var addInput = document.getElementById('ad-file');
        var chooseFile = document.getElementById("choose_ad");
        var uploadFile = document.getElementById("fileUpload-ad");

        if (fileInput.value == "") {
            fileInput.value = "必须输入广告名称"
            fileInput.style.color = "red";
        }

        else if ((addInput.value == "") || ((addInput.value.indexOf("jpg") === -1) && (addInput.value.indexOf("png") === -1) && (addInput.value.indexOf("jpeg") === -1) && (addInput.value.indexOf("mp4") === -1))) {
            // addInput.value = "必须选择广告文件"
            // addInput.style.color = "red";
            chooseFile.style.display = "inline";
        }
        else {
            fileInput.value = "已有该名称,请重新输入"
            fileInput.style.color = "red";
        }

        fileInput.addEventListener('click', () => {
            fileInput.value = "";
            fileInput.style.color = "black";
        });
        uploadFile.addEventListener('click', () => {
            chooseFile.style.display = "none";
        });
    }

}

function cancel_button_ad(input) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancelButton = document.getElementById('cancel-button-ad');

    // 为保存按钮添加点击事件处理程序
    cancelButton.removeEventListener('click', removeadview());
    cancelButton.addEventListener('click', removeadview());
}

function gen_data_ad(table, fileInput, fileNum) {
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
    if (fileNum == "")
        cell0.innerText = RowNumber;
    else
        cell0.innerText = fileNum;

    // 设置新行的其他单元格
    // var cell1 = row.insertCell(1);
    // cell1.innerText = fileInput;
    // var cell2 = row.insertCell(2);
    var cell2 = row.insertCell(1);
    // var link1 = document.createElement("a");
    // link1.href = "#";
    // link1.textContent = "上升";
    // link1.className = "up-ad-link";
    // link1.onclick = up_ad();
    // cell2.appendChild(link1);
    // var link2 = document.createElement("a");
    // link2.href = "#";
    // link2.textContent = "下降";
    // link2.className = "down-ad-link";
    // link2.onclick = down_ad();
    // cell2.appendChild(link2);
    var link3 = document.createElement("a");
    link3.href = "#";
    link3.textContent = "编辑";
    link3.className = "write-ad-link";
    link3.onclick = write_ad();
    cell2.appendChild(link3);
    var link4 = document.createElement("a");
    link4.href = "#";
    link4.textContent = "删除";
    link4.className = "delete-ad-link";
    link4.onclick = del_ad();
    cell2.appendChild(link4);

    // 将新的数据行添加到表格中
    table.querySelector("tbody").appendChild(row);

    // 将 tr 数据加入到 data 数组中
    //次序
    if ((fileNum >= 1) && (fileNum <= data_ad.length)) {
        data_ad.splice(fileNum - 1, 0, row);
        // console.log(data_ad);
    }
    else
        data_ad.push(row);


    // 更新总行数和总页数
    // totalRows_ad = table.rows.length; //算上的th行
    totalRows_ad = data_ad.length;
    totalPages_ad = Math.ceil(totalRows_ad / rowsPerPage_ad);

    // 计算新行所处的页码
    var newRowIndex_ad = totalRows_ad - 1;
    var newPage_ad = Math.ceil((newRowIndex_ad + 1) / rowsPerPage_ad);
    currentPage_ad = newPage_ad;

    // console.log(table.rows.length, totalRows_ad % rowsPerPage_ad, totalRows_ad, currentPage_ad, totalPages_ad)

    // 如果当前页满了，就换页
    if (totalRows_ad % rowsPerPage_ad == 1 && currentPage_ad != 1) {
        // showPage(currentPage_ad - 1);
        //更新页码
        updatePageNumber_ad();
    }

    //更新显示,广告独有
    displayTable_ad();
}


//自动添加表格行
function addtrad(event) {
    var fileUploadForm = document.getElementById("file-upload-form-ad");
    // 阻止表单默认提交行为
    event.preventDefault();

    // 获取文件输入框
    var fileInput = document.getElementById("ad-name");//广告名称
    var fileNum = document.getElementById("ad-num");//广告次序
    var addInput = document.getElementById('ad-file');

    // 获取表格元素
    var table = document.getElementById("data-table-ad");
    var have_name = false;

    for (var i = 0; i < data_ad.length; i++) {
        // console.log(i);
        if (data_ad[i].children[1].innerText == fileInput.value) {
            have_name = true;
        }
    }


    if (have_name || (fileInput.value == "") || (fileInput.value == "必须输入广告名称") || (addInput.value == "") || (addInput.value == "必须选择图片或视频广告文件") || ((addInput.value.indexOf("jpg") === -1) && (addInput.value.indexOf("png") === -1) && (addInput.value.indexOf("jpeg") === -1) && (addInput.value.indexOf("mp4") === -1))) {
        console.log(addInput.value);
        return 1;
    }
    else {
        gen_data_ad(table, fileInput.value, fileNum.value);
        return 0;
    }
}

// 原始显示表格
// function displayTable_ad() {
//     if (data_ad.length > 0) {
//         // 如果数据长度为空，则显示图片
//         // 否则不显示img，以便表格数据显示
//         img_ad.style.display = "none";
//         table_ad.style.display = "table";
//     }
//     else {
//         img_ad.style.display = "inline";
//         table_ad.style.display = "none";
//     }
//     // 清空表格
//     table_ad.querySelector("tbody").innerHTML = "";

//     // 计算当前页的数据
//     var startIndex = (currentPage_ad - 1) * rowsPerPage_ad;
//     var endIndex = Math.min(startIndex + rowsPerPage_ad, data_ad.length);
//     // 生成表格数据
//     var pageData = data_ad.slice(startIndex, endIndex);
//     pageData.forEach(rowData => {
//         table_ad.querySelector("tbody").appendChild(rowData);
//     });

//     var tableBody = document.getElementById("tbody-ad");


//     var rows = tableBody.getElementsByTagName("tr");
//     for (var i = 0; i < rows.length; i++) {
//         // console.log(i);
//         rows[i].children[0].innerText = (currentPage_ad - 1) * rowsPerPage_ad + i + 1;
//     }

//     // console.log(data_ad[0].children[2]);

//     //实现仅有一条数据时,没有上升下降;多行数据时第一行没有上升,最后一行没有下降,上升下降均占位隐藏
//     if (totalPages_ad == 1) {
//         if (data_ad.length == 1) {//仅有1页,1行,则不显示上升下降
//             data_ad[0].children[2].children[0].style.display = "none";
//             data_ad[0].children[2].children[1].style.display = "none";
//         }
//         else {
//             for (var i = 0; i < data_ad.length; i++) {
//                 data_ad[i].children[2].children[0].style.display = "";
//                 data_ad[i].children[2].children[1].style.display = "";
//             }
//             data_ad[0].children[2].children[0].style.visibility = "hidden";//占位隐藏
//             data_ad[0].children[2].children[1].style.visibility = "visible";//占位显示
//             data_ad[1].children[2].children[0].style.visibility = "visible";//占位显示
//             data_ad[1].children[2].children[1].style.visibility = "visible";//占位显示
//             data_ad[data_ad.length - 2].children[2].children[1].style.visibility = "visible";//最后一个的上一个下降变占位显示
//             data_ad[data_ad.length - 1].children[2].children[0].style.visibility = "visible";//最后一个上升占位显示
//             data_ad[data_ad.length - 1].children[2].children[1].style.visibility = "hidden";//最后一个下降占位隐藏
//         }

//     }
//     else {
//         data_ad[0].children[2].children[0].style.visibility = "hidden";//第一行的上升占位隐藏
//         data_ad[0].children[2].children[1].style.visibility = "visible";//第一行的下降占位显示
//         data_ad[1].children[2].children[0].style.visibility = "visible";//第二行的上升占位显示
//         data_ad[data_ad.length - 1].children[2].children[0].style.visibility = "visible";//最后一个上升占位显示
//         data_ad[data_ad.length - 1].children[2].children[1].style.visibility = "hidden";//最后一个下降占位隐藏
//         data_ad[data_ad.length - 2].children[2].children[1].style.visibility = "visible";//最后一个的上一个下降变占位显示
//         data_ad[rowsPerPage_ad - 1].children[2].children[1].style.visibility = "visible";//第一页最后一个下降变占位显示
//         // console.log(data_ad[data_ad.length - 2].children[2]);
//         // console.log(data_ad[data_ad.length - 1].children[2]);
//     }

//     // console.log(pageData);


//     if (totalPages_ad > 1) {
//         var pagination = document.getElementById("pagination-ad");
//         pagination.style.display = "flex";
//     }

// }

function displayTable_ad() {
    if (data_ad.length > 0) {
        // 如果数据长度为空，则显示图片
        // 否则不显示img，以便表格数据显示
        img_ad.style.display = "none";
        table_ad.style.display = "table";
    }
    else {
        img_ad.style.display = "inline";
        table_ad.style.display = "none";
    }
    // 清空表格
    table_ad.querySelector("tbody").innerHTML = "";

    // 计算当前页的数据
    var startIndex = (currentPage_ad - 1) * rowsPerPage_ad;
    var endIndex = Math.min(startIndex + rowsPerPage_ad, data_ad.length);
    // 生成表格数据
    var pageData = data_ad.slice(startIndex, endIndex);
    pageData.forEach(rowData => {
        table_ad.querySelector("tbody").appendChild(rowData);
    });

    var tableBody = document.getElementById("tbody-ad");


    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_ad - 1) * rowsPerPage_ad + i + 1;
    }


    // //实现仅有一条数据时,没有上升下降;多行数据时第一行没有上升,最后一行没有下降,上升下降均占位隐藏
    // if (totalPages_ad == 1) {
    //     if (data_ad.length == 1) {//仅有1页,1行,则不显示上升下降
    //         data_ad[0].children[1].children[0].style.display = "none";
    //         data_ad[0].children[1].children[1].style.display = "none";
    //     }
    //     else {
    //         for (var i = 0; i < data_ad.length; i++) {
    //             data_ad[i].children[1].children[0].style.display = "";
    //             data_ad[i].children[1].children[1].style.display = "";
    //         }
    //         data_ad[0].children[1].children[0].style.visibility = "hidden";//占位隐藏
    //         data_ad[0].children[1].children[1].style.visibility = "visible";//占位显示
    //         data_ad[1].children[1].children[0].style.visibility = "visible";//占位显示
    //         data_ad[1].children[1].children[1].style.visibility = "visible";//占位显示
    //         data_ad[data_ad.length - 2].children[1].children[1].style.visibility = "visible";//最后一个的上一个下降变占位显示
    //         data_ad[data_ad.length - 1].children[1].children[0].style.visibility = "visible";//最后一个上升占位显示
    //         data_ad[data_ad.length - 1].children[1].children[1].style.visibility = "hidden";//最后一个下降占位隐藏
    //     }

    // }
    // else {
    //     data_ad[0].children[1].children[0].style.visibility = "hidden";//第一行的上升占位隐藏
    //     data_ad[0].children[1].children[1].style.visibility = "visible";//第一行的下降占位显示
    //     data_ad[1].children[1].children[0].style.visibility = "visible";//第二行的上升占位显示
    //     data_ad[data_ad.length - 1].children[1].children[0].style.visibility = "visible";//最后一个上升占位显示
    //     data_ad[data_ad.length - 1].children[1].children[1].style.visibility = "hidden";//最后一个下降占位隐藏
    //     data_ad[data_ad.length - 2].children[1].children[1].style.visibility = "visible";//最后一个的上一个下降变占位显示
    //     data_ad[rowsPerPage_ad - 1].children[1].children[1].style.visibility = "visible";//第一页最后一个下降变占位显示
    // }

    // // console.log(pageData);


    if (totalPages_ad > 1) {
        var pagination = document.getElementById("pagination-ad");
        pagination.style.display = "flex";
    }

}

function updatePageNumber_ad() {
    // 找到页码元素
    var pageNumberElement = document.getElementById("page-number-ad");

    //这里可解决最后一页的数据删除后仍显示空的最后一页
    if (currentPage_ad > totalPages_ad) currentPage_ad = totalPages_ad;

    // 更新页码文本
    pageNumberElement.innerHTML = `${currentPage_ad}/${totalPages_ad}`;

    // 找到上一页和下一页元素
    var prevPageLink_ad = document.getElementById("prev-page-ad");
    var nextPageLink_ad = document.getElementById("next-page-ad");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_ad == 1) {
        prevPageLink_ad.classList.add("disabled");
    } else {
        prevPageLink_ad.classList.remove("disabled");
    }

    if (currentPage_ad == totalPages_ad) {
        nextPageLink_ad.classList.add("disabled");
    } else {
        nextPageLink_ad.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_ad == 1) || (totalPages_ad == 0)) {
        currentPage_ad = 1;
        displayTable_ad();
        var pagination = document.getElementById("pagination-ad");
        pagination.style.display = "none";
    }
}

// 首页显示
function show_first_ad() {
    currentPage_ad = 1;
    updatePageNumber_ad();
    displayTable_ad();
}

// 上一页函数
function prevPage_ad() {
    if (currentPage_ad > 1) {
        // showPage(currentPage_ad - 1);
        currentPage_ad--;
        displayTable_ad();
        updatePageNumber_ad();
    }
}

// 下一页函数
function nextPage_ad() {
    if (currentPage_ad < totalPages_ad) {
        // showPage(currentPage_ad + 1);
        currentPage_ad++;
        displayTable_ad();
        updatePageNumber_ad();
    }
}

function gotoPage_ad() {
    // 找到输入框和确定按钮元素
    var inputBox_ad = document.getElementById("page-input-ad");
    var button_ad = document.getElementById("goto-button-ad");

    // 获取输入的页码
    var pageNumber_ad = parseInt(inputBox_ad.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_ad >= 1 && pageNumber_ad <= totalPages_ad) {
        // showPage(pageNumber);
        currentPage_ad = pageNumber_ad;
        displayTable_ad();
        updatePageNumber_ad();
    }

    // 清空输入框
    inputBox_ad.value = "";
}

//原始行上移
// function up_ad() {
//     var tableBody = document.getElementById("tbody-ad");
//     var confirmDialog = document.getElementById("confirm-box-up");
//     var confirmBtn = document.getElementById("confirmBtn-ad-up");
//     var cancelBtn = document.getElementById("cancelBtn-ad-up");


//     // tableBody.onclick = function (event) {
//     tableBody.addEventListener('click', function (event) {
//         var target = event.target;
//         var parent = document.getElementById("content");

//         if (target.classList.contains("up-ad-link")) {
//             confirmDialog.style.display = "block";
//             addCover(parent);

//             confirmBtn.onclick = function () {
//                 var row = target.parentNode.parentNode;
//                 var index = row.children[0].innerText - 1;//当前行data索引

//                 // console.log(data_ad[index - 1].children[1]);
//                 // console.log(data_ad[index].children[1]);

//                 // var temp = data_ad[index - 1];
//                 // data_ad[index - 1] = data_ad[index];
//                 // data_ad[index] = temp;

//                 // console.log(data_ad[index - 1].children[1]);
//                 // console.log(data_ad[index].children[1]);

//                 confirmDialog.style.display = "none";
//                 //删除遮挡
//                 removeCover(parent);

//                 // 更新显示
//                 // displayTable_ad();
//                 updatePageNumber_ad();
//             };

//             cancelBtn.onclick = function () {
//                 confirmDialog.style.display = "none";
//                 //删除遮挡
//                 removeCover(parent);
//             };
//         }
//     });//!!!!!!!!!!!没反应但不报错,切记查有没有加; 
// }

function moveRow(row, direction) {
    // 添加移动方向类
    row.classList.add(direction);

    // 等待 0.5 秒后移除移动方向类
    setTimeout(function () {
        row.classList.remove(direction);
    }, 500);
}

function up_ad() {
    var tableBody = document.getElementById("tbody-ad");
    var confirmDialog = document.getElementById("confirm-box-up");
    var confirmBtn = document.getElementById("confirmBtn-ad-up");
    var cancelBtn = document.getElementById("cancelBtn-ad-up");


    // tableBody.onclick = function (event) {
    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");

        if (target.classList.contains("up-ad-link")) {
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var currentRow = target.parentNode.parentNode;
                var index = currentRow.children[0].innerText - 1;//当前行data索引

                var tbody = currentRow.parentElement;//这句只显示了每页的数母
                // var index = Array.prototype.indexOf.call(tbody.rows, currentRow);//从0开始
                var preRow = tbody.rows[(index - 1) % rowsPerPage_ad];
                console.log(tbody);
                console.log(index, preRow);

                currentRow.classList.add('mbc');

                // 等待 0.5 秒后将下一行元素向下移动
                // setTimeout(function () {
                //     // 获取当前行元素的索引
                //     var index = Array.prototype.indexOf.call(rows, currentRow);

                //     // 获取下一行元素
                //     var nextRow = rows[index + 1];

                //     // 如果下一行存在，则将其向下移动
                //     if (nextRow) {
                //         moveRow(nextRow, 'move-down');
                //     }
                // }, 500);

                var temp = data_ad[index - 1];
                data_ad[index - 1] = data_ad[index];
                data_ad[index] = temp;

                // console.log(data_ad[index - 1].children[1]);
                // console.log(data_ad[index].children[1]);

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                if (index % rowsPerPage_ad != 0) {
                    moveRow(currentRow, 'move-up');
                    moveRow(preRow, 'move-down');
                    setTimeout(function () {
                        currentRow.classList.remove('mbc');
                    }, 1000);
                }
                else {
                    setTimeout(function () {
                        currentRow.classList.remove('mbc');
                    }, 200);
                    prevPage_ad();
                }



                // 更新显示
                displayTable_ad();
                updatePageNumber_ad();

            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    });//!!!!!!!!!!!没反应但不报错,切记查有没有加; 
}

//原始行下移
// function down_ad() {
//     var tableBody = document.getElementById("tbody-ad");
//     var confirmDialog = document.getElementById("confirm-box-down");
//     var confirmBtn = document.getElementById("confirmBtn-ad-down");
//     var cancelBtn = document.getElementById("cancelBtn-ad-down");


//     tableBody.onclick = function (event) { //只能有一个这种形式,其他都要用tableBody.addEventListener('click', function (event) {});,否则其他没反应
//         var target = event.target;
//         var parent = document.getElementById("content");

//         if (target.classList.contains("down-ad-link")) {
//             confirmDialog.style.display = "block";
//             addCover(parent);

//             confirmBtn.onclick = function () {
//                 var row = target.parentNode.parentNode;
//                 var index = row.children[0].innerText - 1;//当前行data索引

//                 var temp = data_ad[index + 1];
//                 data_ad[index + 1] = data_ad[index];
//                 data_ad[index] = temp;

//                 confirmDialog.style.display = "none";
//                 //删除遮挡
//                 removeCover(parent);

//                 // 更新显示
//                 displayTable_ad();
//                 updatePageNumber_ad();
//             };

//             cancelBtn.onclick = function () {
//                 confirmDialog.style.display = "none";
//                 //删除遮挡
//                 removeCover(parent);
//             };
//         }
//     };
// }

function down_ad() {
    var tableBody = document.getElementById("tbody-ad");
    var confirmDialog = document.getElementById("confirm-box-down");
    var confirmBtn = document.getElementById("confirmBtn-ad-down");
    var cancelBtn = document.getElementById("cancelBtn-ad-down");


    tableBody.onclick = function (event) { //只能有一个这种形式,其他都要用tableBody.addEventListener('click', function (event) {});,否则其他没反应
        var target = event.target;
        var parent = document.getElementById("content");

        if (target.classList.contains("down-ad-link")) {
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var currentRow = target.parentNode.parentNode;
                var index = currentRow.children[0].innerText - 1;//当前行data索引

                var tbody = currentRow.parentElement;
                // var index = Array.prototype.indexOf.call(tbody.rows, currentRow);
                var nextRow = tbody.rows[(index + 1) % rowsPerPage_ad];

                currentRow.classList.add('mbc');

                var temp = data_ad[index + 1];
                data_ad[index + 1] = data_ad[index];
                data_ad[index] = temp;

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                if (index % rowsPerPage_ad != 1) {
                    moveRow(currentRow, 'move-down');
                    moveRow(nextRow, 'move-up');
                    setTimeout(function () {
                        currentRow.classList.remove('mbc');
                    }, 1000);
                }
                else {
                    setTimeout(function () {
                        currentRow.classList.remove('mbc');
                    }, 200);
                    nextPage_ad();
                }



                // 更新显示
                displayTable_ad();
                updatePageNumber_ad();

            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    };
}

//查询全部广告信息并删除
function delADdatabyID(url, index) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null && data.length > 0) {
                //删除data中相应行
                data_ad.splice(index - 1, 1);
                //更新总页码
                totalRows_ad = data_ad.length;
                totalPages_ad = Math.ceil(totalRows_ad / rowsPerPage_ad);

                //计算删除行当前页码
                currentPage_ad = Math.ceil(index / rowsPerPage_ad);
                // 更新显示
                updatePageNumber_ad(); //要先更新页码,否则最后一页删除后不能跳转到上一页
                displayTable_ad();

            }
        }
    })
}

//删除该行
function del_ad() {
    // 获取所有删除链接，并添加点击事件
    var tableBody = document.getElementById("tbody-ad");
    var confirmDialog = document.getElementById("confirm-box-ad-del");
    var confirmBtn = document.getElementById("confirmBtn-ad-del");
    var cancelBtn = document.getElementById("cancelBtn-ad-del");

    // tableBody.onclick = function (event) {
    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        if (target.classList.contains("delete-ad-link")) {
            event.stopImmediatePropagation();
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var row = target.parentNode.parentNode;
                var index = row.children[0].innerText;
                var id = data_ad[index - 1].children[0].textContent;
                var url = 'DelAdvByID?id=' + id;
                tableBody.removeChild(row);
                // //更新序号
                // var rows = tableBody.getElementsByTagName("tr");
                // for (var i = 0; i < rows.length; i++) {
                //     console.log(i);
                //     rows[i].children[0].innerText = i + 1;
                // }
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                delADdatabyID(url, index);
            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    });
}

//查询全部广告信息并显示在编辑
function getADdatabyID(url) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null) {
                // var adname = document.getElementById('ad-name-bj');
                var num = document.getElementById('ad-num-bj');
                var fileInput = document.getElementById("preview-bj");
                var ad_file = document.getElementById('ad-file-bj');
                // adname.value = data.name;
                num.value = data.id;

                if ((data.url.indexOf("jpg") !== -1) || (data.url.indexOf("png") !== -1) || (data.url.indexOf("jpeg") !== -1)) {
                    var img = document.createElement('img');
                    img.src = data.url;
                    img.width = 320;
                    img.height = 400;
                    fileInput.appendChild(img);
                    ad_file.value = data.url;
                }
                else {
                    var video = document.createElement('video');
                    video.src = data.url;
                    video.controls = true;
                    // // 设置视频宽度和高度
                    video.width = 320;
                    video.height = 160;
                    fileInput.appendChild(video);
                    ad_file.value = data.url;
                }
            }
        }
    })
}

//编辑按钮打开侧边栏
function write_ad() {
    var tableBody = document.getElementById("tbody-ad");
    var saveButton = document.getElementById('save-button-ad-bj');
    var cancelButton = document.getElementById('cancel-button-ad-bj');


    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        // 输出每个元素的名称和值
        // console.log(formData_ad.getAll('imageFile'));
        // 获取侧边栏元素
        var sidebar_ad = document.getElementById("pullsidebar-ad-bj");

        if (target.classList.contains("write-ad-link")) {
            event.stopImmediatePropagation();
            // 显示侧边栏
            sidebar_ad.style.display = "block";
            addCover(parent);

            var row = target.parentNode.parentNode;
            var index = row.children[0].innerText;
            var id = data_ad[index - 1].children[0].textContent;
            var url = 'SearchAdvByID?id=' + id;
            getADdatabyID(url);


            cancelButton.onclick = function () {
                sidebar_ad.style.display = "none";
                removeCover(parent);
                removeadviewbj();
            };

        }
    });
}

//**********************编辑对应的侧边栏
//保存和取消时关闭侧边栏
function removeadviewbj() {
    // 获取侧边栏和上传表单元素
    var sidebar_ad = document.getElementById("pullsidebar-ad-bj");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    sidebar_ad.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    // // 清空显示区域
    var imgPreview = document.querySelector('#preview-bj');
    imgPreview.innerHTML = "";
    var fileInput = document.getElementById('fileUpload-ad-bj');
    resetInput(fileInput);
}

function addtradbj(index) {
    var fileUploadForm = document.getElementById("file-upload-form-ad-bj");
    // 阻止表单默认提交行为
    event.preventDefault();

    // 获取文件输入框
    var fileInput = document.getElementById("ad-name-bj");//广告名称
    var fileNum = document.getElementById("ad-num-bj");//广告次序
    var addInput = document.getElementById('ad-file-bj');

    var have_name = false;

    for (var i = 0; i < data_ad.length; i++) {
        // console.log(i);
        if (data_ad[i].children[1].innerText == fileInput.value) {
            have_name = true;
        }
    }

    if (have_name || (fileInput.value == "") || (fileInput.value == "必须输入广告名称") || (addInput.value == "") || (addInput.value == "必须选择图片或视频广告文件") || ((addInput.value.indexOf("jpg") === -1) && (addInput.value.indexOf("png") === -1) && (addInput.value.indexOf("jpeg") === -1) && (addInput.value.indexOf("mp4") === -1))) {
        return 1;
    }
    else {
        change_data_adbj(fileInput, fileNum, index);
        return 0;
    }

}

function change_data_adbj(fileInput, fileNum, index) {
    // 创建新的数据行
    // 仅修改了姓名部分
    if (fileNum.value != "") data_ad[index - 1].children[0].innerText = fileNum.value;
    data_ad[index - 1].children[1].innerText = fileInput.value;
    var row = data_ad[index - 1];

    console.log(fileNum.value);
    //次序
    if (fileNum.value != "") {
        data_ad.splice(index - 1, 1); //删除当前行
        if ((fileNum.value >= 1) && (fileNum.value <= data_ad.length)) {
            data_ad.splice(fileNum.value - 1, 0, row);//在数组中插入            
        }
        else data_ad.push(row);
    }

    // 更新总行数和总页数
    // totalRows_ad = table.rows.length; //算上的th行
    totalRows_ad = data_ad.length;
    totalPages_ad = Math.ceil(totalRows_ad / rowsPerPage_ad);

    // 计算新行所处的页码
    var newRowIndex_ad = totalRows_ad - 1;
    var newPage_ad = Math.ceil((newRowIndex_ad + 1) / rowsPerPage_ad);
    currentPage_ad = newPage_ad;

    // 如果当前页满了，就换页
    if (totalRows_ad % rowsPerPage_ad == 1 && currentPage_ad != 1) {
        // showPage(currentPage_ad - 1);
        //更新页码
        updatePageNumber_ad();
    }

    displayTable_ad();//更新显示
}


function save_button_adbj(index) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var saveButton = document.getElementById('save-button-ad-bj');

    //自动添加表格行
    var not_save = addtradbj(index);

    if (!not_save) {
        // 为保存按钮添加点击事件处理程序
        saveButton.removeEventListener('click', removeadviewbj());
        saveButton.addEventListener('click', removeadviewbj());
    }
    else {
        var fileInput = document.getElementById("ad-name-bj");
        var addInput = document.getElementById('ad-file-bj');
        var chooseFile = document.getElementById("choose_ad-bj");
        var uploadFile = document.getElementById("fileUpload-ad-bj");

        if (fileInput.value == "") {
            fileInput.value = "必须输入广告名称"
            fileInput.style.color = "red";
        }

        else if (addInput.value == "" || ((addInput.value.indexOf("jpg") === -1) && (addInput.value.indexOf("png") === -1) && (addInput.value.indexOf("jpeg") === -1) && (addInput.value.indexOf("mp4") === -1))) {
            // addInput.value = "必须上传广告文件"
            // addInput.style.color = "red";
            chooseFile.style.display = "inline";
        }
        else {
            fileInput.value = "已有该名称,请重新输入"
            fileInput.style.color = "red";
        }

        fileInput.addEventListener('click', () => {
            fileInput.value = "";
            fileInput.style.color = "black";
        });
        uploadFile.addEventListener('click', () => {
            chooseFile.style.display = "none";
        });
    }

}

function cancel_button_adbj() {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancelButton = document.getElementById('cancel-button-ad-bj');

    // 为保存按钮添加点击事件处理程序
    cancelButton.removeEventListener('click', removeadviewbj());
    cancelButton.addEventListener('click', removeadviewbj());
}


