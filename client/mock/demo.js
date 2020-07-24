export default {
  'GET /api/:vId/test': (req, res) => {
    const { vId } = req.params;
    const response = mockAclList;

    if (vId === 'v2') {
      res.send(response);
    } else {
      res.send(response.Content);
    }
  },
};
