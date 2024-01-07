
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

        let window_location_hostname =  window.location.hostname

        if (selectTextLink == ('https://' + window_location_hostname + '/s/?c=')) {
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