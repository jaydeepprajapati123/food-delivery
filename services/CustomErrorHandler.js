class CustomErrorHandler extends Error {
    constructor(statusCode,status,message){
        super();
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }

    static AlreadyExist(message){
        return new CustomErrorHandler(409,0,message);
    }

    static NotFound(message){
        return new CustomErrorHandler(404,0,message);
    }

    static NotAllowed(message){
        return new CustomErrorHandler(405,0,message);
    }

    static NotValid(message){
        return new CustomErrorHandler(400,0,message);
    }
}


export default CustomErrorHandler;