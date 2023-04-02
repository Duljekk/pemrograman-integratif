const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

let PROTO_PATH = 'buku.proto'

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef)

const booksPackage = grpcObject.booksPackage

const client = new booksPackage.newService('localhost:3000', grpc.credentials.createInsecure());

const id = '';
const title = 'Operation Overlord';
const author = 'Dolor Sit';
const published_year = '1944';

client.addBooks({ id, title, author, published_year }, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(response.message);
});