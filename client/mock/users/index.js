import { userListData } from './mockData';

export default {
  'GET /api/:vId/user/list': (req, res) => {
    const { vId } = req.params;
    const response = userListData;

    if (vId === 'v2') {
      res.send(response);
    } else {
      res.send(response.Content);
    }
  },
};
