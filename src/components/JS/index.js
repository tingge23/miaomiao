import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox=(function(){
    

    return function(opts){  //配置参数

        var defaults={
            title :'',
            conent : '',
            cancel : '',
            ok : '',
            handleCancel :null,
            handleOk : null
        };
        
        var MyComponent=Vue.extend(MessageBox); //类和组件结合

        for (var attr in opts){
            defaults[attr] = opts[attr];

        }
       
        var vm= new MyComponent({
            el: document.createElement('div'), //template会将el替换
            data :{
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok,
                
            },
            methods : {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);  //call直接触发调用
                    document.body.removeChild( vm.$el );
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild( vm.$el );
                }
            }
        });
        document.body.appendChild( vm.$el );

    }
})(); //闭包