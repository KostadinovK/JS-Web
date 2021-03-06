module.exports = {
    development: {
        port: process.env.PORT || 3000,
        connectionString: 'mongodb://localhost:27017/cubes',
        secret: 'super hidden and awesome secret',
        jwtExpiringTime: '1h',
        authCookieName: 'auth_cookie'
    },
    production: {}
};