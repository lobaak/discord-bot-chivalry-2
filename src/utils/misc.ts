export function parsePlayersText(input: string) {
  const players = input
    .split("\n")
    .filter(
      (line) => !line?.startsWith("ServerName") && !line?.startsWith("Name")
    )
    .map((line) => {
      const parts = line.trim().split(" - ").splice(0, 3);

      if (parts.length < 3) {
        return null;
      }

      return {
        alias: `${parts[0]}`,
        fabid: `${parts[1]}`,
        eosid: `${parts[2]}`,
      };
    })
    .filter((player) => player !== null);

  console.log(players);

  return players;
}
