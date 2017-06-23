/**
 * Created by lixiaoran on 2017/1/19.
 */

    var Footer = {

        dom : {
            service : $('#service'),
            vChat : $('#VChat'),
            app : $('#App'),
            serviceImg : $('#service-img'),
            vChatImg : $('#vchat-img'),
            appImg : $('#app-img'),
        }
    };

    Footer.init = function(){

        var _self = this;

        this.dom.service.mouseover(function(){
            _self.dom.serviceImg.addClass('mouse-box');
        }).mouseout(function(){
            _self.dom.serviceImg.removeClass('mouse-box');
        })

        this.dom.vChat.mouseover(function(){
            _self.dom.vChatImg.addClass('mouse-box');
        }).mouseout(function(){
            _self.dom.vChatImg.removeClass('mouse-box');
        })

        this.dom.app.mouseover(function(){
            _self.dom.appImg.addClass('mouse-box');
        }).mouseout(function(){
            _self.dom.appImg.removeClass('mouse-box');
        })
    }


    //入口
    $(function(){
        Footer.init();
    })




