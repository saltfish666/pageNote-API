const getUserFromToken = require('./getUserFromToken');

(async () => {
    let user = await getUserFromToken('3333')
    console.log(user)
})();