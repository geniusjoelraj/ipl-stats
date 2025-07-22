import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


const record = await pb.collection('teams').getOne('4xibxzf813xdekz', {
  expand: 'relField1,relField2.subRelField',
});
console.log(record.name)
console.log(record.players)
