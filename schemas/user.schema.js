const userSchema = {
    get: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            },
            required: ['id']
        }
    }
};

export default userSchema;