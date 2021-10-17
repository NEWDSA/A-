const { mock, Random } = require("mockjs")

module.exports = [
    {
        url: '',
        type: 'get',
        result: () => {
            return {
                error: '',
                status: 1,
                // data:{
                //     title:Random.title(7),
                //     headimg:Random.image('96x96','#ffffff'),
                //     message:Random.csentence(),
                //     time:Random.datetime(),
                //     count:Random.natural(0,100)

                // }
                data: mock.mock({
                    'message|5-10': [
                        {
                            title: Random.title(7),
                            headimg: Random.image('96x96', '#ffffff'),
                            message: Random.csentence(),
                            time: Random.datetime(),
                            count: Random.natural(0, 100)
                        }
                    ]
                })
            }
        }
    }
]