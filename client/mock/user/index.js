import { mockLoginData } from './mockData'

export default {
  'POST /api/:vId/login': (req, res) => {
    const { vId } = req.params
    const response = mockLoginData

    if (vId === 'v2') {
      res.send(response)
    } else {
      res.send(response.Content)
    }
  }
}
