// export default {
//     // 支持值为 Object 和 Array
//     'GET /api/users': { users: [1, 2] },

//     // GET POST 可省略
//     '/api/users/1': { id: 1 },

//     // 支持自定义函数，API 参考 express@4
//     'POST /api/users/create': (req, res) => { res.end('OK'); },
// };

export default {
  'GET /api/:vId/test': (req, res) => {
    const { vId } = req.params
    const response = mockAclList

    if (vId === 'v2') {
      res.send(response)
    } else {
      res.send(response.Content)
    }
  }
}
