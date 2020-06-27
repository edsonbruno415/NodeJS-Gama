class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception");
    }
}

class ICrud {
    connect(){
        throw new NotImplementedException();
    }

    create(item){
        throw new NotImplementedException();
    }

    read(query){
        throw new NotImplementedException();
    }

    update(query){
        throw new NotImplementedException();
    }

    delete(id){
        throw new NotImplementedException();
    }
}

module.exports = ICrud;