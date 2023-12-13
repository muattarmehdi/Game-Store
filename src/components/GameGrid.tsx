import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import CardSkeleton from "./CardSkeleton";

const GameGrid = () => {
  const { games, error, loading } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {error && <Text color="red">{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={10}
        padding="10px"
      >
        {loading &&
          skeletons.map((skeleton) => <CardSkeleton key={skeleton} />)}
        {games.map((game) => (
          <GameCard key={game.id} game={game}>
            {/* {game.name} */}
          </GameCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
