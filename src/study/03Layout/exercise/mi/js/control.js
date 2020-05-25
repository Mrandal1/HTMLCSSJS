window.onload = function () {
    let index = 0;
    let ims = document.querySelectorAll(".img-lists li");
    let poa = document.querySelectorAll(".pointer a");
    let pre = document.querySelector(".pre-next .pre");
    let next = document.querySelector(".pre-next .next");
    let timer;
    poa[index].style.backgroundColor = "hsla(0,0%,100%,.3)";
    poa[index].style.borderColor = "rgba(0 , 0, 0, .4)";

    function setims() {
        for (let i = 0; i < ims.length; i++) {
            ims[i].style.opacity = "0";
        }
    }

    for (let i = 0; i < poa.length; i++) {
        poa[i].num = i;
        poa[i].onclick = function () {
            clearInterval(timer);
            index = this.num;
            setims();
            ims[i].style.transition = "all .5s";
            ims[i].style.opacity = "1";
            setA();
            setTimeout(autoPlay, 5000);
        }
    }
    autoPlay();

    //设置A
    function setA() {
        for (let i = 0; i < poa.length; i++) {
            poa[i].style.backgroundColor = "";
            poa[i].style.borderColor = "";
        }
        poa[index].style.backgroundColor = "hsla(0,0%,100%,.3)";
        poa[index].style.borderColor = "rgba(0 , 0, 0, .4)";

    }


    //轮播函数
    function autoPlay() {
        timer = setInterval(function () {
            index++;
            index %= poa.length;
            setims();
            ims[index].style.opacity = "1";
            setA();
        }, 5000);
    }


    pre.onclick = function () {
        clearInterval(timer);
        index--;
        if (index < 0) {
            index = 5 - Math.abs(index);
        }
        setims();
        ims[index].style.opacity = "1";
        setA();
        setTimeout(autoPlay, 5000);
    };

    next.onclick = function () {
        clearInterval(timer);
        index++;
        index %= poa.length;
        setims();
        ims[index].style.opacity = "1";
        setA();
        setTimeout(autoPlay, 5000);
    };


    //
    function pre_status(i) {
        if (count === 1) {
            sw_pre[i].classList.add("sw_disable");
            sw_pre[i].setAttribute('aria-disabled', "true");
        }
        count--;
        if (count < 0) {
            //到顶部
            sw_pre[i].classList.add("sw_disable");
            sw_next[i].classList.remove("sw_disable");
            sw_pre[i].setAttribute('aria-disabled', "true");
            count = 1;
        } else {
            sw_next[i].classList.remove("sw_disable");
            swiper_wrapper[i].style.transition = "all 1s";
            swiper_wrapper[i].style.transform = "translate3d(" + count * -992 + "px, 0px, 0px)";
        }
    }

    //
    function next_status(i) {
        if (count === 2) {
            sw_next[i].classList.add("sw_disable");
            sw_next[i].setAttribute('aria-disabled', "true");
        }
        count++;
        if (count > 4) {
            //底部禁用
            sw_next[i].classList.add("sw_disable");
            sw_pre[i].classList.remove("sw_disable");
            sw_next[i].setAttribute('aria-disabled', "true");
            count = 3;
        } else {
            sw_pre[i].classList.remove("sw_disable");
            swiper_wrapper[i].style.transform = "translate3d(" + count * -992 + "px, 0px, 0px)";
            swiper_wrapper[i].style.transition = "all 1s";
        }
    }


    let count = 0;
    let sw_pre = document.getElementsByClassName("sw_pre");
    let sw_next = document.getElementsByClassName("sw_next");
    let swiper_wrapper = document.getElementsByClassName("swiper-wrapper");


    for (let i = 0; i < sw_pre.length; i++) {
        sw_pre[i].onclick = function () {
            pre_status(i);
        };
    }
    for (let i = 0; i < sw_next.length; i++) {
        sw_next[i].onclick = function () {
            next_status(i);
        };
    }


    //轮播
    setControl();
    //开始轮播
    let num = 0;

    function setControl() {
        setInterval(function () {
                next_status(0);
               if (count===4){
                   swiper_wrapper[0].style.transition = "none";
                   swiper_wrapper[0].style.transform = "translate3d(" +0+ "px, 0px, 0px)";
                  count=-1;
               }
        }, 5000);
    }

};