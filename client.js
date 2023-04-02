const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

let PROTO_PATH = 'mahasiswa.proto'

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const MahasiswaPackage = grpc.loadPackageDefinition(packageDef).MahasiswaPackage;

const client = new MahasiswaPackage.MahasiswaService('localhost:3000', grpc.credentials.createInsecure());

const id_mahasiswa = 1;
const nama = 'Rendy Anfi Yudha';
const nrp = '5027211006';
const nilai = '94';

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
// client.DeleteMahasiswa(mahasiswaId, (error, response) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log(response.message);
// });

  // console.log(response.message);
