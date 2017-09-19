var WarehouseConfig = function () {
    var $warehouse_id = null;
    var titleForPrices = {
        "IN": "进货价",
        "DAMAGES": "进货价",
        "OVERFLOW": "进货价",
        "CHECK": "进货价",
        "OUT": "出库价",
        "REJECTED": "退货价"
    };

    var keyForPrices = {
        "IN": "buying_price",
        "DAMAGES": "buying_price",
        "OVERFLOW": "buying_price",
        "CHECK": "buying_price",
        "OUT": "batch_price",
        "REJECTED": "buying_price"
    };

    var getTitleForPrice = function (opType) {
        return titleForPrices[opType] ? titleForPrices[opType] : "零售价";
    };

    var getKeyForPrice = function (opType) {
        return keyForPrices[opType] ? keyForPrices[opType] : "price";
    };

    var getOptionsForPrice = function (opType) {

        if ('OUT' === opType) {
            if (isHeadOffice()) {
                return [
                    {value: "price", text: "零售价"},
                    {value: "buying_price", text: "进货价"},
                    {value: "batch_price", text: "批发价"}
                ];
            } else {
                return [
                    {value: "price", text: "零售价"},
                    {value: "batch_price", text: "进货价"}
                ];
            }
        }
    };

    return {
        init: function (warehouse_id) {
            $warehouse_id = warehouse_id;
        },
        getWarehouseId: function () {
            return $warehouse_id;
        },
        getTitleForPrice: getTitleForPrice,
        getKeyForPrice: getKeyForPrice,
        getOptionsForPrice: getOptionsForPrice
    };
}();

var buttonGroup = function () {
    var group;
    var buttons = {
        main: null,
        dropdown: null,
        toogle: null
    };

    var create = function () {
        this.group = $('<div class="btn-group btn-group-xs"/>');
        this.buttons.main = $("<button class='btn btn-primary' />");
        this.buttons.main.text("main");

        var caret = $('<span class="caret"></span>');
        this.buttons.toogle = $('<a class="btn btn-default dropdown-toggle" data-toggle="dropdown" />');

        this.buttons.toogle.append(caret);
        this.buttons.dropdown = $('<ul class="dropdown-menu pull-right" role="menu"/>');

        this.group.append(this.buttons.main);
        this.group.append(this.buttons.toogle);
        this.group.append(this.buttons.dropdown);
    };

    function html() {

    }

    create();

    return {
        buttons: function () {
            return this.buttons;
        },
        html: function () {
            return $("<div/>").append(this.group).html();
        }
    }
};


jQuery.tableConfig = { // 汉化
    "sProcessing": "正在加载数据...",
    "sLengthMenu": "显示_MENU_条 ",
    "sZeroRecords": "没有您要搜索的内容",
    "sInfo": "从_START_ 到 _END_ 条记录(共 _TOTAL_ 条)",
    "sInfoEmpty": "记录数为0",
    "sInfoFiltered": "(全部记录数 _MAX_  条)",
    "sInfoPostFix": "",
    "sSearch": "搜索",
    "sUrl": "",
    "oPaginate": {
        "sFirst": "<<",
        "sPrevious": "< ",
        "sNext": ">",
        "sLast": ">> "
    }
};

jQuery.tableOptions = function () {
    var options = {
        bProcessing: true,
        bLengthChange: false, // 是否启用设置每页显示记录数
        iDisplayLength: 10, // 默认每页显示的记录数
        bFilter: true, // 是否使用搜索
        oLanguage: jQuery.tableConfig,
        serverSide: true,
        bSort: false,
        searching: false,
        // sPaginationType: "full_numbers", //详细分页组，可以支持直接跳转到某页
        "bAutoWidth": true, //是否自适应宽度
        //"bScrollInfinite" : false, //是否启动初始化滚动条
        "bScrollCollapse": true, //是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变
        "bPaginate": true, //是否显示（应用）分页器
        "bInfo": true, //是否显示页脚信息，DataTables插件左下角显示记录数
        "deferRender": true
    };
    return options;
};

jQuery.mergeOptions = function (firstOptions, secondOptions) {
    if (secondOptions) {
        for (var name in secondOptions) {
            firstOptions[name] = secondOptions[name];
        }
    }
    return firstOptions;
}

jQuery.tableRender = function () {
    return {
        renderDatetime: function (time) {
            if (!time) {
                return "";
            }
            var now = new Date(time);
            var year = now.getYear() + 1900;
            var month = now.getMonth() + 1;
            month = (month < 10) ? "0" + month : month;
            var date = now.getDate();
            date = (date < 10) ? "0" + date : date;
            var hour = now.getHours();
            hour = (hour < 10) ? "0" + hour : hour;
            var minute = now.getMinutes();
            minute = (minute < 10) ? "0" + minute : minute;
            var second = now.getSeconds();
            second = (second < 10) ? "0" + second : second;
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":"
                + second;
        },
        renderTimestamp: function (timestamp) {
            return this.renderDatetime(parseInt(timestamp) * 1000);
        },
        renderBoolean: function (value) {
            return value ? "是" : "否";
        },
        renderThumbnail: function (url) {
            var cover = $("<img />");
            cover.addClass("thumbnail");
            cover.attr("src", url);
            return $("<div/>").append(cover).html();
        },
        renderHtml: function (data) {
            var span = $("<div/>").css({
                'width': '200px',
                'word-wrap': 'break-word',
                'word-break': 'normal'
            }).html(data);
            return $("<div/>").append(span).html();
        }
    };
};


var createOnlickString = function (funcName, args) {
    if (args.length > 0) {
        return ["javascript:" + funcName, '(', args.map(function (data) {
            if (data == 'this') {
                return 'this';
            }
            else {
                return ("'" + data + "'").replace(/\"/g, "\\\"");
            }
        }).join(","), ')'].join("");
    } else {
        return ["javascript:" + funcName, '()'].join("");
    }
};


var ButtonRender = function () {

    var calcIndex = function (index) {
        index = (index ? index : 0);
        // index = index > 3 ? 0 : index;
        return index;
    };
    // 没有下拉框的
    var createGroup = function (options) {
        var buttons = [];

        var group = $('<div class="btn-group btn-group-xs btn-group-margin" role="group" aria-label="Extra-small button group" />');

        // 默认创建3个
        var size = 3;
        if (options && options.size) {
            size = options.size;
        }

        for (var i = 0; i < size; i++) {
            buttons.push($('<a type="button" class="btn btn-default">未定义</a>'));
        }

        // 添加按钮
        group.append(buttons);

        return {
            main: group,
            buttons: buttons,
            onclick: function (index, method, args, title) {
                buttons[calcIndex(index)].text(title)
                    .attr("onclick", createOnlickString(method, args));
            },
            onhref: function (index, options) {
                var button = buttons[calcIndex(index)];
                button.text(options.title).attr("target", options.target);
                var url = options.url;
                if (options.data && url) {
                    var urls = options.url.split("?");
                    url = urls[0] + "?";
                    if (urls[1]) {
                        url += urls[1] + "&";
                    }
                    for (var i in options.data) {
                        if (options.data[i]) {
                            var pair = i + "=" + options.data[i];
                            url += pair + "&"
                        }
                    }
                }
                button.attr("href", url);
            },
            tag: function (index, tag, title) {
                var button = buttons[calcIndex(index)].text(title);
                return button.attr("data-tag", tag);
            },
            html: function () {
                return $("<div/>").append(group).html();
            }
        }
    };

    var createCheckbox = function (options) {
        var group = $('<div/>');
        var buttons = [$('<input type="checkbox" />')];

        if (options.checked) {
            buttons[0].attr('checked', 'checked');
        }

        group.append(buttons);

        return {
            main: group,
            buttons: buttons,
            onclick: function (method, args) {
                buttons[0].attr("onclick", createOnlickString(method, args));
            },
            html: function () {
                return $("<div/>").append(group).html();
            }
        }
    };

    // 有下拉框的
    var createDropdown = function () {
        mGroup = null;
        mButtons = {
            main: null,
            dropdown: null,
            toogle: null
        };

        var create = function () {
            mGroup = $('<div class="btn-group btn-group-xs"/>');
            mButtons.main = $("<button class='btn btn-primary' />");
            mButtons.main.text("main");

            var caret = $('<span class="caret"></span>');
            mButtons.toogle = $('<a class="btn btn-default dropdown-toggle" data-toggle="dropdown" />');

            mButtons.toogle.append(caret);
            mButtons.dropdown = $('<ul class="dropdown-menu pull-right" role="menu"/>');

            mGroup.append(this.mButtons.main);
            mGroup.append(mButtons.toogle);
            mGroup.append(mButtons.dropdown);
        };

        create();

        return {
            buttons: mButtons,
            main: mGroup,
            onclick: function (el, method, args) {
                el.attr("onclick", createOnlickString(method, args));
            },
            html: function () {
                return $("<div/>").append(mGroup).html();
            }
        }
    };

    return {
        createGroup: createGroup,
        createCheckbox: createCheckbox
    }
}();

var KeyGenerater = function () {
    var createKey = function (prefix) {
        var prefix = prefix ? prefix : "YYZ";
        return prefix + new Date().getTime();
    };

    return {
        createKey: createKey
    };
}();


var toastImpl = function (title, message, method) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    toastr[method](title, message);
};

var toastError = function (title, message) {
    if (title && message) {
        toastImpl(title, message, "error");
    } else {
        toastImpl("操作失败", title, "error");
    }
};

var toastWarn = function (title, message) {
    if (title && message) {
        toastImpl(title, message, "warning");
    } else {
        toastImpl("操作警告", title, "warning");
    }
};

var toastInfo = function (title, message) {
    if (title && message) {
        toastImpl(title, message, "info");
    } else {
        toastImpl("操作提示", title, "info");
    }
};

var toastSuccess = function (title, message) {
    if (title && message) {
        toastImpl(title, message, "success")
    } else {
        toastImpl("操作成功", title, "success");
    }
};

var toastStatus = function (data) {
    if (0 == data.status) {
        toastSuccess(data.toast, data.message);
    } else {
        if (data.status) {
            toastError(data.toast, data.message);
        } else {
            window.location.href = "/"
        }
    }
};

//获取href所带指定参数的值
function getUrlParams(val) {
    var uri = window.location.search;
    var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
    return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
}
//日期格式化
function dateFormat(now, mask) {
    var d = now;
    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };

    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return d.getDate();
            case 'dd':
                return zeroize(d.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
            case 'M':
                return d.getMonth() + 1;
            case 'MM':
                return zeroize(d.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
            case 'yy':
                return String(d.getFullYear()).substr(2);
            case 'yyyy':
                return d.getFullYear();
            case 'h':
                return d.getHours() % 12 || 12;
            case 'hh':
                return zeroize(d.getHours() % 12 || 12);
            case 'H':
                return d.getHours();
            case 'HH':
                return zeroize(d.getHours());
            case 'm':
                return d.getMinutes();
            case 'mm':
                return zeroize(d.getMinutes());
            case 's':
                return d.getSeconds();
            case 'ss':
                return zeroize(d.getSeconds());
            case 'l':
                return zeroize(d.getMilliseconds(), 3);
            case 'L':
                var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(m);
            case 'tt':
                return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z':
                return d.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed
            default:
                return $0.substr(1, $0.length - 2);
        }
    });
};

function transLevel(level) {
    if (level == '1') {
        return '银卡';
    } else if (level == '2') {
        return '金卡';
    } else if (level == '3') {
        return '白金卡';
    } else if (level == '4') {
        return '钻石卡';
    } else if (level == '5') {
        return '黑钻卡';
    } else {
        return '';
    }
}

function transStatus(status) {
    if (status === 'normal') {
        return '正常';
    } else if (status === 'lost') {
        return '挂失';
    } else if (status === 'disable') {
        return '失效';
    } else if (status === 'forbid') {
        return '禁用';
    } else {
        return '';
    }

}

var ProductRender = function () {
    var renderOps = function (data) {
        var group = ButtonRender.createGroup();
        group.onhref(0, {
            url: "/webui/product/add",
            data: {
                product_id: data.product_id
            },
            title: "修改",
            target: ""
        });
        group.onhref(1, {
            url: "/webui/product/detail",
            data: {
                product_id: data.product_id
            },
            title: "详情",
            target: ""
        });
        return group.html();
    };


    return {
        renderOps: renderOps
    };

}();

function alertMessage(message) {
    $.confirm({
        keyboardEnabled: true,
        title: false,
        content: "<h4>" + message + "</h4>",
        animationBounce: 1.5,
        confirmButton: false,
        cancelButton: false
    });
}

function convertCurrency(currencyDigits) {

    var MAXIMUM_NUMBER = 99999999999.99;  //最大值
    // 定义转移字符
    var CN_ZERO = "零";
    var CN_ONE = "壹";
    var CN_TWO = "贰";
    var CN_THREE = "叁";
    var CN_FOUR = "肆";
    var CN_FIVE = "伍";
    var CN_SIX = "陆";
    var CN_SEVEN = "柒";
    var CN_EIGHT = "捌";
    var CN_NINE = "玖";
    var CN_TEN = "拾";
    var CN_HUNDRED = "佰";
    var CN_THOUSAND = "仟";
    var CN_TEN_THOUSAND = "万";
    var CN_HUNDRED_MILLION = "亿";
    var CN_DOLLAR = "元";
    var CN_TEN_CENT = "角";
    var CN_CENT = "分";
    var CN_INTEGER = "整";

    // 初始化验证:
    var integral, decimal, outputCharacters, parts;
    var digits, radices, bigRadices, decimals;
    var zeroCount;
    var i, p, d;
    var quotient, modulus;

    // 验证输入字符串是否合法
    if (currencyDigits.toString() == "") {
        console.log("请输入有效数字");
        return;
    }

    //判断是否输入有效的数字格式
    var reg = /^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/;
    if (!reg.test(currencyDigits)) {
        console.log("请输入有效数字");
        return;

    }

    currencyDigits = currencyDigits.replace(/,/g, "");
    currencyDigits = currencyDigits.replace(/^0+/, "");
    //判断输入的数字是否大于定义的数值
    if (Number(currencyDigits) > MAXIMUM_NUMBER) {
        console.log("请输入有效数字");
        return;
    }

    parts = currencyDigits.split(".");
    if (parts.length > 1) {
        integral = parts[0];
        decimal = parts[1];
        decimal = decimal.substr(0, 2);
    }
    else {
        integral = parts[0];
        decimal = "";
    }
    // 实例化字符大写人民币汉字对应的数字
    digits = [CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE];
    radices = ["", CN_TEN, CN_HUNDRED, CN_THOUSAND];
    bigRadices = ["", CN_TEN_THOUSAND, CN_HUNDRED_MILLION];
    decimals = [CN_TEN_CENT, CN_CENT];

    outputCharacters = "";
    //大于零处理逻辑
    if (Number(integral) > 0) {
        zeroCount = 0;
        for (i = 0; i < integral.length; i++) {
            p = integral.length - i - 1;
            d = integral.substr(i, 1);
            quotient = p / 4;
            modulus = p % 4;
            if (d == "0") {
                zeroCount++;
            }
            else {
                if (zeroCount > 0) {
                    outputCharacters += digits[0];
                }
                zeroCount = 0;
                outputCharacters += digits[Number(d)] + radices[modulus];
            }
            if (modulus == 0 && zeroCount < 4) {
                outputCharacters += bigRadices[quotient];
            }
        }
        outputCharacters += CN_DOLLAR;
    }
    // 包含小数部分处理逻辑
    if (decimal != "") {
        for (i = 0; i < decimal.length; i++) {
            d = decimal.substr(i, 1);
            if (d != "0") {
                outputCharacters += digits[Number(d)] + decimals[i];
            }
        }
    }
    //确认并返回最终的输出字符串
    if (outputCharacters == "") {
        outputCharacters = CN_ZERO + CN_DOLLAR;
    }
    if (decimal == "") {
        outputCharacters += CN_INTEGER;
    }
    return outputCharacters;
}

var RemoveConfirm = function () {
    var processRemove = function (url, params, success) {
        $.post(url, params, function (data) {
            toastStatus(data);
            if (0 == data.status && success instanceof Function) {
                success(data);
            }
        });
    };

    return {
        remove: function (url, params, success) {
            var options = {
                theme: 'dark',
                title: '删除确认!',
                content: '<div align="center">是否确定要删除该记录？</div>',
                buttons: {
                    confirm: {
                        text: '确认',
                        btnClass: 'btn-warning',
                        action: function () {
                            processRemove(url, params, success);
                        }
                    },
                    cancel: {
                        text: '取消',
                        btnClass: 'btn-default'
                    }
                }
            };
            $.confirm(options);
        }
    };
}();


$(function () {
    if (window.localStorage.getItem('toggle') == 0) {
        $('#app').addClass('expanded');
    }
});