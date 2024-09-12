const radioSchema = {
    getById: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer', minimum: 1 }
            },
            required: ['id'],
            additionalProperties: false
        }
    },

    find: {
        query: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string', minLength: 1 },
                country: { type: 'string', minLength: 3, maxLength: 3 },
                ranking: { type: 'integer', minimum: 1 },
                location: { type: 'string', minLength: 1 },
                genre: { type: 'string', minLength: 1 }
            },
            additionalProperties: false
        }
    }
};

export default radioSchema;