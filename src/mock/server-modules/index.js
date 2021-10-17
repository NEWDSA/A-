const Mock =require('mockjs')

export default{
    'GET /mock/user_info/message':(req,res)=>{
        return res.json({
            error:'',
            status:1,
            data:Mock.mock({
                'message|5-10':[
                    {
                        title:'@ctitle',
                        headimg:'@image("96x96","#ffffff")',
                        message:'@csentence()',
                        time:'@datetime()',
                        count:'@natural()'
                    }
                ]
            })
        })
    }
}