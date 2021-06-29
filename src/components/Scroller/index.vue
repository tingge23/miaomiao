<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>

import BScroll from 'better-scroll';

export default {
    name: 'Scroller',
    props : {
        handleToScroll : {
            type : Function,
            default : function(){}
        },
        handleTouchEnd : {
            type : Function,
            default : function(){}
        }
    },
    mounted(){
         /* setTimeout(() => {
            //this._initScroll()
                var scroll = new BScroll(this.$refs.wrapper,{
                    tap : true,
                    probeType : 1
                })
            }, 20) */
           /*  var scroll = new BScroll(this.$refs.wrapper,{
                tap : true,
                probeType : 1
            }) */
        this.$nextTick(()=>{ 
         
            var scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                tap : true,
                probeType : 1
            })
        });
        this.scroll = scroll; //全局
        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos);
        });
        scroll.on('touchEnd',(pos)=>{
            this.handleTouchEnd(pos);
        });    
    },
    methods : {
        toScrollTop(y){
            this.scroll.scrollTo(0,y);
        }
    }
}
</script>

<style scoped>
    .wrapper{ height:100%;}
    
</style>
