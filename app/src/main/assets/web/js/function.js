//**********************function*****************************

//查询全部列表 待改!!!
function getFunctiondata() { //pageNum
    $.ajax({
        url: "/SearchAllMainLeft",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null) {
                if (data.length == 0) {
                    img_function.style.display = "inline";
                    table_function.style.display = "none";
                }
                else {
                    img_function.style.display = "none";
                    table_function.style.display = "table";
                    data_function.length = 0;
                    for (var i = 0; i < data.length; i++) {
                        gen_data_function(data[i].mainTitle, data[i].subTitle,data[i].iconName,data[i].function);
                    }
                }
            }
        }
    })
}

//查询全部图标信息 待改!!!
function getImgdata() { //pageNum
    $.ajax({
        url: "/SearchAllIconImg",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null && data.length > 0) {
                var ul = document.getElementById("choose-img");
                for (var i = 0; i < data.length; i++) {
                    // var option = document.createElement('option');
                    // option.value = data[i].iconID;
                    // option.text = data[i].icon;
                    // select.appendChild(option);
                    var li = document.createElement('li');                    
                    var img = document.createElement('img');
                    var imgUrl = "./img/"+data[i].icon+".jpg";
                    img.src = imgUrl;
                    img.className = "icon";                    
                    li.appendChild(img);
                    var text = document.createTextNode(data[i].icon);
                    li.appendChild(text);
                    ul.appendChild(li);
                }
            }
        }
    })
}

//查询全部功能信息 待改!!!
function getFuncdata() { //pageNum
    $.ajax({
        url: "/SearchAllFunction",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            console.log(data);
            if (data != null && data.length > 0) {
                var select = document.getElementById("choose-func");
                for (var i = 0; i < data.length; i++) {
                    var option = document.createElement('option');
                    option.value = data[i].functionID;
                    option.text = data[i].function;
                    select.appendChild(option);
                }
            }
        }
    })
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

function addfunction() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var sidebar_function = document.getElementById("pullsidebar-function");
    // 显示侧边栏
    sidebar_function.style.display = "block";
    // 添加遮挡层
    addCover(parent);
}

//***获取添加数据按钮
function addDataBtn_function() {
    var addDataBtn_function = document.getElementById("add-data-btn-function");

    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_function.removeEventListener("click", addfunction());
    addDataBtn_function.addEventListener("click", addfunction());
}

//重置选择文件按钮
function resetInput(fileInput) {
    fileInput.value = '';
    fileInput.form.reset();
}




//保存和取消时关闭侧边栏
function removefunctionview() {
    // 获取侧边栏和上传表单元素
    var sidebar_function = document.getElementById("pullsidebar-function");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    sidebar_function.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    // // 清空显示区域
    var imgPreview = document.querySelector('#imgPreview');
    imgPreview.innerHTML = "";
    var fileInput = document.getElementById('fileUpload-function');
    resetInput(fileInput);
}

function cancel_button_function() {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancelButton = document.getElementById('cancel-button-function');

    cancelButton.removeEventListener('click', removefunctionview()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removefunctionview());
}

function gen_data_function(heading, subtitle, imgname, func) {
    var table = document.getElementById("data-table-function");
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
    cell0.innerText = RowNumber;//序号
    // 设置新行的其他单元格
    var cell1 = row.insertCell(1);
    cell1.innerText = heading;//主标题
    var cell2 = row.insertCell(2);
    cell2.innerText = subtitle;//副标题
    var cell3 = row.insertCell(3);
    var img = document.createElement('img');
    img.src = "./img/"+imgname+'.jpg';
    img.width = 30;
    img.height = 30;
    cell3.appendChild(img);//图标
    var cell4 = row.insertCell(4);
    cell4.innerText = func;//功能
    var cell5 = row.insertCell(5);
    // var link1 = document.createElement("a");
    // link1.href = "#";
    // link1.textContent = "编辑";
    // link1.className = "write-function-link";
    // link1.onclick = write_function();
    // cell5.appendChild(link1);
    var link2 = document.createElement("a");
    link2.href = "#";
    link2.textContent = "删除";
    link2.className = "delete-function-link";
    link2.onclick = del_function();
    cell5.appendChild(link2);

    table.querySelector("tbody").appendChild(row);
    // 将 tr 数据加入到 data 数组中
    data_function.push(row);

    // 更新总行数和总页数
    totalRows_function = data_function.length;
    totalPages_function = Math.ceil(totalRows_function / rowsPerPage_function);

    // 计算新行所处的页码
    var newRowIndex_function = totalRows_function - 1;
    var newPage_function = Math.ceil((newRowIndex_function + 1) / rowsPerPage_function);
    currentPage_function = newPage_function;

    // 如果当前页满了，就换页
    if (totalRows_function % rowsPerPage_function == 1 && currentPage_function != 1) {
        // showPage(currentPage_function - 1);
        updatePageNumber_function();
    }
    displayTable_function();
}

// 显示表格
function displayTable_function() {
    if (data_function.length > 0) {
        // 如果数据长度为空，则显示图片
        // 否则不显示img，以便表格数据显示
        img_function.style.display = "none";
        table_function.style.display = "table";
    }
    else {
        img_function.style.display = "inline";
        table_function.style.display = "none";
    }
    // 清空表格
    table_function.querySelector("tbody").innerHTML = "";

    // 计算当前页的数据
    var startIndex_function = (currentPage_function - 1) * rowsPerPage_function;
    var endIndex_function = Math.min(startIndex_function + rowsPerPage_function, data_function.length);
    var pageData_function = data_function.slice(startIndex_function, endIndex_function);

    // console.log(pageData);

    // 生成表格数据
    pageData_function.forEach(row => {
        table_function.querySelector("tbody").appendChild(row);
    });

    var tableBody = document.getElementById("tbody-function");


    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_function - 1) * rowsPerPage_function + i + 1;
    }

    if (totalPages_function > 1) {
        var pagination = document.getElementById("pagination-function");
        pagination.style.display = "flex";
    }
}

// 更新页码函数
function updatePageNumber_function() {
    // 找到页码元素
    var pageNumberElement_function = document.getElementById("page-number-function");

    if (currentPage_function > totalPages_function) currentPage_function = totalPages_function;

    // 更新页码文本
    pageNumberElement_function.innerHTML = `${currentPage_function}/${totalPages_function}`;

    // 找到上一页和下一页元素
    var prevPageLink_function = document.getElementById("prev-page-function");
    var nextPageLink_function = document.getElementById("next-page-function");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_function == 1) {
        prevPageLink_function.classList.add("disabled");
    } else {
        prevPageLink_function.classList.remove("disabled");
    }

    if (currentPage_function == totalPages_function) {
        nextPageLink_function.classList.add("disabled");
    } else {
        nextPageLink_function.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_function == 1) || (totalPages_function == 0)) {
        currentPage_function = 1;
        displayTable_function();
        var pagination = document.getElementById("pagination-function");
        pagination.style.display = "none";
    }
}

// 首页显示
function show_first_function() {
    currentPage_function = 1;
    updatePageNumber_function();
    displayTable_function();
}

// 上一页函数
function prevPage_function() {
    if (currentPage_function > 1) {
        // showPage(currentPage_function - 1);
        currentPage_function--;
        displayTable_function();
        updatePageNumber_function();
        console.log("pre")
    }
}

// 下一页函数
function nextPage_function() {
    if (currentPage_function < totalPages_function) {
        // showPage(currentPage_function + 1);
        currentPage_function++;
        displayTable_function();
        updatePageNumber_function();
    }
}

function gotoPage_function() {
    // 找到输入框和确定按钮元素
    var inputBox_function = document.getElementById("page-input-function");
    var button_function = document.getElementById("goto-button-function");

    // 获取输入的页码
    var pageNumber_function = parseInt(inputBox_function.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_function >= 1 && pageNumber_function <= totalPages_function) {
        // showPage(pageNumber);
        currentPage_function = pageNumber_function;
        displayTable_function();
        updatePageNumber_function();
    }

    // 清空输入框
    inputBox_function.value = "";
}

function delfunctiondatabyName(url, index) {
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
                data_function.splice(index - 1, 1);
                //更新总页码
                totalRows_function = data_function.length;
                totalPages_function = Math.ceil(totalRows_function / rowsPerPage_function);

                //计算删除行当前页码
                currentPage_function = Math.ceil(index / rowsPerPage_function);
                // 更新显示
                updatePageNumber_function();
                displayTable_function();
            }
        }
    })
}

//待改!!!
function del_function() {
    var tableBody = document.getElementById("tbody-function");
    var confirmDialog = document.getElementById("confirm-box-function");
    var confirmBtn = document.getElementById("confirmBtn-function");
    var cancelBtn = document.getElementById("cancelBtn-function");

    tableBody.onclick = function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        if (target.classList.contains("delete-function-link")) {
            event.stopImmediatePropagation();
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var row = target.parentNode.parentNode;
                var index = row.children[0].innerText;
                var id = data_function[index - 1].children[0].textContent;
                id--;
                var url = 'DelMainLeft?id=' + id;
                tableBody.removeChild(row);

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                delfunctiondatabyName(url, index);

            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    };
}

function updateImg(select) {
    // 获取选择的选项的索引
    var select = document.getElementById("choose-img");
    var selectedOption = select.options[select.selectedIndex];
    var selectedText = selectedOption.text;

    // 将选项的值分配给特定的名称
    var nameInput = document.getElementById("select-img-name");
    nameInput.value = selectedText;
}

function updateFunc(select) {
    // 获取选择的选项的索引
    var select = document.getElementById("choose-func");
    var selectedOption = select.options[select.selectedIndex];
    var selectedText = selectedOption.text;

    // 将选项的值分配给特定的名称
    var nameInput = document.getElementById("select-func-name");
    nameInput.value = selectedText;
}