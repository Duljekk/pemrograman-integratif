const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

let PROTO_PATH = 'mahasiswa.proto'

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef)

const MahasiswaPackage = grpcObject.MahasiswaPackage

const client = new MahasiswaPackage.MahasiswaService('localhost:3000', grpc.credentials.createInsecure());

const id_mahasiswa = '';
const nama = 'Adimasdefatra Bimasena';
const nrp = '5027211040';
const nilai = '99';

client.addMahasiswa({ id_mahasiswa, nama, nrp, nilai }, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(response.message);
});