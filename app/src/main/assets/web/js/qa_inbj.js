//**********************问答*****************************

//查询全部导航点信息
function getAllqadata(url) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            console.log(dataStr);
            data = JSON.parse(dataStr);
            if (data != null) {
                var nameInput = document.getElementById('qain-name');
                if (data.QA.length == 0) {
                    img_qa.style.display = "inline";
                    table_qa.style.display = "none";
                }
                else {

                    img_qa.style.display = "none";
                    table_qa.style.display = "table";
                    data_qa.length = 0;
                    nameInput.value = data.main.slice(0,-1);

                    for (var i = 0; i < data.QA.length; i++) {
                        console.log(data.main,data.QA[i].word);
                        gen_data_qain(table_qa, data.QA[i].word.slice(0,-1),data.QA[i].question);
                    }
                }
            }
        },
       error: function (arg1) {
                   alert("加载数据失败");
                   console.log(arg1);
               }
    })
}


// 问答
function fileUpload_qa_im() {
    //上传文件(问答)
    var fileInput_qa = document.getElementById('fileUpload-qain-im');
    // var previewDiv = document.getElementById('preview');
    var previewDiv = document.querySelector('#qa-im-preview');
    const formData_qa = new FormData();
    // 获取FormData中的所有元素
    const entries = formData_qa.entries();

    fileInput_qa.addEventListener('change', function () {
        // 清空显示区域
        previewDiv.innerHTML = '';
        var ad_file = document.getElementById('qa-im-file');

        var file = fileInput_qa.files[0];

        var xhr = new XMLHttpRequest();

        // 通过文件类型判断是否图片
        if (file.type.startsWith('image/')) {

            formData_qa.append('imageFile', file);

            xhr.open('POST', 'data:image/png,image/jpg,image/jpeg;base64,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 是图片，显示在页面上
                    var img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.width = 320;
                    img.height = 280;
                    previewDiv.appendChild(img);
                    ad_file.value = file.name;
                    ad_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };
        }
        else {
            // 不是图片也不是视频，给出错误提示
            previewDiv.textContent = '不支持的文件类型';
        }

        xhr.send(formData_qa);
    });
}

function fileUpload_qa_video() {
    //上传文件(问答)
    var fileInput_qa = document.getElementById('fileUpload-qain-video');
    // var previewDiv = document.getElementById('preview');
    var previewDiv = document.querySelector('#qa-video-preview');
    const formData_qa = new FormData();
    // 获取FormData中的所有元素
    const entries = formData_qa.entries();

    fileInput_qa.addEventListener('change', function () {
        // 清空显示区域
        previewDiv.innerHTML = '';
        var ad_file = document.getElementById('qa-video-file');

        var file = fileInput_qa.files[0];

        var xhr = new XMLHttpRequest();

        // 通过文件类型判断是不是视频
        if (file.type.startsWith('video/')) {
            // 是视频，显示在页面上
            formData_qa.append('videoFile', file);

            xhr.open('POST', 'data:video/mp4,video/webm,video/ogg;charset=UTF-8,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 是图片，显示在页面上
                    var video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    // // 设置视频宽度和高度
                    video.width = 320;
                    video.height = 280;

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

        xhr.send(formData_qa);
    });
}

function fileUpload_qa_imbj() {
    //上传文件(问答)
    var fileInput_qa = document.getElementById('fileUpload-qain-im-bj');
    // var previewDiv = document.getElementById('preview');
    var previewDiv = document.querySelector('#qa-im-preview-bj');
    const formData_qa = new FormData();
    // 获取FormData中的所有元素
    const entries = formData_qa.entries();

    fileInput_qa.addEventListener('change', function () {
        // 清空显示区域
        previewDiv.innerHTML = '';
        var ad_file = document.getElementById('qa-im-file-bj');

        var file = fileInput_qa.files[0];

        var xhr = new XMLHttpRequest();

        // 通过文件类型判断是否图片
        if (file.type.startsWith('image/')) {

            formData_qa.append('imageFile', file);

            xhr.open('POST', 'data:image/png,image/jpg,image/jpeg;base64,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 是图片，显示在页面上
                    var img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.width = 320;
                    img.height = 280;
                    previewDiv.appendChild(img);
                    ad_file.value = file.name;
                    ad_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };
        }
        else {
            // 不是图片也不是视频，给出错误提示
            previewDiv.textContent = '不支持的文件类型';
        }

        xhr.send(formData_qa);
    });
}

function fileUpload_qa_videobj() {
    //上传文件(问答)
    var fileInput_qa = document.getElementById('fileUpload-qain-video-bj');
    // var previewDiv = document.getElementById('preview');
    var previewDiv = document.querySelector('#qa-video-preview-bj');
    const formData_qa = new FormData();
    // 获取FormData中的所有元素
    const entries = formData_qa.entries();

    fileInput_qa.addEventListener('change', function () {
        // 清空显示区域
        previewDiv.innerHTML = '';
        var ad_file = document.getElementById('qa-video-file-bj');

        var file = fileInput_qa.files[0];

        var xhr = new XMLHttpRequest();

        // 通过文件类型判断是不是视频
        if (file.type.startsWith('video/')) {
            // 是视频，显示在页面上
            formData_qa.append('videoFile', file);

            xhr.open('POST', 'data:video/mp4,video/webm,video/ogg;charset=UTF-8,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 是图片，显示在页面上
                    var video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    // // 设置视频宽度和高度
                    video.width = 320;
                    video.height = 280;

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

        xhr.send(formData_qa);
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

//重置选择文件按钮
function resetInput(fileInput) {
    fileInput.value = '';
    fileInput.form.reset();
}

function resetButoon() {
    var text = document.getElementById("qa-text");
    text.style.display = "none";
    text.classList.remove('answer');
    var im = document.getElementById("qa-im");
    im.style.display = "none";
    im.classList.remove('answer');
    var video = document.getElementById("qa-video");
    video.style.display = "none";
    video.classList.remove('answer');
    var textInput = document.getElementById("qa-bobao-text");//文本答案
    textInput.value = "";
    var textimInput = document.getElementById("qa-bobao-img");//文本图片答案
    textimInput.value = "";
    var choose_one = document.getElementById("choose-qain");
    choose_one.style.display = 'none';
    var bt_text = document.getElementById("way-text");
    bt_text.style.color = "#fff";
    var bt_im = document.getElementById("way-im");
    bt_im.style.color = "#fff";
    var bt_video = document.getElementById("way-video");
    bt_video.style.color = "#fff";
}

//添加按钮打开侧边栏
function add_qain() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var sidebar_qa = document.getElementById("pullsidebar-qain");
    // 显示侧边栏
    sidebar_qa.style.display = "block";
    // sidebar_qa.classList.add("in");
    // 
    addCover(parent);
    var pullsidebar_qa_name = document.getElementById("pullsidebar-qain-name");
    pullsidebar_qa_name.value = document.getElementById("qain-name").value;
}

function addDataBtn_qa() {
    var addDataBtn_qa = document.getElementById("add-data-btn-qain");

    addDataBtn_qa.removeEventListener("click", add_qa());
    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_qa.addEventListener("click", add_qa());
}

//保存和取消时关闭侧边栏
function removeqaview() {
    // 获取侧边栏和上传表单元素
    var sidebar_qa = document.getElementById("pullsidebar-qain");
    var parent = document.getElementById("content");
    // 关闭侧边栏
    sidebar_qa.style.display = 'none';
    // sidebar_qa.classList.remove("in");
    //删除遮挡
    removeCover(parent);
    var fileInput_im = document.getElementById('fileUpload-qain-im');
    var fileInput_video = document.getElementById('fileUpload-qain-video');
    resetInput(fileInput_im);
    resetInput(fileInput_video);
    var previewDiv_im = document.querySelector('#qa-im-preview');
    previewDiv_im.innerHTML = '';
    var previewDiv_video = document.querySelector('#qa-video-preview');
    previewDiv_video.innerHTML = '';
    resetButoon();
}

function choose_text(button) {
    var text = document.getElementById("qa-text");
    text.style.display = "block";
    text.classList.add('answer');
    var bt_text = document.getElementById("way-text");
    bt_text.style.color = "#aca9a9";

    var im = document.getElementById("qa-im");
    im.style.display = "none";
    im.classList.remove('answer');
    var bt_im = document.getElementById("way-im");
    bt_im.style.color = "#fff";

    var video = document.getElementById("qa-video");
    video.style.display = "none";
    video.classList.remove('answer');
    var bt_video = document.getElementById("way-video");
    bt_video.style.color = "#fff";

    var choose_one = document.getElementById("choose-qain");
    choose_one.style.display = 'none';
}

function choose_im(button) {
    var text = document.getElementById("qa-text");
    text.style.display = "none";
    text.classList.remove('answer');
    var bt_text = document.getElementById("way-text");
    bt_text.style.color = "#fff";

    var im = document.getElementById("qa-im");
    im.style.display = "block";
    im.classList.add('answer');
    var bt_im = document.getElementById("way-im");
    bt_im.style.color = "#aca9a9";

    var video = document.getElementById("qa-video");
    video.style.display = "none";
    video.classList.remove('answer');
    var bt_video = document.getElementById("way-video");
    bt_video.style.color = "#fff";

    var choose_one = document.getElementById("choose-qain");
    choose_one.style.display = 'none';
}

function choose_video(button) {
    var text = document.getElementById("qa-text");
    text.style.display = "none";
    text.classList.remove('answer');
    var bt_text = document.getElementById("way-text");
    bt_text.style.color = "#fff";

    var im = document.getElementById("qa-im");
    im.style.display = "none";
    im.classList.remove('answer');
    var bt_im = document.getElementById("way-im");
    bt_im.style.color = "#fff";

    var video = document.getElementById("qa-video");
    video.style.display = "block";
    video.classList.add('answer');
    var bt_video = document.getElementById("way-video");
    bt_video.style.color = "#aca9a9";

    var choose_one = document.getElementById("choose-qain");
    choose_one.style.display = 'none';
}

//自动添加表格行
function addtrqa(event) {
    var fileUploadForm = document.getElementById("file-upload-form-qain");
    // 阻止表单默认提交行为
    event.preventDefault();

    var way_text = document.getElementById("qa-text");
    var way_im = document.getElementById("qa-im");
    var way_video = document.getElementById("qa-video");
    var is_text = false;
    var is_im = false;
    var is_video = false;

    if (way_text.classList.contains('answer')) is_text = true;
    else if (way_im.classList.contains('answer')) is_im = true;
    else if (way_video.classList.contains('answer')) is_video = true;

    console.log(is_text, is_im, is_video);

    // 获取文件输入框
    var fileInput = document.getElementById("qa-name");//问答名称
    var textInput = document.getElementById("qa-bobao-text");//文本答案
    var textimInput = document.getElementById("qa-bobao-img");//文本图片答案
    var imInput = document.getElementById('qa-im-file');
    var viInput = document.getElementById('qa-video-file');

    // 获取表格元素
    var table = document.getElementById("data-table-qain");
    var have_name = false;

    for (var i = 0; i < data_qa.length; i++) {
        // console.log(i);
        if (data_qa[i].children[1].innerText == fileInput.value) {
            have_name = true;
        }
    }

    if (have_name || (!(is_text || is_im || is_video)) || (fileInput.value == "") || (fileInput.value == "必须输入问题") || (fileInput.value == "已经存在此问题,请重新输入") || (is_text && (textInput.value == "")) || (is_im && ((textimInput.value == "") || (imInput.value == "") || ((imInput.value.indexOf("jpg") === -1) && (imInput.value.indexOf("png") === -1) && (imInput.value.indexOf("jpeg") === -1)))) || (is_video && ((viInput.value == "") || (viInput.value.indexOf("mp4") === -1)))) {
        return 1;
    }
    else {
        // gen_data_qain(table, fileInput.value);
        return 0;
    }
}

function save_button_qa(input) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var saveButton = document.getElementById('save-button-qain');

    //自动添加表格行
    var not_save = addtrqa(event);

    if (!not_save) {
        // 为保存按钮添加点击事件处理程序
        saveButton.removeEventListener('click', removeqaview());
        saveButton.addEventListener('click', removeqaview());
    }
    else {
        var way_text = document.getElementById("qa-text");
        var way_im = document.getElementById("qa-im");
        var way_video = document.getElementById("qa-video");
        var is_text = false;
        var is_im = false;
        var is_video = false;

        if (way_text.classList.contains('answer')) is_text = true;
        else if (way_im.classList.contains('answer')) is_im = true;
        else if (way_video.classList.contains('answer')) is_video = true;

        var choose_one = document.getElementById("choose-qain");
        console.log(is_text, is_im, is_video);

        // 获取文件输入框
        var fileInput = document.getElementById("qa-name");//问答名称
        var textInput = document.getElementById("qa-bobao-text");//文本答案
        var textimInput = document.getElementById("qa-bobao-img");//文本图片答案
        var imInput = document.getElementById('qa-im-file');
        var viInput = document.getElementById('qa-video-file');

        var imchooseFile = document.getElementById("choose-qain-im");
        var vichooseFile = document.getElementById("choose-qain-video");
        var im_uploadFile = document.getElementById("fileUpload-qain-im");
        var video_uploadFile = document.getElementById("fileUpload-qain-video");

        if (fileInput.value == "") {
            fileInput.value = "必须输入问题";
            fileInput.style.color = "red";
        }
        else if (!(is_text || is_im || is_video)) {
            choose_one.style.display = 'inline';
        }

        else if (is_text && (textInput.value == "")) {
            textInput.value = "必须输入答案";
            textInput.style.color = "red";
        }
        else if (is_im && (textimInput.value == "")) {
            textimInput.value = "必须输入答案";
            textimInput.style.color = "red";
        }
        else if (is_im && ((imInput.value == "") || ((imInput.value.indexOf("jpg") === -1) && (imInput.value.indexOf("png") === -1) && (imInput.value.indexOf("jpeg") === -1)))) {
            imchooseFile.style.display = "inline";
        }
        else if (is_video && ((viInput.value == "") || (viInput.value.indexOf("mp4") === -1))) {
            vichooseFile.style.display = "inline";
        }
        else {
            fileInput.value = "已经存在此问题,请重新输入"
            fileInput.style.color = "red";
        }


        fileInput.addEventListener('click', () => {
            fileInput.value = "";
            fileInput.style.color = "black";
        });
        textInput.addEventListener('click', () => {
            textInput.value = "";
            textInput.style.color = "black";
        });
        textimInput.addEventListener('click', () => {
            textimInput.value = "";
            textimInput.style.color = "black";
        });
        im_uploadFile.addEventListener('click', () => {
            imchooseFile.style.display = "none";
        });
        video_uploadFile.addEventListener('click', () => {
            video_uploadFile.style.display = "none";
        });
    }

}

function gen_data_qain(table, qaName, qaInput) {
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
    cell1.innerText = qaName;
    var cell2 = row.insertCell(2);
    cell2.innerText = qaInput;
    var cell3 = row.insertCell(3);
    // var link1 = document.createElement("a");
    // link1.href = "#";
    // link1.textContent = "上升";
    // link1.className = "up-qain-link";
    // link1.onclick = up_qa();
    // cell2.appendChild(link1);
    // var link2 = document.createElement("a");
    // link2.href = "#";
    // link2.textContent = "下降";
    // link2.className = "down-qain-link";
    // link2.onclick = down_qa();
    // cell2.appendChild(link2);
    var link3 = document.createElement("a");
    link3.href = "#";
    link3.textContent = "编辑";
    link3.className = "write-qain-link";
    link3.onclick = write_qa();
    cell3.appendChild(link3);
    var link4 = document.createElement("a");
    link4.href = "#";
    link4.textContent = "删除";
    link4.className = "delete-qain-link";
    link4.onclick = del_qa();
    cell3.appendChild(link4);

    // 将新的数据行添加到表格中
    table.querySelector("tbody").appendChild(row);

    // 将 tr 数据加入到 data 数组中
    data_qa.push(row);


    // 更新总行数和总页数
    // totalRows_qa = table.rows.length; //算上的th行
    totalRows_qa = data_qa.length;
    totalPages_qa = Math.ceil(totalRows_qa / rowsPerPage_qa);

    // 计算新行所处的页码
    var newRowIndex_qa = totalRows_qa - 1;
    var newPage_qa = Math.ceil((newRowIndex_qa + 1) / rowsPerPage_qa);
    currentPage_qa = newPage_qa;

    // console.log(table.rows.length, totalRows_qa % rowsPerPage_qa, totalRows_qa, currentPage_qa, totalPages_qa)

    // 如果当前页满了，就换页
    if (totalRows_qa % rowsPerPage_qa == 1 && currentPage_qa != 1) {
        // showPage(currentPage_qa - 1);
        //更新页码
        updatePageNumber_qa();
    }

    displayTable_qa();
}

// 显示表格
function displayTable_qa() {
    if (data_qa.length > 0) {
        // 如果数据长度为空，则显示图片
        // 否则不显示img，以便表格数据显示
        img_qa.style.display = "none";
        table_qa.style.display = "table";
    }
    else {
        img_qa.style.display = "inline";
        table_qa.style.display = "none";
    }
    // 清空表格
    table_qa.querySelector("tbody").innerHTML = "";

    // 计算当前页的数据
    var startIndex = (currentPage_qa - 1) * rowsPerPage_qa;
    var endIndex = Math.min(startIndex + rowsPerPage_qa, data_qa.length);
    // 生成表格数据
    var pageData = data_qa.slice(startIndex, endIndex);
    pageData.forEach(rowData => {
        table_qa.querySelector("tbody").appendChild(rowData);
    });

    var tableBody = document.getElementById("tbody-qain");


    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_qa - 1) * rowsPerPage_qa + i + 1;
    }

    if (totalPages_qa > 1) {
        var pagination = document.getElementById("pagination-qain");
        pagination.style.display = "flex";
    }

}

// 更新页码函数
function updatePageNumber_qa() {
    // 找到页码元素
    var pageNumberElement = document.getElementById("page-number-qain");

    //这里可解决最后一页的数据删除后仍显示空的最后一页
    if (currentPage_qa > totalPages_qa) currentPage_qa = totalPages_qa;

    // 更新页码文本
    pageNumberElement.innerHTML = `${currentPage_qa}/${totalPages_qa}`;

    // 找到上一页和下一页元素
    var prevPageLink_qa = document.getElementById("prev-page-qain");
    var nextPageLink_qa = document.getElementById("next-page-qain");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_qa == 1) {
        prevPageLink_qa.classList.add("disabled");
    } else {
        prevPageLink_qa.classList.remove("disabled");
    }

    if (currentPage_qa == totalPages_qa) {
        nextPageLink_qa.classList.add("disabled");
    } else {
        nextPageLink_qa.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_qa == 1) || (totalPages_qa == 0)) {
        currentPage_qa = 1;
        displayTable_qa();
        var pagination = document.getElementById("pagination-qain");
        pagination.style.display = "none";
    }
}

// 首页显示
function show_first_qa() {
    currentPage_qa = 1;
    updatePageNumber_qa();
    displayTable_qa();
}

// 上一页函数
function prevPage_qa() {
    if (currentPage_qa > 1) {
        // showPage(currentPage_qa - 1);
        currentPage_qa--;
        displayTable_qa();
        updatePageNumber_qa();
    }
}

// 下一页函数
function nextPage_qa() {
    if (currentPage_qa < totalPages_qa) {
        // showPage(currentPage_qa + 1);
        currentPage_qa++;
        displayTable_qa();
        updatePageNumber_qa();
    }
}

function gotoPage_qa() {
    // 找到输入框和确定按钮元素
    var inputBox_qa = document.getElementById("page-input-qain");
    var button_qa = document.getElementById("goto-button-qain");

    // 获取输入的页码
    var pageNumber_qa = parseInt(inputBox_qa.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_qa >= 1 && pageNumber_qa <= totalPages_qa) {
        // showPage(pageNumber);
        currentPage_qa = pageNumber_qa;
        displayTable_qa();
        updatePageNumber_qa();
    }

    // 清空输入框
    inputBox_qa.value = "";
}

//查询全部QA信息并删除
function delQAdatabyID(url, index) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            console.log(data);
            if (data != null && data.QA.length > 0) {

                //删除data中相应行
                data_qa.splice(index - 1, 1);
                //更新总页码
                totalRows_qa = data_qa.length;
                totalPages_qa = Math.ceil(totalRows_qa / rowsPerPage_qa);

                //计算删除行当前页码
                currentPage_qa = Math.ceil(index / rowsPerPage_qa);
                // 更新显示
                updatePageNumber_qa();
                displayTable_qa();
                console.log(data_qa.length);
            }
        },
        error: function (data) {
                        location.href = "./qa.html"

                       }
    })
}

//删除该行
function del_qa() {
    // 获取所有删除链接，并添加点击事件
    var tableBody = document.getElementById("tbody-qain");
    var confirmDialog = document.getElementById("confirm-box-qain-del");
    var confirmBtn = document.getElementById("confirmBtn-qain-del");
    var cancelBtn = document.getElementById("cancelBtn-qain-del");

    // tableBody.onclick = function (event) {
    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        if (target.classList.contains("delete-qain-link")) {
            event.stopImmediatePropagation();
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var row = target.parentNode.parentNode;
                var index = row.children[0].innerText;

                var num = data_qa[index - 1].children[0].textContent;
                num--;
                var url = 'DelSingleQA?mainID=' + id+ "&wordID=" + num;

                tableBody.removeChild(row);
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
                delQAdatabyID(url, index);
            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    });
}

//查询全部QA信息并显示在编辑
function getQAinfobyID(url) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            console.log(data);
            if (data != null) {
                var qaGroup = document.getElementById("pullsidebar-qain-name-bj");//问题组名称
                var qaKW = document.getElementById("sub-qain-name-bj");//关键词名称
                var imgInput = document.getElementById("qa-im-preview-bj");
                var im_file = document.getElementById("qa-im-file-bj");
                var videoInput = document.getElementById("qa-video-preview-bj");
                var video_file = document.getElementById("qa-video-file-bj");
                var group = document.getElementById("qain-name");
                var question = document.getElementById("qa-name-bj");

                qaGroup.value = group.value;
                qaKW.value = data.word.slice(0,-1);
                question.value = data.question;

                if (data.way == "text") {
                    var text = document.getElementById("qa-text-bj");
                    text.style.display = "block";
                    var bt_text = document.getElementById("way-text-bj");
                    bt_text.style.color = "#aca9a9";
                    var answer = document.getElementById('qa-bobao-text-bj');
                    answer.value = data.answer;
                }
                else if(data.way == "img"){
                    var text = document.getElementById("qa-img-bj");
                    text.style.display = "block";
                    var bt_img = document.getElementById("way-img-bj");
                    bt_img.style.color = "#aca9a9";
                    var answer = document.getElementById('qa-bobao-img-bj');
                    answer.value = data.answer;

                    var img = document.createElement('img');
                    img.src = data.url;
                    img.width = 160;
                    img.height = 160;
                    imgInput.appendChild(img);
                    im_file.value = data.url;
                }

                else if(data.way == "video"){
                    var bt_video = document.getElementById("way-video-bj");
                    bt_video.style.color = "#aca9a9";

                    var video = document.createElement('video');
                    video.src = data.url;
                    video.controls = true;
                    // // 设置视频宽度和高度
                    video.width = 320;
                    video.height = 280;
                    videoInput.appendChild(video);
                    video_file.value = data.url;
                }
            }
        }
    })
}

//编辑按钮打开侧边栏
function write_qa() {
    var tableBody = document.getElementById("tbody-qain");
    var saveButton = document.getElementById('save-button-qain-bj');
    var cancelButton = document.getElementById('cancel-button-qain-bj');


    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        // 输出每个元素的名称和值
        // console.log(formData_qa.getAll('imageFile'));
        // 获取侧边栏元素
        var sidebar_qa = document.getElementById("pullsidebar-qain-bj");

        if (target.classList.contains("write-qain-link")) {
            event.stopImmediatePropagation();
            // 显示侧边栏
            sidebar_qa.style.display = "block";
            addCover(parent);

            var row = target.parentNode.parentNode;
            var index = row.children[0].innerText;
            var num = data_qa[index - 1].children[0].textContent;
            num--;

            var numID  = document.getElementById("num-bj");
            numID.value = num;
            console.log("id:", id);

            var id_bj = document.getElementById("id-bj");
            id_bj.value = id;

            var url = 'SearchQAByNum?mainID=' + id + "&wordID=" + num;
            getQAinfobyID(url);


            cancelButton.onclick = function () {
                sidebar_qa.style.display = "none";
                removeCover(parent);
                removeqaviewbj();
            };

        }
    });
}

//**********************编辑对应的侧边栏
//保存和取消时关闭侧边栏
function removeqaviewbj() {
    // 获取侧边栏和上传表单元素
    var sidebar_qa = document.getElementById("pullsidebar-qain-bj");
    var parent = document.getElementById("content");
    // 关闭侧边栏
    sidebar_qa.style.display = 'none';
    // sidebar_qa.classList.remove("in");
    //删除遮挡
    removeCover(parent);
    var fileInput_im = document.getElementById('fileUpload-qain-im-bj');
    var fileInput_video = document.getElementById('fileUpload-qain-video-bj');
    resetInput(fileInput_im);
    resetInput(fileInput_video);
    var previewDiv_im = document.querySelector('#qa-im-preview-bj');
    previewDiv_im.innerHTML = '';
    var previewDiv_video = document.querySelector('#qa-video-preview-bj');
    previewDiv_video.innerHTML = '';
    var text = document.getElementById("qa-text-bj");
    text.style.display = "none";
    var im = document.getElementById("qa-img-bj");
    im.style.display = "none";
    var video = document.getElementById("qa-video-bj");
    video.style.display = "none";
    var textInput = document.getElementById("qa-bobao-text-bj");//文本答案
    textInput.value = "";
    var textimInput = document.getElementById("qa-bobao-img-bj");//文本图片答案
    textimInput.value = "";
    var choose_one = document.getElementById("choose-qain-bj");
    choose_one.style.display = 'none';
    var bt_text = document.getElementById("way-text-bj");
    bt_text.style.color = "#fff";
    var bt_im = document.getElementById("way-img-bj");
    bt_im.style.color = "#fff";
    var bt_video = document.getElementById("way-video-bj");
    bt_video.style.color = "#fff";
}

function choose_textbj(button) {
    var text = document.getElementById("qa-text-bj");
    text.style.display = "block";
    text.classList.add('answer');
    var bt_text = document.getElementById("way-text-bj");
    bt_text.style.color = "#aca9a9";

    var im = document.getElementById("qa-img-bj");
    im.style.display = "none";
    im.classList.remove('answer');
    var bt_im = document.getElementById("way-img-bj");
    bt_im.style.color = "#fff";

    var video = document.getElementById("qa-video-bj");
    video.style.display = "none";
    video.classList.remove('answer');
    var bt_video = document.getElementById("way-video-bj");
    bt_video.style.color = "#fff";

    var choose_one = document.getElementById("choose-qain-bj");
    choose_one.style.display = 'none';
}

function choose_imbj(button) {
    var text = document.getElementById("qa-text-bj");
    text.style.display = "none";
    text.classList.remove('answer');
    var bt_text = document.getElementById("way-text-bj");
    bt_text.style.color = "#fff";

    var im = document.getElementById("qa-img-bj");
    im.style.display = "block";
    im.classList.add('answer');
    var bt_im = document.getElementById("way-img-bj");
    bt_im.style.color = "#aca9a9";

    var video = document.getElementById("qa-video-bj");
    video.style.display = "none";
    video.classList.remove('answer');
    var bt_video = document.getElementById("way-video-bj");
    bt_video.style.color = "#fff";

    var choose_one = document.getElementById("choose-qain-bj");
    choose_one.style.display = 'none';
}

function choose_videobj(button) {
    var text = document.getElementById("qa-text-bj");
    text.style.display = "none";
    text.classList.remove('answer');
    var bt_text = document.getElementById("way-text-bj");
    bt_text.style.color = "#fff";

    var im = document.getElementById("qa-img-bj");
    im.style.display = "none";
    im.classList.remove('answer');
    var bt_im = document.getElementById("way-img-bj");
    bt_im.style.color = "#fff";

    var video = document.getElementById("qa-video-bj");
    video.style.display = "block";
    video.classList.add('answer');
    var bt_video = document.getElementById("way-video-bj");
    bt_video.style.color = "#aca9a9";

    var choose_one = document.getElementById("choose-qain-bj");
    choose_one.style.display = 'none';
}

function addtrqabj(index) {
    var way_text = document.getElementById("qa-text-bj");
    var way_im = document.getElementById("qa-img-bj");
    var way_video = document.getElementById("qa-video-bj");
    var is_text = false;
    var is_im = false;
    var is_video = false;

    if (way_text.classList.contains('answer')) is_text = true;
    else if (way_im.classList.contains('answer')) is_im = true;
    else if (way_video.classList.contains('answer')) is_video = true;

    // 获取文件输入框
    var fileInput = document.getElementById("qa-name-bj");//问答名称
    var textInput = document.getElementById("qa-bobao-text-bj");//文本答案
    var textimInput = document.getElementById("qa-bobao-img-bj");//文本图片答案
    var imInput = document.getElementById('qa-im-file-bj');
    var viInput = document.getElementById('qa-video-file-bj');


    // 获取表格元素
    var have_name = false;

    for (var i = 0; i < data_qa.length; i++) {
        // console.log(i);
        if (data_qa[i].children[1].innerText == fileInput.value) {
            have_name = true;
        }
    }

    if (have_name || (!(is_text || is_im || is_video)) || (fileInput.value == "") || (fileInput.value == "必须输入问题") || (fileInput.value == "已经存在此问题,请重新输入") || (is_text && (textInput.value == "")) || (is_im && ((textimInput.value == "") || (imInput.value == "") || ((imInput.value.indexOf("jpg") === -1) && (imInput.value.indexOf("png") === -1) && (imInput.value.indexOf("jpeg") === -1)))) || (is_video && ((viInput.value == "") || (viInput.value.indexOf("mp4") === -1)))) {
        return 1;
    }
    else {
        change_data_qabj(fileInput, index);
        return 0;
    }
}

function change_data_qabj(fileInput, index) {
    // 创建新的数据行
    // 仅修改了姓名部分
    data_qa[index - 1].children[1].innerText = fileInput.value;

    displayTable_qa();//更新显示
}

function save_button_qabj(index) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var saveButton = document.getElementById('save-button-qain-bj');

    //自动添加表格行
    var not_save = addtrqabj(index);

    if (!not_save) {
        // 为保存按钮添加点击事件处理程序
        saveButton.removeEventListener('click', removeqaviewbj());
        saveButton.addEventListener('click', removeqaviewbj());
    }
    else {
        var way_text = document.getElementById("qa-text-bj");
        var way_im = document.getElementById("qa-img-bj");
        var way_video = document.getElementById("qa-video-bj");
        var is_text = false;
        var is_im = false;
        var is_video = false;

        if (way_text.classList.contains('answer')) is_text = true;
        else if (way_im.classList.contains('answer')) is_im = true;
        else if (way_video.classList.contains('answer')) is_video = true;

        // 获取文件输入框
        var fileInput = document.getElementById("qa-name-bj");//问答名称
        var textInput = document.getElementById("qa-bobao-text-bj");//文本答案
        var textimInput = document.getElementById("qa-bobao-img-bj");//文本图片答案
        var imInput = document.getElementById('qa-im-file-bj');
        var viInput = document.getElementById('qa-video-file-bj');

        var imchooseFile = document.getElementById("choose-qain-im-bj");
        var vichooseFile = document.getElementById("choose-qain-video-bj");
        var im_uploadFile = document.getElementById("fileUpload-qain-im-bj");
        var video_uploadFile = document.getElementById("fileUpload-qain-video-bj");

        var choose_one = document.getElementById("choose-qain-bj");

        if (fileInput.value == "") {
            fileInput.value = "必须输入问题";
            fileInput.style.color = "red";
        }
        else if (!(is_text || is_im || is_video)) {
            choose_one.style.display = 'inline';
        }

        else if (is_text && (textInput.value == "")) {
            textInput.value = "必须输入答案";
            textInput.style.color = "red";
        }
        else if (is_im && (textimInput.value == "")) {
            textimInput.value = "必须输入答案";
            textimInput.style.color = "red";
        }
        else if (is_im && ((imInput.value == "") || ((imInput.value.indexOf("jpg") === -1) && (imInput.value.indexOf("png") === -1) && (imInput.value.indexOf("jpeg") === -1)))) {
            imchooseFile.style.display = "inline";
        }
        else if (is_video && ((viInput.value == "") || (viInput.value.indexOf("mp4") === -1))) {
            vichooseFile.style.display = "inline";
        }
        else {
            fileInput.value = "已经存在此问题,请重新输入"
            fileInput.style.color = "red";
        }


        fileInput.addEventListener('click', () => {
            fileInput.value = "";
            fileInput.style.color = "black";
        });
        textInput.addEventListener('click', () => {
            textInput.value = "";
            textInput.style.color = "black";
        });
        textimInput.addEventListener('click', () => {
            textimInput.value = "";
            textimInput.style.color = "black";
        });
        im_uploadFile.addEventListener('click', () => {
            imchooseFile.style.display = "none";
        });
        video_uploadFile.addEventListener('click', () => {
            video_uploadFile.style.display = "none";
        });
    }

}

//保存和取消时关闭内页
function removeqainview() {
    // window.location.href = "/home/gs/GS/project/h5/robot_backend/backend.html";
    // goToTargetPage();
    // location.href = "./backend.html?id1=face-li&id3=guide-li";
    location.href = "./qa.html";

}





