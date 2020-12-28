const asyncHandler = (callback) => {    //zajmuje sie bledami i nie potrzeba wtedy bloku try catch
    return function(req, res, next){
        callback(req, res, next).catch(next);
    }
}

module.exports = asyncHandler;