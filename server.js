const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mysql = require('mysql2');

let PROTO_PATH = 'mahasiswa.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const mahasiswaPackage = grpcObject.MahasiswaPackage;

const server = new grpc.Server();

server.addService(mahasiswaPackage.MahasiswaService.service, {
  addMahasiswa: addMahasiswa,
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

function addMahasiswa(call, callback) {
    
    const id_mahasiswa = call.request.id_mahasiswa;
    const nama = call.request.nama;
    const nrp = call.request.nrp;
    const nilai = call.request.nilai;
  
    connection.query(
      `INSERT INTO mahasiswa (id_mahasiswa, nama, nrp, nilai) VALUES (?, ?, ?, ?)`,
      [id_mahasiswa, nama, nrp, nilai],
      (error) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
          return;
        }
  
        callback(null, { message: 'Mahasiswa berhasil ditambahkan' });
      }
    );
  }