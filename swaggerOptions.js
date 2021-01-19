const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Lubimy czytać',
            description: 'Projekt II',
            contact: {
                name: 'KB KK'
            },
            servers: ['http://localhost:9000']
        },
        securityDefinitions: {
            basicAuth: {
                type: 'basic'
            },
            cookieAuth:{
                type: 'apiKey',
                in: 'cookie',
                name: 'auth'
            }
        },
        definitions: {
            Books:{
                type: 'object',
                properties: {
                    ID_book: {
                        type: 'integer'
                    },
                    title:{
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    pages:{
                        type: 'integer'
                    },
                    ID_publisher: {
                        type: 'integer'
                    },
                    ID_genre: {
                        type: 'integer'
                    },
                    releaseDate: {
                        type: 'date'
                    },
                    ID_author:{
                        type: 'string'
                    }
                }
            },
            Authors:{
                type: 'object',
                properties: {
                    ID_author: {
                        type: 'integer'
                    },
                    name: {
                        type: 'string'
                    },
                    surname: {
                        type: 'string'
                    },
                    info: {
                        type: 'string'
                    }
                }
            },
            Publishers: {
                type: 'object',
                properties: {
                    ID_publisher: {
                        type: 'integer'
                    },
                    name: {
                        type: 'string'
                    }
                }
            },
            Genres: {
                type: 'object',
                properties: {
                    ID_genre: {
                        type: 'integer'
                    },
                    name: {
                        type: 'string'
                    }
                }
            },
            Lists:{
                type: 'object',
                properties: {
                    ID_book: {
                        type: 'integer'
                    },
                    ID_user: {
                        type: 'integer'
                    }
                }
            },
            Reviews: {
                type: 'object',
                properties: {
                    ID_review: {
                        type: 'integer'
                    },
                    ID_book: {
                        type: 'integer'
                    },
                    ID_user: {
                        type: 'integer'
                    },
                    contents: {
                        type: 'string'
                    },
                    date: {
                        type: 'date'
                    },
                    rate: {
                        type: 'integer'
                    }
                }
            },
            Users: {
                type: 'object',
                properties: {
                    ID_user: {
                        type: 'integer'
                    },
                    nickname: {
                        type: 'string'
                    },
                    login: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    status: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    }
                }
            },
            Logs: {
                type: 'object',
                properties: {
                    ID_log: {
                        type: 'integer'
                    },
                    description: {
                        type: 'string'
                    },
                    code: {
                        type: 'string'
                    },
                    createdAt: {
                        type: 'string'
                    }
                }
            }
        }
    },
    components:{
        securitySchemas:{
            basicAuth:{
                type: 'http',
                scheme: 'basic'
            },
            cookieAuth:{
                type: 'apiKey',
                in: 'cookie',
                name: 'auth'
            }
        }
    },
    persistAuthorization: true,
    apis: [
        './src/api/auth/auth.controller.js',
        './src/api/Authors/authors.controller.js',
        './src/api/Books/books.controller.js',
        './src/api/Genres/genres.controller.js',
        './src/api/Publishers/publishers.controller.js',
        './src/api/Reviews/review.controller.js',
        './src/api/Users/users.controller.js',
        './src/api/Logs/logs.controller.js'
    ]
};

module.exports = swaggerOptions