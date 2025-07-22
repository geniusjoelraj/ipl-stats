import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


// example update data
const data = {
  "players": {
    'Dhoni': { price: 15000000, type: 'all_rounder' },
    'Bumrah': { price: 12000000, type: 'bowler' },
    'Ruturaj Gaikwad': { price: 8000000, type: 'batsman' },
    'Jadeja': { price: 13000000, type: 'all_rounder' },
    'Moeen Ali': { price: 10000000, type: 'all_rounder' }
  }
};

const record = await pb.collection('teams').update('4xibxzf813xdekz', data);
console.log(record)
