//used to strore configuration information for our server
module.exports = {

    //secret for signing json web token
    'secretKey' : '12345-67890-09876-54321',
    //url for mongodb server
    //'mongoUrl' : 'mongodb://localhost:27017/vote'
    'mongoUrl' : 'mongodb+srv://ashish:ashish@cluster0.tgefg.mongodb.net/test?retryWrites=true&w=majority'
}