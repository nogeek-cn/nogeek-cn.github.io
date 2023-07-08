
$('.log-wechat-darian').on('mousemove', function(ev) {
    var left = ev.clientX - 85
    var top = ev.clientY - 170
    $('.log-wechat-darian-img').css({
        top: top + 'px',
        left: left + 'px',
        display: 'block'
    })
})
$('.log-wechat-darian').on('mouseout', function() {
    $('.log-wechat-darian-img').css('display', 'none')
})

// 下边是分享

function shortLinkButtonOnClick(e) {
    console.log("shortLinkButtonOnClick.e: " + e)
    let selectTextLink = selectText(e);
    console.log('selectTextLink:' + selectTextLink);
    console.log('(selectTextLink == \'https://blog.notgeek.cn/s/?c=\'): ' + (selectTextLink == 'https://blog.notgeek.cn/s/?c='));
    if (selectTextLink == 'https://blog.notgeek.cn/s/?c=') {
        console.log('选择当前的页面链接')
        selectTextLink = location.href;
        copyText(selectTextLink);
        console.log('longLink' + selectTextLink);
        createSnackbar({
            message: "链接地址复制成功",
            actionText: "快去分享吧"
        })
    } else {
        console.log('当前是短链接')
        copyText(selectTextLink);
        console.log('shortLink:' + selectTextLink);
        createSnackbar({
            message: "短链接复制成功",
            actionText: "快去分享吧"
        })
    }
}
/**
 * 返回当前元素的文本内容
 * @parm {DOM} element 当前DOM元素
 */
function selectText(element) {
    return element.innerText;
}

/**
 * @param {String} text 需要复制的内容
 * @return {Boolean} 复制成功:true或者复制失败:false  执行完函数后，按ctrl + v试试
 */
function copyText(text) {
    var textValue = document.createElement('textarea');
    textValue.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
    textValue.value = text;
    document.body.appendChild(textValue); //将textarea添加为body子元素
    textValue.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textValue);//移除DOM元素
    console.log("复制成功");
    return res;
}

$('.log-share-darian').click(function () {
    console.log("log-share-darian onclick ...");
    // sns-links.html 应该被引入了两次，发现有两个，直接取第一个就行了
    shortLinkButtonOnClick(document.getElementsByClassName('darian-share-short-link')[0]);
})



// 获取 Cookie 的 value
function getCookie(name) {
    //可以搜索RegExp和match进行学习
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

function setCookie7Days(cookie_name, cookie_value) {
    // console.log('https://docs.darian.top/'.replace('https://', ''));
    // console.log('http://docs.darian.top/'.replace('https://', '').replace('http://', '').startsWith('docs.darian.top'));
    var exp = new Date();
    exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);// 过期时间 7 天
    if (location.href.replace('https://', '').replace('http://', '').startsWith('docs.darian.top')) {
        // console.log(location.href.replace('https://', '').replace('http://', '').startsWith('docs.darian.top'));
        // 如果是 docs.darian.top 的话，设置到 darian.top 下
        document.cookie = cookie_name + "=" + escape(cookie_value) + "; domain=darian.top; expires=" + exp.toGMTString();
    } else {
        document.cookie = cookie_name + "=" + escape(cookie_value) + ";expires=" + exp.toGMTString();
    }
}

function setCookie1Days(cookie_name, cookie_value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 1);// 过期时间 1 天
    document.cookie = cookie_name + "=" + escape(cookie_value) + ";expires=" + exp.toGMTString();
}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function check_token_value(token_value) {

    $('#table_tbody_id').html("");

    return check_obj(token_value,
        'function{checkTokenValue}...',
        "用户没有登录 ... ... ");
}

function check_param_value(param_value) {
    $('#table_tbody_id').html("");

    return check_obj(param_value,
        'function{check_param_value}...',
        "请输入关键词 ... ... ");
}

function check_file_path_sub_docs_file_path(file_path_sub_docs_file_path) {
    return check_obj(file_path_sub_docs_file_path,
        'function{check_file_path_sub_docs_file_path}...',
        "文章Id 非法 ... ... ");
}


function check_token_value(token_value) {
    $('#table_tbody_id').html("");
    return check_obj(token_value,
        'function{checkTokenValue}...',
        "用户没有登录 ... ... ");
}

function check_obj(obj, log_msg, notify_msg_html) {
    console.log(log_msg);

    if (!obj) {
        $('#notifyMsg_id').html(notify_msg_html);
        return false;
    }
    return true;

}


// 设置一个自动关闭的弹窗

function showMsg(val, time) {
    if (!document.getElementById('parent_pop_up')) {
        var parent_pop_up = document.createElement('div');
        parent_pop_up.id = "parent_pop_up";
        parent_pop_up.style.cssText = "position: fixed; z-index: 9999; bottom: 5rem; width: 100%;";
        var poo_up = document.createElement('div');
        poo_up.id = 'poo_up';
        poo_up.style.cssText = 'height: 30rem; margin:0 auto; text-align: center;';
        var span = document.createElement('span');
        // letter-spacing 高度
        // border-radius 圆角
        span.style.cssText = 'background-color: rgba(0,0,0,0.6); padding: 0.2rem 0.35rem; letter-spacing: 1px; border-radius: 9px; color: #FFFFFF; font-size: 3rem; text-align: center;';
        span.innerHTML = val;
        poo_up.appendChild(span);
        parent_pop_up.appendChild(poo_up);
        document.body.appendChild(parent_pop_up);
        if (time == null || time == '') {
            time = 2000;
        }

        setTimeout(function () {
            hideMsg();
        }, time);

    }

}

//隐藏显示框
function hideMsg() {
    var pop = document.getElementById('parent_pop_up');
    pop.style.display = 'none';
    document.body.removeChild(pop);
}
