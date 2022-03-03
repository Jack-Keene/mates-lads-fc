import bcrypt from "bcryptjs";

const players = [
  {
    firstName: "Jack",
    lastName: "Keene",
    username: "jkeene",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/shirt-transparent.jpg",
    position: "Defender",
    number: 6,
    team: "Mates/Lads FC",
    isAdmin: true,
  },
  {
    firstName: "Test",
    lastName: "One",
    username: "jkeene1",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/shirt-transparent.jpg",
    position: "Goalkeeper",
    number: 7,
    team: "Mates/Lads FC",
  },
  {
    firstName: "Test",
    lastName: "Two",
    username: "jkeene2",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/shirt-transparent.jpg",
    position: "Midfielder",
    number: 8,
    team: "Mates/Lads FC",
  },
  {
    firstName: "Test",
    lastName: "Three",
    username: "jkeene3",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/shirt-transparent.jpg",
    position: "Attacker",
    number: 9,
    team: "Mates/Lads FC",
  },
];

export default players;
