<template>
    <div class="city_body">
        <div class="city_list">
           <!--  <Loading v-if="isLoading" /> -->
            <!-- <Scroller v-else ref="city_list"> -->
                
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <!-- <li>上海</li>
                            <li>北京</li>
                             -->
                            <li  v-for="item in hotList" :key="item.id" >{{ item.nm }}</li>
                        </ul>
                    </div>
                    <!-- <div class="city_sort">
                        <div>
                            <h2>A</h2>
                            <ul>
                                <li>阿拉善盟</li>
                            </ul> 
                            
                        </div>
                        
                    </div> -->
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li  v-for="itemList in item.list" :key="itemList.id">{{ itemList.nm }}</li>
                            </ul>
                        </div>
                    </div>
               
            <!-- </Scroller> -->
        </div>
       <!--  <div class="city_index">
            <ul>
                <li>A</li>
            </ul>
        </div> -->
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'City',
    data(){
        return {
            cityList : [],
            hotList : [{nm:'上海',id:10},{nm:'北京',id:1},{nm:'广州',id:20},{nm:'深圳',id:30},{nm:'厦门',id:62},{nm:'长沙',id:70},{nm:'重庆',id:45}],
            isLoading : true
        }
    },
    mounted () {
            var cityList = window.localStorage.getItem('cityList');
            if(cityList){
                this.cityList = JSON.parse(cityList);
                this.isLoading = false;
            }else{
                axios.get("/dianying/cities.json").then(res => {
                    // console.log(res);
                    var statusText = res.statusText
                    if(statusText === 'OK'){
                        this.isLoading = false;
                        var cities = res.data.cts;
                        var cityList = this.formatCityList(cities);
                        this.cityList = cityList;
                        window.localStorage.setItem('cityList',JSON.stringify(cityList));
                    }
                });
            }
        },
    methods : {
        formatCityList(cities){
            var cityLies = [];
            //var hotList = [];

            for(var i=0;i<cities.length;i++){
                var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                if(toCom(firstLetter)){ //新添加index
                    cityLies.push({
                        index : firstLetter ,
                        list :[{ 
                            nm : cities[i].nm, 
                            id : cities[i].id
                            }]
                        });
                }else{  //累加到已有index中
                    for(var j=0;j<cityLies.length;j++){
                        if(cityLies[j].index === firstLetter){
                            cityLies[j].list.push ({ 
                                nm : cities[i].nm ,
                                id : cities[i].id
                            })
                        }
                    }
                }
            }
            cityLies.sort((n1,n2)=>{
                    if(n1.index < n2.index){
                        return -1;
                    }else if(n1.index > n2.index){
                        return 1;
                    }else{
                        return 0;
                    }
                })
            function toCom(firstLetter){
                for(var i=0;i<cityLies.length;i++){
                    if(cityLies[i].index === firstLetter){
                        return false;
                    }
                }
                return true;
            }
            //console.log( cityLies );
            return cityLies;
        },
        handleToIndex(index){
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            // console.log(h2[index].offsetTop);
            // console.log(this.$refs.city_list.toScrollTop);
            // this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
            //this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
        },
        /* handleToCity(nm,id){
            this.$store.commit('city/CITY_INFO',{ nm,id });
            window.localStorage.setItem('nowNm',nm);
            window.localStorage.setItem('nowId',id);
            this.$router.push('/movie/NowPlaying')
        } */
       
    }

}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}

.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}

.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
