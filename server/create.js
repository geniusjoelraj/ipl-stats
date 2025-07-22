
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const teams = [
  {
    name: 'Chennai Super Kings',
    username: 'csk',
    password: '1234',
    players: {}
  },
  {
    name: 'Mumbai Indians',
    username: 'mi',
    password: '1234',
    players: {}
  },
  {
    name: 'Royal Challengers Bangalore',
    username: 'rcb',
    password: '1234',
    players: {}
  },
  {
    name: 'Kolkata Knight Riders',
    username: 'kkr',
    password: '1234',
    players: {}
  },
  {
    name: 'Rajasthan Royals',
    username: 'rr',
    password: '1234',
    players: {}
  },
  {
    name: 'Sunrisers Hyderabad',
    username: 'srh',
    password: '1234',
    players: {}
  },
  {
    name: 'Delhi Capitals',
    username: 'dc',
    password: '1234',
    players: {}
  },
  {
    name: 'Lucknow Super Giants',
    username: 'lsg',
    password: '1234',
    players: {}
  },
  {
    name: 'Gujarat Titans',
    username: 'gt',
    password: '1234',
    players: {}
  },
  {
    name: 'Punjab Kings',
    username: 'pbks',
    password: '1234',
    players: {}
  }
];

for (const team of teams) {
  const record = await pb.collection('teams').create(team);
  console.log(record);
}

