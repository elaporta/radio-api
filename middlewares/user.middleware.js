const get = async (req, reply) => {
    const response = { statusCode: 400, error: 'Bad Request', message: 'params/id must be between 1-8' };
    if(req.params.id > 8) return reply.code(response.statusCode).send(response);
    return req;
};

export default {
    get: get
}