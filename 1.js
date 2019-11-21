序号 
品牌 Brand
型号 Model
外圈 OutD
内圈 InnerD
滚动体 Rolling
保持架 Cage



接口调用：YZ_GetAllBearingList( { Brand:'', Model:'' },function(res,data){
    console.log('接口返回:',res,data)
});


品牌：Brand
型号：Model


接口返回: 0 {
 "BearingList" : ,
 "Size" : 4
}



返回值带一个整数标识一些状态
0 成功且有数据  
1 查询数据库出错  
2 没有数据