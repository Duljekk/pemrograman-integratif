const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const readline = require('readline');

let PROTO_PATH = 'mahasiswa.proto'

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const MahasiswaPackage = grpc.loadPackageDefinition(packageDef).MahasiswaPackage;

const client = new MahasiswaPackage.MahasiswaService('localhost:3000', grpc.credentials.createInsecure());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Choose a function to call (ADD/GET/GETALL/UPDATE/DELETE): ', function(functionName) {
  if (functionName === 'ADD') {
    rl.question('Enter the Mahasiswa details in this format: nama,nrp,nilai\n', function(mahasiswaInput) {
      const [ nama, nrp, nilai ] = mahasiswaInput.split(',');
      client.AddMahasiswa({ nama, nrp, nilai }, (err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(response);
      });
      rl.close();
    });
  } else if (functionName === 'GET') {
    rl.question('Enter the nama of the Mahasiswa: ', function(nama) {
      client.GetMahasiswa({ nama }, (err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(response);
      });
      rl.close();
    });
  } else if (functionName === 'UPDATE') {
    rl.question('Enter the Mahasiswa details in this format: nama,nilai\n', function(mahasiswaInput) {
      const [ nama, nilai ] = mahasiswaInput.split(',');
      client.UpdateMahasiswa({ nama, nilai }, (err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(response);
      });
      rl.close();
    });
  } else if (functionName === 'GETALL') { 
      client.getAllMahasiswa({}, (err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(response);
      });
      rl.close(); 
  } else if (functionName === 'DELETE') {
    rl.question('Enter the nama of the Mahasiswa: ', function(nama) {
      client.DeleteMahasiswa({ nama }, (err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(response);
      });
      rl.close();
    });
    } else {
    console.error('Invalid function name. Please choose ADD, GET, GETALL, UPDATE, or DELETE.');
    rl.close();
  }
});
