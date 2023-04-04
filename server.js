const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mysql = require('mysql2');

let PROTO_PATH = 'mahasiswa.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const MahasiswaPackage = grpc.loadPackageDefinition(packageDef).MahasiswaPackage;

const server = new grpc.Server();

server.addService(MahasiswaPackage.MahasiswaService.service, {
  AddMahasiswa(call, callback) {
    
    const id_mahasiswa = call.request.id_mahasiswa;
    const nama = call.request.nama;
    const nrp = call.request.nrp;
    const nilai = call.request.nilai;

    console.log(`Received POST request for nama = ${nama}`);
  
    connection.query(
      `INSERT INTO mahasiswa (id_mahasiswa, nama, nrp, nilai) VALUES (?, ?, ?, ?)`,
      [id_mahasiswa, nama, nrp, nilai],
      (error) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
          return;
        }
  
        callback(null, {});
      }
    );
  },

  GetMahasiswa(call, callback) {
    const nama = call.request.nama;

    console.log(`Received GET request for nama = ${nama}`);

    connection.query(
      `SELECT * FROM mahasiswa WHERE nama = ?`,
      [nama],
      (error, results) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
          return;
        }
        if (results.length === 0) {
          callback(`Mahasiswa dengan nama ${nama} tidak ditemukan`, null);
          return;
        }
        const mahasiswa = results[0];
        callback(null, {
          id_mahasiswa: mahasiswa.id_mahasiswa,
          nama: mahasiswa.nama,
          nrp: mahasiswa.nrp,
          nilai: mahasiswa.nilai
        });
      }
    );
  },

  UpdateMahasiswa(call, callback) {
    const nama = call.request.nama;
    const nilai = call.request.nilai;

    console.log(`Received PUT request for nama = ${nama}`);

    connection.query(
      `UPDATE mahasiswa SET nilai = ? WHERE nama = ?`,
      [nilai, nama],
      (error, results) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
          return;
        }
        if (results.affectedRows === 0) {
          callback(`Mahasiswa dengan nama ${nama} tidak ditemukan`, null);
          return;
        }
        callback(null, {});
      }
    );
  },

  DeleteMahasiswa(call, callback) {
    const nama = call.request.nama;

    console.log(`Received DELETE request for nama = ${nama}`);

    connection.query(
      `DELETE FROM mahasiswa WHERE nama = ?`,
      [nama],
      (error, results) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
          return;
        }
        if (results.affectedRows === 0) {
          callback(`Mahasiswa dengan nama ${nama} tidak ditemukan`, null);
          return;
        }
        callback(null, {});
      }
    );
  }
  
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
  