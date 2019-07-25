import Mock from 'mockjs'

const ProposalList = [{
  propoId: '009',
  date: '2019-07-02',
  name: '陈希豪',
  proponame: '关于奉贤校区新建食堂建议',
  proponum: '7',
  checked: false
}, {
  propoId: '008',
  date: '2019-07-04',
  name: '盛泽宇',
  proponame: '关于徐汇校区修建宿舍楼问题',
  proponum: '6',
  checked: true
}, {
  propoId: '007',
  date: '2019-07-01',
  name: '林宇翩',
  proponame: '垃圾分类建议',
  proponum: '4',
  checked: false
}, {
  propoId: '006',
  date: '2019-06-03',
  name: '王琴',
  proponame: '教工调整',
  proponum: '2',
  checked: false
}, {
  propoId: '005',
  date: '2018-05-01',
  name: '卜鑫源',
  proponame: '关于奉贤校区新建游泳馆的建议',
  proponum: '4',
  checked: true
}, {
  propoId: '004',
  date: '2019-02-02',
  name: '胡晓龙',
  proponame: '关于奉贤食堂会议',
  proponum: '7',
  checked: false
}, {
  propoId: '003',
  date: '2019-04-02',
  name: '冯伟恒',
  proponame: '关于徐汇食堂会议',
  proponum: '7',
  checked: false
}, {
  propoId: '002',
  date: '2019-04-02',
  name: '冯伟恒',
  proponame: '关于徐汇食堂会议2',
  proponum: '7',
  checked: false
}, {
  propoId: '001',
  date: '2019-04-02',
  name: '冯伟恒',
  proponame: '关于徐汇食堂会议3',
  proponum: '7',
  checked: false
}, {
  propoId: '003',
  date: '2019-04-02',
  name: '冯伟恒',
  proponame: '关于徐汇食堂会议4',
  proponum: '7',
  checked: false
}, {
  propoId: '003',
  date: '2019-04-02',
  name: '冯伟恒',
  proponame: '关于徐汇食堂会议5',
  proponum: '7',
  checked: false
},{
  propoId: '003',
  date: '2019-04-02',
  name: '冯伟恒',
  proponame: '关于徐汇食堂会议6',
  proponum: '7',
  checked: false
}
]

// for (let i = 0; i < count; i++){
//     ProposalList.push(Mock.mock({
//         propoId:'@integer',
//         date: '@date("yyyy-MM-dd")',
//         name: '@name',
//         proponame: '@cparagraph()',
//         proponum: '@integer',
//         checked: '@boolean()'
//     }))
// }

export default [
  {
    url: '/proposal/list',
    type: 'get',
    response: config =>{
      const { page = 1, limit = 10 } = config.query
        let mockList = ProposalList.filter(item => {
          return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
          code: 20000,
          data: {
            total: mockList.length,
            items: pageList
          }
        }
    }
}
]
