//每次调用$.get() $.post() $.ajax() 的时候 会先调用这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求之前 统一拼接请求的根路径
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        //在complete函数可以使用res.responseJSON拿到服务器响应回来数据 
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.清除本地储存的 token
            localStorage.removeItem('token')
                //2.重新跳转到登录首页
            location.href = '/login.html'
        }

    }
})