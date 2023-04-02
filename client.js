const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

let PROTO_PATH = 'mahasiswa.proto'

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const MahasiswaPackage = grpc.loadPackageDefinition(packageDef).MahasiswaPackage;

const client = new MahasiswaPackage.MahasiswaService('localhost:3000', grpc.credentials.createInsecure());

const id_mahasiswa = '';
const nama = 'Abdul Zaki Syahrul Rahmat';
const nrp = '5027211020';
const nilai = '86';

// client.AddMahasiswa({ id_mahasiswa, nama, nrp, nilai }, (err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });

client.GetMahasiswa({ id_mahasiswa }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(response);
  });

  
// const mahasiswaId = { id_mahasiswa: 1 };

// client.DeleteMahasiswa({ id_mahasiswa }, (error, response) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log(response.message);
// });

  // console.log(response.message);