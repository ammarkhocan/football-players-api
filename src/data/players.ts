type Players = {
  id: number;
  name: string;
  club: string;
  position: string;
  nationality: string;
  number: number;
};

export const players: Players[] = [
  {
    id: 1,
    name: "Luka Modrić",
    club: "Real Madrid",
    position: "Midfielder",
    nationality: "Croatia",
    number: 10,
  },
  {
    id: 2,
    name: "Kylian Mbappé",
    club: "Real Madrid",
    position: "Forward",
    nationality: "France",
    number: 9,
  },
  {
    id: 3,
    name: "Cristiano Ronaldo",
    club: "Al Nassr",
    position: "Forward",
    nationality: "Portugal",
    number: 7,
  },
  {
    id: 4,
    name: "Vinícius Júnior",
    club: "Real Madrid",
    position: "Forward",
    nationality: "Brazil",
    number: 7,
  },
  {
    id: 5,
    name: "Erling Haaland",
    club: "Manchester City",
    position: "Forward",
    nationality: "Norway",
    number: 9,
  },
];
