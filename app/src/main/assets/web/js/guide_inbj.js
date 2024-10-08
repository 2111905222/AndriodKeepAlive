//**********************导览内页*****************************
//有上升下降版

//新增上传文件(导航)
function txtuploadFile() {
    var fileInput_guidein = document.getElementById('fileUpload-txt-guidein');//命名不能重复
    const formData_guidein = new FormData();

    fileInput_guidein.addEventListener('change', function () {
        var txt_file = document.getElementById('guide-txtfile');

        var file = fileInput_guidein.files[0];
        formData_guidein.append('txtFile', file);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'data:file/txt;base64,');
        xhr.onload = function () {
            if (xhr.status === 200) {
                txt_file.value = file.name; //获取文件名
                txt_file.style.color = "black";
            } else {
                alert('上传失败：' + xhr.statusText);
            }
        };
        xhr.send(formData_guidein);
    });
}

function imuploadFile() {
    var fileInput_guidein = document.getElementById('fileUpload-im-guidein');//命名不能重复
    var guide_preview = document.querySelector('#guide-preview');
    const formData_guidein = new FormData();

    fileInput_guidein.addEventListener('change', function () {
        // 清空显示区域
        // while (guide_preview.firstChild) {
        //     guide_preview.removeChild(guide_preview.firstChild);  //
        // }

        guide_preview.innerHTML = ""; //两种方式均可用

        var im_file = document.getElementById('guide-imfile');

        var file = fileInput_guidein.files[0];
        if (file.type.startsWith('image/')) {
            formData_guidein.append('imageFile', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'data:image/png,image/jpg;image/jpeg;base64,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 上传成功，将上传的图片显示在<img>标签中
                    var img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.width = 160;
                    img.height = 160;
                    guide_preview.appendChild(img);
                    im_file.value = file.name; //获取文件名
                    im_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };
        }
        else {
            guide_preview.textContent = '不支持的文件类型';
        }
        xhr.send(formData_guidein);
    });
}

function imuploadFile_bj() {
    var fileInput_guidein = document.getElementById('fileUpload-im-guidein-bj');//命名不能重复
    var guide_preview = document.querySelector('#guide-preview-bj');
    const formData_guidein = new FormData();

    fileInput_guidein.addEventListener('change', function () {
        // 清空显示区域
        // while (guide_preview.firstChild) {
        //     guide_preview.removeChild(guide_preview.firstChild);  //
        // }

        guide_preview.innerHTML = ""; //两种方式均可用

        var im_file = document.getElementById('guide-imfile-bj');

        var file = fileInput_guidein.files[0];
        if (file.type.startsWith('image/')) {
            formData_guidein.append('imageFile', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'data:image/png,image/jpg;image/jpeg;base64,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 上传成功，将上传的图片显示在<img>标签中
                    var img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.width = 160;
                    img.height = 160;
                    guide_preview.appendChild(img);
                    im_file.value = file.name; //获取文件名
                    im_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };
        }
        else {
            guide_preview.textContent = '不支持的文件类型';
        }
        xhr.send(formData_guidein);
    });
}


function updateName(select) {
    // 获取选择的选项的索引
    var select = document.getElementById("guide-name");
    var selectedOption = select.options[select.selectedIndex];
    var selectedText = selectedOption.text;

    // 将选项的值分配给特定的名称
    var nameInput = document.getElementById("select-name");
    nameInput.value = selectedText;
}

function updateNamebj(select) {
    // 获取选择的选项的索引
    var select = document.getElementById("guide-name-bj");
    var selectedOption = select.options[select.selectedIndex];
    var selectedText = selectedOption.text;

    // 将选项的值分配给特定的名称
    var nameInput = document.getElementById("select-name-bj");
    nameInput.value = selectedText;
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

function getGuidename() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var guideinbox = document.getElementById("add-box-guide");
    // 显示侧边栏
    guideinbox.style.display = 'block';
    // 添加遮挡层
    addCover(parent);

    var confirmBtn = document.getElementById("save-button-guide");
    var cancelBtn = document.getElementById("cancel-button-guide");

    var name = document.getElementById("guide-txtfile");
    var guidein_name = document.getElementById("guidein-name");
    var pullsidebar_guidein_name = document.getElementById("pullsidebar-guidein-name");

    confirmBtn.onclick = function () {
        if (name.value == "") {
            name.value = "必须输入导览路线名称";
            name.style.color = "red";


            name.addEventListener('click', () => {
                name.value = "";
                name.style.color = "black";
            });
        }
        else {
            guidein_name.value = name.value;
            pullsidebar_guidein_name.value = name.value;
            guideinbox.style.display = "none";
            //删除遮挡
            removeCover(parent);
        }

    };

    cancelBtn.onclick = function () {
        guideinbox.style.display = "none";
        //删除遮挡
        removeCover(parent);
        cancel_guidein();
    };
}

//查询全部导航点名称
function getPosdata() { //pageNum
    $.ajax({
        url: "/SearchAllPos",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            console.log(data);
            if (data != null && data.length > 0) {
                var select = document.getElementById("guide-name");
                for (var i = 0; i < data.length; i++) {
                    var option = document.createElement('option');
                    option.value = data[i].position.locationID;
                    option.text = data[i].position.posName;
                    select.appendChild(option);
                }
            }
        }
    })
}

function getPosdatabj() { //pageNum
    $.ajax({
        url: "/SearchAllPos",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);

            if (data != null && data.length > 0) {
                var select = document.getElementById("guide-name-bj");
                for (var i = 0; i < data.length; i++) {
                    var option = document.createElement('option');
                    option.value = data[i].position.locationID;
                    option.text = data[i].position.posName;
                    select.appendChild(option);
                }
            }
        }
    })
}

function addguidein() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var sidebar_guidein = document.getElementById("pullsidebar-guidein");
    // 显示侧边栏
    sidebar_guidein.style.display = 'block';
    // 添加遮挡层
    addCover(parent);
}

//***获取添加数据按钮
function addDataBtn_guidein() {
    var addDataBtn_guidein = document.getElementById("add-data-btn-guidein");
    var pullsidebar_guidein_name = document.getElementById("pullsidebar-guidein-name");
    pullsidebar_guidein_name.value = document.getElementById("guidein-name").value;
    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_guidein.removeEventListener("click", addguidein());
    addDataBtn_guidein.addEventListener("click", addguidein());
}

//重置选择文件按钮
function resetInput(fileInput) {
    fileInput.value = '';
    fileInput.form.reset();
}



//保存和取消时关闭侧边栏
function removeguideinview() {
    // 获取侧边栏和上传表单元素
    var sidebar_guidein = document.getElementById("pullsidebar-guidein");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    sidebar_guidein.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    // // 清空显示区域
    var imgPreview = document.querySelector('#guide-preview');
    imgPreview.innerHTML = "";
    var txtfileInput = document.getElementById('fileUpload-txt-guidein');
    var imfileInput = document.getElementById('fileUpload-im-guidein');
    resetInput(txtfileInput);
    resetInput(imfileInput);
    var select = document.getElementById("guide-name");
    select.options[0].selected = true;
    select.style.color = 'black';

}


function save_button_guidein(input) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const saveButton = document.getElementById('save-button-guidein');
    var not_save = addtrguidein(event);

    if (!not_save) {
        saveButton.removeEventListener('click', removeguideinview()); //监听前要先删除原先的
        saveButton.addEventListener('click', removeguideinview());
    }
    else {
        var fileInput = document.getElementById("guide-name");
        var txtInput = document.getElementById("guide-txtfile").value;
        var imgInput = document.getElementById("guide-imfile").value;
        var txtuploadFile = document.getElementById("fileUpload-txt-guidein");
        var txtchooseFile = document.getElementById("choose-txt");
        var imuploadFile = document.getElementById("fileUpload-im-guidein");
        var imchooseFile = document.getElementById("choose-im");

        if ((fileInput.options[0].selected == true) || (fileInput.options[1].selected == true)) {
            fileInput.options[1].selected = true;
            fileInput.style.color = 'red';
        }
        else if ((txtInput.indexOf("txt") == -1) || (txtInput == "")) {
            txtchooseFile.style.display = 'inline';
        }
        else if ((imgInput == "") || ((imgInput.indexOf("jpg") === -1) && (imgInput.indexOf("png") === -1) && (imgInput.indexOf("jpeg") === -1))) {
            imchooseFile.style.display = 'inline';
        }
        else {
            fileInput.options[2].selected = true;
            fileInput.style.color = 'red';
        }


        fileInput.addEventListener('mousedown', () => {
            fileInput.options[0].selected = true;
            fileInput.style.color = "black";
        });

        txtuploadFile.addEventListener('click', () => {
            txtchooseFile.style.display = 'none';
        });

        imuploadFile.addEventListener('click', () => {
            imchooseFile.style.display = 'none';
        });
    }

}

function cancel_button_guidein(input) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const cancelButton = document.getElementById('cancel-button-guidein');

    cancelButton.removeEventListener('click', removeguideinview()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removeguideinview());
}


function backtoGuideview() {
    // window.location.href = "/home/gs/GS/project/h5/robot_backend/backend.html";
    // goToTargetPage();
    // location.href = "./backend.html?id1=face-li&id3=guide-li";
    location.href = "./guide.html";

}

function cancel_guidein() {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancel = document.getElementById('cancel-button-guidein');

    cancel.removeEventListener('click', backtoGuideview()); //监听前要先删除原先的
    cancel.addEventListener('click', backtoGuideview());
}



//////////////////添加表格数据

//自动添加表格行
function addtrguidein(event) {
    var fileUploadForm = document.getElementById("file-upload-form-guidein");
    // 阻止表单默认提交行为
    event.preventDefault();

    // 获取文件输入框
    var fileInput = document.getElementById("guide-name");
    var fileNum = document.getElementById("guide-num");//广告次序
    var txtInput = document.getElementById("guide-txtfile").value;
    var imgInput = document.getElementById("guide-imfile").value;

    // // 获取表格元素
    var table = document.getElementById("data-table-guidein");
    var have_name = false;

    for (var i = 0; i < data_guidein.length; i++) {
        // console.log(i);
        if (data_guidein[i].children[1].innerText == fileInput.value) {
            have_name = true;
        }
    }

    if (have_name || (fileInput.value == "0") || (fileInput.value == "1") || (fileInput.value == "2") || (txtInput.indexOf("txt") == -1) || (txtInput == "") || (imgInput == "") || ((imgInput.indexOf("jpg") === -1) && (imgInput.indexOf("png") === -1) && (imgInput.indexOf("jpeg") === -1))) {
        return 1;
    }
    else {
        gen_data_guidein(table, fileInput.value, fileNum.value);
        // gen_data_guidein(table, fileInput.value);
        return 0;
    }

}

//// 外部表格输入名称的
function gen_data_guidein(table, fileInput, posID) { //, fileNum
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
    // if (fileNum.value == "")
    //     cell0.innerText = RowNumber;
    // else
    //     cell0.innerText = fileNum.value;
    cell0.innerText = RowNumber;

    // 设置新行的其他单元格
    var cell1 = row.insertCell(1);
    cell1.innerText = fileInput;
    var cell2 = row.insertCell(2);
    // var link1 = document.createElement("a");
    // link1.href = "#";
    // link1.textContent = "上升";
    // link1.className = "up-guidein-link";
    // link1.onclick = up_guidein();
    // cell2.appendChild(link1);
    // var link2 = document.createElement("a");
    // link2.href = "#";
    // link2.textContent = "下降";
    // link2.className = "down-guidein-link";
    // link2.onclick = down_guidein();
    // cell2.appendChild(link2);
    var link3 = document.createElement("a");
    link3.href = "#";
    link3.textContent = "编辑";
    link3.className = "write-guidein-link";
    link3.onclick = write_guidein();
    cell2.appendChild(link3);
    var link4 = document.createElement("a");
    link4.href = "#";
    link4.textContent = "删除";
    link4.className = "delete-guidein-link";
    link4.onclick = del_guidein();
    cell2.appendChild(link4);
    var cell3 = row.insertCell(3);
    cell3.innerText = posID;
    cell3.style.display = "None";


    table.querySelector("tbody").appendChild(row);
    // 将 tr 数据加入到 data 数组中
    data_guidein.push(row);

    // 更新总行数和总页数
    // totalRows_guidein = table.rows.length; //算上的th行
    totalRows_guidein = data_guidein.length;
    totalPages_guidein = Math.ceil(totalRows_guidein / rowsPerPage_guidein);

    // 计算新行所处的页码
    var newRowIndex_guidein = totalRows_guidein - 1;
    var newPage_guidein = Math.ceil((newRowIndex_guidein + 1) / rowsPerPage_guidein);
    currentPage_guidein = newPage_guidein;


    // 如果当前页满了，就换页
    if (totalRows_guidein % rowsPerPage_guidein == 1 && currentPage_guidein != 1) {
        updatePageNumber_guidein();
    }

    displayTable_guidein();
}


// 显示表格
function displayTable_guidein() {
    if (data_guidein.length > 0) {
        // 如果数据长度为空，则显示图片
        // 否则不显示img，以便表格数据显示
        img_guidein.style.display = "none";
        table_guidein.style.display = "table";
    }
    else {
        img_guidein.style.display = "inline";
        table_guidein.style.display = "none";
    }
    // 清空表格
    table_guidein.querySelector("tbody").innerHTML = "";

    // 计算当前页的数据
    var startIndex_guidein = (currentPage_guidein - 1) * rowsPerPage_guidein;
    var endIndex_guidein = Math.min(startIndex_guidein + rowsPerPage_guidein, data_guidein.length);
    var pageData_guidein = data_guidein.slice(startIndex_guidein, endIndex_guidein);

    // console.log(pageData);

    // 生成表格数据
    pageData_guidein.forEach(row => {
        table_guidein.querySelector("tbody").appendChild(row);
    });

    var tableBody = document.getElementById("tbody-guidein");


    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_guidein - 1) * rowsPerPage_guidein + i + 1;
    }

    // //实现仅有一条数据时,没有上升下降;多行数据时第一行没有上升,最后一行没有下降,上升下降均占位隐藏
    // if (totalPages_guidein == 1) {
    //     if (data_guidein.length == 1) {//仅有1页,1行,则不显示上升下降
    //         data_guidein[0].children[2].children[0].style.display = "none";
    //         data_guidein[0].children[2].children[1].style.display = "none";
    //     }
    //     else {
    //         for (var i = 0; i < data_guidein.length; i++) {
    //             data_guidein[i].children[2].children[0].style.display = "";
    //             data_guidein[i].children[2].children[1].style.display = "";
    //         }
    //         data_guidein[0].children[2].children[0].style.visibility = "hidden";//第一行的上升占位隐藏
    //         data_guidein[0].children[2].children[1].style.visibility = "visible";//第一行的下降占位显示
    //         data_guidein[1].children[2].children[0].style.visibility = "visible";//第二行的上升占位显示
    //         data_guidein[1].children[2].children[1].style.visibility = "visible";//第二行的下降占位显示
    //         data_guidein[data_guidein.length - 2].children[2].children[1].style.visibility = "visible";//最后一个的上一个下降变占位显示
    //         data_guidein[data_guidein.length - 1].children[2].children[0].style.visibility = "visible";//最后一个上升占位显示
    //         data_guidein[data_guidein.length - 1].children[2].children[1].style.visibility = "hidden";//最后一个下降占位隐藏
    //     }

    // }
    // else {
    //     data_guidein[0].children[2].children[0].style.visibility = "hidden";//第一行的上升占位隐藏
    //     data_guidein[0].children[2].children[1].style.visibility = "visible";//第一行的下降占位显示
    //     data_guidein[1].children[2].children[0].style.visibility = "visible";//第二行的上升占位显示
    //     data_guidein[data_guidein.length - 1].children[2].children[0].style.visibility = "visible";//最后一个上升占位显示
    //     data_guidein[data_guidein.length - 1].children[2].children[1].style.visibility = "hidden";//最后一个下降占位隐藏
    //     data_guidein[data_guidein.length - 2].children[2].children[1].style.visibility = "visible";//最后一个的上一个下降变占位显示
    //     data_guidein[rowsPerPage_guidein - 1].children[2].children[1].style.visibility = "visible";//第一页最后一个下降变占位显示
    //     // console.log(data_guidein[data_guidein.length - 2].children[2]);
    //     // console.log(data_guidein[data_guidein.length - 1].children[2]);
    // }

    if (totalPages_guidein > 1) {
        var pagination = document.getElementById("pagination-guidein");
        pagination.style.display = "flex";
    }
}

// 更新页码函数
function updatePageNumber_guidein() {
    // 找到页码元素
    var pageNumberElement_guidein = document.getElementById("page-number-guidein");

    if (currentPage_guidein > totalPages_guidein) currentPage_guidein = totalPages_guidein;

    // 更新页码文本
    pageNumberElement_guidein.innerHTML = `${currentPage_guidein}/${totalPages_guidein}`;

    // 找到上一页和下一页元素
    var prevPageLink_guidein = document.getElementById("prev-page-guidein");
    var nextPageLink_guidein = document.getElementById("next-page-guidein");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_guidein == 1) {
        prevPageLink_guidein.classList.add("disabled");
    } else {
        prevPageLink_guidein.classList.remove("disabled");
    }

    if (currentPage_guidein == totalPages_guidein) {
        nextPageLink_guidein.classList.add("disabled");
    } else {
        nextPageLink_guidein.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_guidein == 1) || (totalPages_guidein == 0)) {
        currentPage_guidein = 1;
        displayTable_guidein();
        var pagination = document.getElementById("pagination-guidein");
        pagination.style.display = "none";
    }
}

// 上一页函数
function prevPage_guidein() {
    if (currentPage_guidein > 1) {
        // showPage(currentPage_guidein - 1);
        currentPage_guidein--;
        displayTable_guidein();
        updatePageNumber_guidein();
        console.log("pre")
    }
}

// 下一页函数
function nextPage_guidein() {
    if (currentPage_guidein < totalPages_guidein) {
        // showPage(currentPage_guidein + 1);
        currentPage_guidein++;
        displayTable_guidein();
        updatePageNumber_guidein();
    }
}

function gotoPage_guidein() {
    // 找到输入框和确定按钮元素
    var inputBox_guidein = document.getElementById("page-input-guidein");
    var button_guidein = document.getElementById("goto-button-guidein");

    // 获取输入的页码
    var pageNumber_guidein = parseInt(inputBox_guidein.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_guidein >= 1 && pageNumber_guidein <= totalPages_guidein) {
        // showPage(pageNumber);
        currentPage_guidein = pageNumber_guidein;
        displayTable_guidein();
        updatePageNumber_guidein();
    }

    // 清空输入框
    inputBox_guidein.value = "";
}


//行上移

function moveRow(row, direction) {
    // 添加移动方向类
    row.classList.add(direction);

    // 等待 0.5 秒后移除移动方向类
    setTimeout(function () {
        row.classList.remove(direction);
    }, 500);
}

function up_guidein() {
    var tableBody = document.getElementById("tbody-guidein");
    var confirmDialog = document.getElementById("confirm-box-up-guidein");
    var confirmBtn = document.getElementById("confirmBtn-guide-up-guidein");
    var cancelBtn = document.getElementById("cancelBtn-guide-up-guidein");


    // tableBody.onclick = function (event) {
    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");

        if (target.classList.contains("up-guidein-link")) {
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var currentRow = target.parentNode.parentNode;
                var index = currentRow.children[0].innerText - 1;//当前行data索引

                var tbody = currentRow.parentElement;
                var preRow = tbody.rows[(index - 1) % rowsPerPage_guidein];

                currentRow.classList.add('mbc');

                var temp = data_guidein[index - 1];
                data_guidein[index - 1] = data_guidein[index];
                data_guidein[index] = temp;

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                if (index % rowsPerPage_guidein != 0) {
                    moveRow(currentRow, 'move-up');
                    moveRow(preRow, 'move-down');
                }
                else {
                    prevPage_guidein();
                }

                setTimeout(function () {
                    currentRow.classList.remove('mbc');
                }, 1000);

                // 更新显示
                displayTable_guidein();
                updatePageNumber_guidein();
            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    });//!!!!!!!!!!!没反应但不报错,切记查有没有加; 
}

//行下移
function down_guidein() {
    var tableBody = document.getElementById("tbody-guidein");
    var confirmDialog = document.getElementById("confirm-box-down-guidein");
    var confirmBtn = document.getElementById("confirmBtn-guide-down-guidein");
    var cancelBtn = document.getElementById("cancelBtn-guide-down-guidein");


    tableBody.addEventListener('click', function (event) { //只能有一个这种形式,其他都要用tableBody.addEventListener('click', function (event) {});,否则其他没反应
        var target = event.target;
        var parent = document.getElementById("content");

        if (target.classList.contains("down-guidein-link")) {
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var currentRow = target.parentNode.parentNode;
                var index = currentRow.children[0].innerText - 1;//当前行data索引

                var tbody = currentRow.parentElement;
                // var index = Array.prototype.indexOf.call(tbody.rows, currentRow);
                var nextRow = tbody.rows[(index + 1) % rowsPerPage_guidein];

                currentRow.classList.add('mbc');

                var temp = data_guidein[index + 1];
                data_guidein[index + 1] = data_guidein[index];
                data_guidein[index] = temp;

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                if (index % rowsPerPage_guidein != 1) {
                    moveRow(currentRow, 'move-down');
                    moveRow(nextRow, 'move-up');
                }
                else {
                    nextPage_guidein();
                }

                setTimeout(function () {
                    currentRow.classList.remove('mbc');
                }, 1000);

                // 更新显示
                displayTable_guidein();
                updatePageNumber_guidein();
            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    });
}

//查询全部导览路线信息并删除
function delGuidepointbyID(url, index) { //pageNum
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
                data_guidein.splice(index - 1, 1);
                //更新总页码
                totalRows_guidein = data_guidein.length;
                totalPages_guidein = Math.ceil(totalRows_guidein / rowsPerPage_guidein);

                //计算删除行当前页码
                currentPage_guidein = Math.ceil(index / rowsPerPage_guidein);
                // 更新显示
                updatePageNumber_guidein();
                displayTable_guidein();

            }
        }
    })
}

//删除该行
function del_guidein() {
    // 获取所有删除链接，并添加点击事件
    var tableBody = document.getElementById("tbody-guidein");
    var confirmDialog = document.getElementById("confirm-box-guidein");
    var confirmBtn = document.getElementById("confirmBtn-guidein");
    var cancelBtn = document.getElementById("cancelBtn-guidein");

    tableBody.onclick = function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        if (target.classList.contains("delete-guidein-link")) {
            event.stopImmediatePropagation();
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var row = target.parentNode.parentNode;
                var index = row.children[0].innerText;
                var posID = data_guidein[index - 1].children[3].textContent;

                var url = 'DelGuidePosByID?id=' + id + "&posID=" + posID;

                tableBody.removeChild(row);

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
                delGuidepointbyID(url, index);
            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    };
}

//查询此路线下全部导览点信息并显示在编辑
function getGuideinfobyID(url) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null) {
                var name = document.getElementById('pullsidebar-guidein-namebj');
                var position = document.getElementById("guide-name-bj");
                var bobao_file = document.getElementById('guide-bobao-bj');
                var img_file = document.getElementById("guide-preview-bj");
                // adname.value = data.name;
                name.value = data.guideName;
                bobao_file.value = data.talk;
                for (var i = 0; i < position.options.length; i++) {
                    if (position.options[i].text == data.posName) {
                        position.options[i].selected = true;
                        break;
                    }
                }

                // if((data.url.indexOf("jpg") !== -1) || (data.url.indexOf("png") !== -1) || (data.url.indexOf("jpeg") !== -1)){
                //     var img = document.createElement('img');
                //     img.src = data.url;
                //     img.width = 160;
                //     img.height = 160;
                //     img_file.appendChild(img);
                // }
            }
        }
    })
}

//编辑按钮打开侧边栏
function write_guidein() {
    var tableBody = document.getElementById("tbody-guidein");
    var saveButton = document.getElementById('save-button-guidein-bj');
    var cancelButton = document.getElementById('cancel-button-guidein-bj');


    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        // 获取侧边栏元素
        var sidebar_guidein = document.getElementById("pullsidebar-guidein-bj");

        if (target.classList.contains("write-guidein-link")) {
            event.stopImmediatePropagation();
            // 显示侧边栏
            sidebar_guidein.style.display = "block";
            addCover(parent);

            var row = target.parentNode.parentNode;
            var index = row.children[0].innerText;
            // var id = document.getElementById('guidein-name-id').value;
            console.log("id:", id);
            var posID = data_guidein[index - 1].children[3].textContent;

            var id_bj = document.getElementById("id-bj");
            id_bj.value = id;
            var posID_bj = document.getElementById("posID-bj");
            posID_bj.value = posID;
            var url = 'SearchGuidePosByID?id=' + id + "&posID=" + posID;
            getGuideinfobyID(url);

            // saveButton.onclick = function () {
            //     var row = target.parentNode.parentNode;
            //     var index = row.children[0].innerText;
            //     save_button_guideinbj(index);
            // };

            cancelButton.onclick = function () {
                sidebar_guidein.style.display = "none";
                removeCover(parent);
                removeguideinviewbj();
            };

        }
    });
}


//********************编辑侧边栏
function removeguideinviewbj() {
    // 获取侧边栏和上传表单元素
    var sidebar_guidein = document.getElementById("pullsidebar-guidein-bj");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    sidebar_guidein.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    // // 清空显示区域
    // var imgPreview = document.querySelector('#guide-preview-bj');
    // imgPreview.innerHTML = "";
    // var imfileInput = document.getElementById('fileUpload-im-guidein-bj');
    // resetInput(imfileInput);
    // var select = document.getElementById("guide-name-bj");
    // select.options[0].selected = true;
    // select.style.color = 'black';
    // var txtInput = document.getElementById("guide-bobao-bj");
    // txtInput.value = "";
    // var fileNum = document.getElementById("guide-num-bj");//广告次序
    // fileNum.value = "";

}


function save_button_guideinbj(index) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const saveButton = document.getElementById('save-button-guidein-bj');
    var not_save = addtrguideinbj(index);

    if (!not_save) {
        saveButton.removeEventListener('click', removeguideinviewbj()); //监听前要先删除原先的
        saveButton.addEventListener('click', removeguideinviewbj());
    }
    else {
        var fileInput = document.getElementById("guide-name-bj");
        var txtInput = document.getElementById("guide-bobao-bj");
        var imgInput = document.getElementById("guide-imfile-bj").value;
        var imuploadFile = document.getElementById("fileUpload-im-guidein-bj");
        var imchooseFile = document.getElementById("choose-im-bj");

        if ((fileInput.options[0].selected == true) || (fileInput.options[1].selected == true)) {
            fileInput.options[1].selected = true;
            fileInput.style.color = 'red';
        }
        else if (txtInput.value == "") {
            txtInput.value = "必须填入播报内容";
            txtInput.style.color = 'red';
        }
        else if ((imgInput == "") || ((imgInput.indexOf("jpg") === -1) && (imgInput.indexOf("png") === -1) && (imgInput.indexOf("jpeg") === -1))) {
            imchooseFile.style.display = 'inline';
        }
        else {
            fileInput.options[2].selected = true;
            fileInput.style.color = 'red';
        }


        fileInput.addEventListener('mousedown', () => {
            fileInput.options[0].selected = true;
            fileInput.style.color = "black";
        });

        txtInput.addEventListener('click', () => {
            txtInput.value = "";
            txtInput.style.color = "black";
        });

        imuploadFile.addEventListener('click', () => {
            imchooseFile.style.display = 'none';
        });
    }

}

function cancel_button_guideinbj() {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancelButton = document.getElementById('cancel-button-guidein-bj');

    cancelButton.removeEventListener('click', removeguideinviewbj()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removeguideinviewbj());
}

//自动添加表格行
function addtrguideinbj(index) {
    var fileUploadForm = document.getElementById("file-upload-form-guidein-bj");
    // 阻止表单默认提交行为
    event.preventDefault();

    // 获取文件输入框
    var fileInput = document.getElementById("guide-name-bj");
    // var fileNum = document.getElementById("guide-num-bj");//广告次序
    var txtInput = document.getElementById("guide-bobao-bj").value;
    var imgInput = document.getElementById("guide-imfile-bj").value;

    var have_name = false;

    for (var i = 0; i < data_guidein.length; i++) {
        // console.log(i);
        if (data_guidein[i].children[1].innerText == fileInput.value) {
            have_name = true;
        }
    }

    if (have_name || (fileInput.value == "0") || (fileInput.value == "1") || (txtInput == "") || (imgInput == "") || ((imgInput.indexOf("jpg") === -1) && (imgInput.indexOf("png") === -1) && (imgInput.indexOf("jpeg") === -1))) {
        return 1;
    }
    else {
        // change_data_guidein(fileInput, fileNum, index);
        change_data_guidein(fileInput, index);
        return 0;
    }

}
function change_data_guidein(fileInput, index) {
    // 创建新的数据行
    // 仅修改了姓名部分
    data_guidein[index - 1].children[1].innerText = fileInput.value;
    var row = data_guidein[index - 1];

    // 更新总行数和总页数
    // totalRows_guidein = table.rows.length; //算上的th行
    totalRows_guidein = data_guidein.length;
    totalPages_guidein = Math.ceil(totalRows_guidein / rowsPerPage_guidein);

    // 计算新行所处的页码
    var newRowIndex_guidein = totalRows_guidein - 1;
    var newPage_guidein = Math.ceil((newRowIndex_guidein + 1) / rowsPerPage_guidein);
    currentPage_guidein = newPage_guidein;


    // 如果当前页满了，就换页
    if (totalRows_guidein % rowsPerPage_guidein == 1 && currentPage_guidein != 1) {
        updatePageNumber_guidein();
    }

    displayTable_guidein();
}

//查询全部导航点信息
function getAllposdata(url) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null) {
                if (data.length == 0) {
                    img_guidein.style.display = "inline";
                    table_guidein.style.display = "none";
                }
                else {
                    img_guidein.style.display = "none";
                    table_guidein.style.display = "table";
                    data_guidein.length = 0;
                    for (var i = 0; i < data.length; i++) {
                        gen_data_guidein(table_guidein, data[i].posName, data[i].posID);
                    }
                }
            }
        }
    })
}
