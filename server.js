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
  },

  GetMahasiswa(call, callback) {
    const id_mahasiswa = call.request.id_mahasiswa;
    connection.query(
      `SELECT * FROM mahasiswa WHERE id_mahasiswa = 2`,
      [id_mahasiswa],
      (error, results) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
          return;
        }
        if (results.length === 0) {
          callback(`Mahasiswa dengan id ${id_mahasiswa} tidak ditemukan`, null);
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

  DeleteMahasiswa(call, callback) {
    const id_mahasiswa = call.request.id_mahasiswa;
    connection.query(
      `DELETE FROM mahasiswa WHERE id_mahasiswa = 1`,
      [id_mahasiswa],
      (error, results) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
          return;
        }
        if (results.affectedRows === 0) {
          callback(`Mahasiswa dengan id ${id_mahasiswa} tidak ditemukan`, null);
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

// function AddMahasiswa(call, callback) {
    
//     const id_mahasiswa = call.request.id_mahasiswa;
//     const nama = call.request.nama;
//     const nrp = call.request.nrp;
//     const nilai = call.request.nilai;
  
//     connection.query(
//       `INSERT INTO mahasiswa (id_mahasiswa, nama, nrp, nilai) VALUES (?, ?, ?, ?)`,
//       [id_mahasiswa, nama, nrp, nilai],
//       (error) => {
//         if (error) {
//           console.error('Error:', error);
//           callback(error, null);
//           return;
//         }
  
//         callback(null, { message: 'Mahasiswa berhasil ditambahkan' });
//       }
//     );
//   }

  // function GetMahasiswa(call, callback) {
  //   const mahasiswaId = call.request.id_mahasiswa;
  //   connection.query(
  //     `SELECT * FROM mahasiswa WHERE id_mahasiswa = ?`,
  //     [mahasiswaId],
  //     (error, results) => {
  //       if (error) {
  //         console.error('Error:', error);
  //         callback(error, null);
  //         return;
  //       }
  //       if (results.length === 0) {
  //         callback(`Mahasiswa dengan id ${mahasiswaId} tidak ditemukan`, null);
  //         return;
  //       }
  //       const mahasiswaItem = results[0];
  //       callback(null, {
  //         id_mahasiswa: mahasiswaItem.id_mahasiswa,
  //         nama: mahasiswaItem.nama,
  //         nrp: mahasiswaItem.nrp,
  //         nilai: mahasiswaItem.nilai
  //       });
  //     }
  //   );
  // }

  // function deleteMahasiswa(call, callback) {
  //   const mahasiswaId = call.request.id;
  
  //   connection.query(
  //     `DELETE FROM mahasiswa WHERE id_mahasiswa = ?`,
  //     [mahasiswaId],
  //     (error, results) => {
  //       if (error) {
  //         console.error('Error:', error);
  //         callback(error, null);
  //         return;
  //       }
  //       if (results.affectedRows === 0) {
  //         callback(`Mahasiswa dengan id ${mahasiswaId} tidak ditemukan`, null);
  //         return;
  //       }
  //       callback(null, {});
  //     }
  //   );
  // }
  