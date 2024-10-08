//**********************引领*****************************
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

function addlead() {
    var parent = document.getElementById("content");
    // 获取弹窗元素
    var add_lead = document.getElementById("add-box-lead");
    // 显示侧边栏
    add_lead.style.display = 'block';
    // 添加遮挡层
    addCover(parent);
}

//***获取添加数据按钮
function addDataBtn_lead() {
    var addDataBtn_lead = document.getElementById("add-data-btn-lead");

    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_lead.removeEventListener("click", addlead());
    addDataBtn_lead.addEventListener("click", addlead());
}


//保存和取消时关闭侧边栏
function removeleadview() {
    // 获取侧边栏和上传表单元素
    var add_lead = document.getElementById("add-box-lead");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    add_lead.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    //重置    
    var select = document.getElementById("lead-name");
    select.options[0].selected = true;
    select.style.color = 'black';

}

function save_button_lead(button) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const saveButton = document.getElementById('save-button-lead');
    var not_save = addtrlead(event);

    if (!not_save) {
        saveButton.removeEventListener('click', removeleadview()); //监听前要先删除原先的
        saveButton.addEventListener('click', removeleadview());
    }
    else{
        var fileInput = document.getElementById("lead-name");
        if ((fileInput.options[0].selected == true) || (fileInput.options[1].selected == true)) {
            fileInput.options[1].selected = true;
            fileInput.style.color = 'red';
        }
        else{
            fileInput.options[2].selected = true;
            fileInput.style.color = 'red';
        }

        fileInput.addEventListener('mousedown', () => {
            fileInput.options[0].selected = true;
            fileInput.style.color = "black";
        });
    }    
}

function cancel_button_lead(button) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const cancelButton = document.getElementById('cancel-button-lead');

    cancelButton.removeEventListener('click', removeleadview()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removeleadview());
}

//////////////////添加表格数据

//自动添加表格行
function addtrlead(event) {
    var fileUploadForm = document.getElementById("file-upload-form-lead");
    // 阻止表单默认提交行为
    event.preventDefault();

    // 获取文件输入框
    var fileInput = document.getElementById("lead-name"); //原始输入姓名的

    // // 获取表格元素
    var table = document.getElementById("data-table-lead");

    var have_name = false;

    // var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < data_lead.length; i++) {
        // console.log(i);
        if(data_lead[i].children[1].innerText == fileInput.value){
            have_name = true;
        }
    }

    //原始输入姓名的
    if (have_name || (fileInput.value == "0") || (fileInput.value == "1") || (fileInput.value == "2")) {
        return 1;
    }
    else {
        gen_data_lead(table, fileInput);
        return 0;
    }

}

//// 原始输入姓名的
function gen_data_lead(table, fileInput) {
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
    cell1.innerText = fileInput.value;
    var cell2 = row.insertCell(2);
    var link1 = document.createElement("a");
    link1.href = "#";
    link1.textContent = "编辑";
    link1.className = "write-lead-link";
    link1.onclick = write_lead();
    cell2.appendChild(link1);
    var link2 = document.createElement("a");
    link2.href = "#";
    link2.textContent = "删除";
    link2.className = "delete-lead-link";
    link2.onclick = del_lead();
    cell2.appendChild(link2);

    table.querySelector("tbody").appendChild(row);
    // 将 tr 数据加入到 data 数组中
    data_lead.push(row);

    // 更新总行数和总页数
    // totalRows_lead = table.rows.length; //算上的th行
    totalRows_lead = data_lead.length;
    totalPages_lead = Math.ceil(totalRows_lead / rowsPerPage_lead);

    // 计算新行所处的页码
    var newRowIndex_lead = totalRows_lead - 1;
    var newPage_lead = Math.ceil((newRowIndex_lead + 1) / rowsPerPage_lead);
    currentPage_lead = newPage_lead;

    // console.log(table.rows.length, totalRows_lead % rowsPerPage_lead, totalRows_lead, currentPage_lead, totalPages_lead)

    // 如果当前页满了，就换页
    if (totalRows_lead % rowsPerPage_lead == 1 && currentPage_lead != 1) {
        updatePageNumber_lead();
    }
    displayTable_lead();
}

// 显示表格
function displayTable_lead() {
    if (data_lead.length > 0) {
        // 如果数据长度为空，则显示图片
        // 否则不显示img，以便表格数据显示
        img_lead.style.display = "none";
        table_lead.style.display = "table";
    }
    else {
        img_lead.style.display = "inline";
        table_lead.style.display = "none";
    }
    // 清空表格
    table_lead.querySelector("tbody").innerHTML = "";

    // 计算当前页的数据
    var startIndex_lead = (currentPage_lead - 1) * rowsPerPage_lead;
    var endIndex_lead = Math.min(startIndex_lead + rowsPerPage_lead, data_lead.length);
    var pageData_lead = data_lead.slice(startIndex_lead, endIndex_lead);

    // console.log(pageData);

    // 生成表格数据
    pageData_lead.forEach(row => {
        table_lead.querySelector("tbody").appendChild(row);
    });

    var tableBody = document.getElementById("tbody-lead");

    //只能判断当前页的rows
    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_lead - 1) * rowsPerPage_lead + i + 1;
    }

    if (totalPages_lead > 1) {
        var pagination = document.getElementById("pagination-lead");
        pagination.style.display = "flex";
    }
}

// 更新页码函数
function updatePageNumber_lead() {
    // 找到页码元素
    var pageNumberElement_lead = document.getElementById("page-number-lead");

    if (currentPage_lead > totalPages_lead) currentPage_lead = totalPages_lead;

    // 更新页码文本
    pageNumberElement_lead.innerHTML = `${currentPage_lead}/${totalPages_lead}`;

    // 找到上一页和下一页元素
    var prevPageLink_lead = document.getElementById("prev-page-lead");
    var nextPageLink_lead = document.getElementById("next-page-lead");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_lead == 1) {
        prevPageLink_lead.classList.add("disabled");
    } else {
        prevPageLink_lead.classList.remove("disabled");
    }

    if (currentPage_lead == totalPages_lead) {
        nextPageLink_lead.classList.add("disabled");
    } else {
        nextPageLink_lead.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_lead == 1) || (totalPages_lead == 0)) {
        currentPage_lead = 1;
        displayTable_lead();
        var pagination = document.getElementById("pagination-lead");
        pagination.style.display = "none";
    }
}

// 上一页函数
function prevPage_lead() {
    if (currentPage_lead > 1) {
        // showPage(currentPage_lead - 1);
        currentPage_lead--;
        displayTable_lead();
        updatePageNumber_lead();
    }
}

// 下一页函数
function nextPage_lead() {
    if (currentPage_lead < totalPages_lead) {
        // showPage(currentPage_lead + 1);
        currentPage_lead++;
        displayTable_lead();
        updatePageNumber_lead();
    }
}

function gotoPage_lead() {
    // 找到输入框和确定按钮元素
    var inputBox_lead = document.getElementById("page-input-lead");
    var button_lead = document.getElementById("goto-button-lead");

    // 获取输入的页码
    var pageNumber_lead = parseInt(inputBox_lead.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_lead >= 1 && pageNumber_lead <= totalPages_lead) {
        // showPage(pageNumber);
        currentPage_lead = pageNumber_lead;
        displayTable_lead();
        updatePageNumber_lead();
    }

    // 清空输入框
    inputBox_lead.value = "";
}


//删除该行
function del_lead() {
    // 获取所有删除链接，并添加点击事件
    var tableBody = document.getElementById("tbody-lead");
    var confirmDialog = document.getElementById("confirm-box-lead");
    var confirmBtn = document.getElementById("confirmBtn-lead");
    var cancelBtn = document.getElementById("cancelBtn-lead");

    tableBody.onclick = function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        if (target.classList.contains("delete-lead-link")) {
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var row = target.parentNode.parentNode;
                var index = row.children[0].innerText;
                tableBody.removeChild(row);

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                //删除data中相应行
                data_lead.splice(index - 1, 1);
                //更新总页码
                totalRows_lead = data_lead.length;
                totalPages_lead = Math.ceil(totalRows_lead / rowsPerPage_lead);

                //计算删除行当前页码
                currentPage_lead = Math.ceil(index / rowsPerPage_lead);
                // 更新显示
                updatePageNumber_lead();
                displayTable_lead();

            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    };
}

//编辑按钮打开侧边栏
function write_lead() {
    var tableBody = document.getElementById("tbody-lead");
    var saveButton = document.getElementById('save-button-lead-bj');
    var cancelButton = document.getElementById('cancel-button-lead-bj');


    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");

        // 获取侧边栏元素
        var sidebar_lead = document.getElementById("add-box-lead-bj");

        if (target.classList.contains("write-lead-link")) {
            // 显示侧边栏
            sidebar_lead.style.display = "block";
            addCover(parent);

            // 这里的save_button_leadbj()是一个立即调用函数，会立即执行该函数并将其返回值作为参数传递给addEventListener()方法，因此会报错
            saveButton.onclick = function () {
                var row = target.parentNode.parentNode;
                var index = row.children[0].innerText;
                save_button_leadbj(index);
            };

            cancelButton.onclick = function () {
                sidebar_lead.style.display = "none";
                removeCover(parent);
                cancel_button_leadbj();
            };
        }
    });
}

//**********************编辑对应的侧边栏
//保存和取消时关闭侧边栏
function removeleadviewbj() {
    // 获取侧边栏和上传表单元素
    var add_lead = document.getElementById("add-box-lead-bj");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    add_lead.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    //重置    
    var select = document.getElementById("lead-name-bj");
    select.options[0].selected = true;
    select.style.color = 'black';
}

function addtrleadbj(index) {
    var fileUploadForm = document.getElementById("file-upload-form-lead-bj");

    // 获取文件输入框
    var fileInput = document.getElementById("lead-name-bj"); //原始输入姓名的

    var tableBody = document.getElementById("tbody-lead");
    var have_name = false;


    for (var i = 0; i < data_lead.length; i++) {
        // console.log(i);
        if(data_lead[i].children[1].innerText == fileInput.value){
            have_name = true;
        }
    }

    //原始输入姓名的
    if (have_name || (fileInput.value == "0") || (fileInput.value == "1") || (fileInput.value == "2")) {
        return 1;
    }

    else {
        change_data_leadbj(fileInput,index);
        return 0;
    }

}

function change_data_leadbj(fileInput,index) {
    // 创建新的数据行
    // 仅修改了姓名部分
    data_lead[index-1].children[1].innerText = fileInput.value;
    // var row = data_lead[index-1];
    // console.log(row);

    displayTable_lead();//更新显示
}


function save_button_leadbj(index) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const saveButton = document.getElementById('save-button-lead-bj');
    var not_save = addtrleadbj(index);

    if (!not_save) {
        saveButton.removeEventListener('click', removeleadviewbj()); //监听前要先删除原先的
        saveButton.addEventListener('click', removeleadviewbj());
    }
    else{
        var fileInput = document.getElementById("lead-name-bj");
        if ((fileInput.options[0].selected == true) || (fileInput.options[1].selected == true)) {
            fileInput.options[1].selected = true;
            fileInput.style.color = 'red';
        }
        else{
            fileInput.options[2].selected = true;
            fileInput.style.color = 'red';
        }

        fileInput.addEventListener('mousedown', () => {
            fileInput.options[0].selected = true;
            fileInput.style.color = "black";
        });
    }    
}

function cancel_button_leadbj() {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancelButton = document.getElementById('cancel-button-lead-bj');

    cancelButton.removeEventListener('click', removeleadviewbj()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removeleadviewbj());
}