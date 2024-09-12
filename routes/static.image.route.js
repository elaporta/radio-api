const staticImageRoute = [
    {
        method: 'GET',
        url: '/images/:fileName',
        schema: { params: { type: 'object', properties: { fileName: { type: 'string', minLength: 3 } }, required: ['fileName'] } },
        handler: (req, reply) => {
            const { fileName } = req.params;
            return reply.sendFile(fileName);
        }
    }
];

export default staticImageRoute;