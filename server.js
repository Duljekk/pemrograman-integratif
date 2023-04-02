const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mysql = require('mysql2');

let PROTO_PATH = 'buku.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const booksPackage = grpcObject.booksPackage;

const server = new grpc.Server();

server.addService(booksPackage.newService.service, {
  addBooks: addBooks,
});

server.bindAsync('127.0.0.1:3000', grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) throw error;

  console.log(`Server running at ${port}`);
  server.start();
});

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'pemrograman_integratif',
});

function addBooks(call, callback) {
    
    const id = call.request.id;
    const title = call.request.title;
    const author = call.request.author;
    const published_year = parseInt(call.request.published_year, 11);
  
    connection.query(
      `INSERT INTO books (id, title, author, published_year) VALUES (?, ?, ?, ?)`,
      [id, title, author, published_year],
      (error, results, fields) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
          return;
        }
  
        callback(null, { message: 'Book added successfully' });
      }
    );
  }