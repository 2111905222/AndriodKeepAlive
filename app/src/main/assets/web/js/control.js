//**********************control*****************************

//查询全部列表
function getControldata() { //pageNum
    $.ajax({
        url: "/SearchAllMainRight",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null && data.length==2) {
                data_control.length = 0;
                var ifShowup = "";
                var ifShowdown = "";

                if(data[0].isVisible == "true") ifShowup = "是";
                else ifShowup = "否";

                if(data[1].isVisible == "true")ifShowdown = "是"
                else ifShowdown = "否"

                gen_data_control("右侧上部按钮",data[0].mainTitle,data[0].subTitle,ifShowup,data[0].function);
                gen_data_control("右侧下部按钮",data[1].mainTitle,data[1].subTitle,ifShowdown,data[1].function);

            }
        }
    })
}

//查询全部功能信息
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

//重置选择文件按钮
function resetInput(fileInput) {
    fileInput.value = '';
    fileInput.form.reset();
}




//保存和取消时关闭侧边栏
function removecontrolview() {
    // 获取侧边栏和上传表单元素
    var sidebar_control = document.getElementById("pullsidebar-control");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    sidebar_control.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    // // 清空显示区域
    var imgPreview = document.querySelector('#imgPreview');
    imgPreview.innerHTML = "";
    var fileInput = document.getElementById('fileUpload-control');
    resetInput(fileInput);
}

function gen_data_control(buttonName, heading, subtitle, show, func) {
    var table = document.getElementById("data-table-control");
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
    cell1.innerText = buttonName;//按钮名称
    var cell2 = row.insertCell(2);
    cell2.innerText = heading;//主标题
    var cell3 = row.insertCell(3);
    cell3.innerText = subtitle;//副标题
    var cell4 = row.insertCell(4);
    cell4.innerText = show;//是否显示
    var cell5 = row.insertCell(5);
    cell5.innerText = func;//功能
    var cell6 = row.insertCell(6);
    var link1 = document.createElement("a");
    link1.href = "#";
    link1.textContent = "重新设置";
    link1.className = "write-control-link";
    link1.onclick = write_control();
    cell6.appendChild(link1);
    // var link2 = document.createElement("a");
    // link2.href = "#";
    // link2.textContent = "删除";
    // link2.className = "delete-control-link";
    // link2.onclick = del_control();
    // cell6.appendChild(link2);

    table.querySelector("tbody").appendChild(row);
    // 将 tr 数据加入到 data 数组中
    data_control.push(row);

    // 更新总行数和总页数
    totalRows_control = data_control.length;
    totalPages_control = Math.ceil(totalRows_control / rowsPerPage_control);

    // 计算新行所处的页码
    var newRowIndex_control = totalRows_control - 1;
    var newPage_control = Math.ceil((newRowIndex_control + 1) / rowsPerPage_control);
    currentPage_control = newPage_control;

    // 如果当前页满了，就换页
    if (totalRows_control % rowsPerPage_control == 1 && currentPage_control != 1) {
        // showPage(currentPage_control - 1);
        updatePageNumber_control();
    }
    displayTable_control();
}

// 显示表格
function displayTable_control() {
    // 清空表格
    table_control.querySelector("tbody").innerHTML = "";

    // 计算当前页的数据
    var startIndex_control = (currentPage_control - 1) * rowsPerPage_control;
    var endIndex_control = Math.min(startIndex_control + rowsPerPage_control, data_control.length);
    var pageData_control = data_control.slice(startIndex_control, endIndex_control);

    // console.log(pageData);

    // 生成表格数据
    pageData_control.forEach(row => {
        table_control.querySelector("tbody").appendChild(row);
    });

    var tableBody = document.getElementById("tbody-control");


    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_control - 1) * rowsPerPage_control + i + 1;
    }

    if (totalPages_control > 1) {
        var pagination = document.getElementById("pagination-control");
        pagination.style.display = "flex";
    }
}

// 更新页码函数
function updatePageNumber_control() {
    // 找到页码元素
    var pageNumberElement_control = document.getElementById("page-number-control");

    if (currentPage_control > totalPages_control) currentPage_control = totalPages_control;

    // 更新页码文本
    pageNumberElement_control.innerHTML = `${currentPage_control}/${totalPages_control}`;

    // 找到上一页和下一页元素
    var prevPageLink_control = document.getElementById("prev-page-control");
    var nextPageLink_control = document.getElementById("next-page-control");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_control == 1) {
        prevPageLink_control.classList.add("disabled");
    } else {
        prevPageLink_control.classList.remove("disabled");
    }

    if (currentPage_control == totalPages_control) {
        nextPageLink_control.classList.add("disabled");
    } else {
        nextPageLink_control.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_control == 1) || (totalPages_control == 0)) {
        currentPage_control = 1;
        displayTable_control();
        var pagination = document.getElementById("pagination-control");
        pagination.style.display = "none";
    }
}

// 首页显示
function show_first_control() {
    currentPage_control = 1;
    updatePageNumber_control();
    displayTable_control();
}

// 上一页函数
function prevPage_control() {
    if (currentPage_control > 1) {
        // showPage(currentPage_control - 1);
        currentPage_control--;
        displayTable_control();
        updatePageNumber_control();
        console.log("pre")
    }
}

// 下一页函数
function nextPage_control() {
    if (currentPage_control < totalPages_control) {
        // showPage(currentPage_control + 1);
        currentPage_control++;
        displayTable_control();
        updatePageNumber_control();
    }
}

function gotoPage_control() {
    // 找到输入框和确定按钮元素
    var inputBox_control = document.getElementById("page-input-control");
    var button_control = document.getElementById("goto-button-control");

    // 获取输入的页码
    var pageNumber_control = parseInt(inputBox_control.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_control >= 1 && pageNumber_control <= totalPages_control) {
        // showPage(pageNumber);
        currentPage_control = pageNumber_control;
        displayTable_control();
        updatePageNumber_control();
    }

    // 清空输入框
    inputBox_control.value = "";
}

function getcontroldatabyID(url) {
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);

            if (data != null) {
                var mainTitle = document.getElementById('main-title');
                var subTitle = document.getElementById('sub-title');
                var show = document.getElementById("show");
                var func = document.getElementById("choose-func");
                var ifShow = document.getElementById("ifshow");

                mainTitle.value = data.mainTitle;
                subTitle.value = data.subTitle;
                //是否显示
                if (data.isVisible == "true") {
                    show.checked = true;
                    ifShow.value = "true";
                }
                else {
                    show.checked = false;
                    ifShow.value = "false";
                }
                //功能选择
                for (var i = 0; i < func.options.length; i++) {
                    if (func.options[i].text == data.function) {
                        func.options[i].selected = true;
                        break;
                    }
                }

            }
        }
    })
}

function write_control() {
    var tableBody = document.getElementById("tbody-control");
    var cancelBtn = document.getElementById("cancel-button-control");

    tableBody.onclick = function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        var sidebar_control = document.getElementById("pullsidebar-control");
        if (target.classList.contains("write-control-link")) {
            event.stopImmediatePropagation();
            // 显示侧边栏
            sidebar_control.style.display = "block";
            addCover(parent);

            var row = target.parentNode.parentNode;
            var index = row.children[0].innerText;
            var id = data_control[index - 1].children[0].textContent;

            var url = 'SearchMainRightByID?id=' + id;
            getcontroldatabyID(url);

            var ID = document.getElementById("ID");
            ID.value = id;

            var ifShow = document.getElementById("ifshow");
            var checkShow = document.getElementById("show");            
            checkShow.addEventListener("change", function(){
                if(checkShow.checked) ifShow.value = "true";
                else ifShow.value = "false";
            });

            cancelBtn.onclick = function () {
                sidebar_control.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    };
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