import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import CardSkeleton from "./CardSkeleton";
import GameCardContainer from "./GameCardContainer";

const GameGrid = () => {
  const { data, error, loading } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {error && <Text color="red">{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
        spacing={6}
        padding="10px"
      >
        {loading &&
          skeletons.map((skeleton) => (
            <GameCardContainer>
              <CardSkeleton key={skeleton} />{" "}
            </GameCardContainer>
          ))}
        {data.map((game) => (
          <GameCardContainer>
            <GameCard key={game.id} game={game}>
              {/* {game.name} */}
            </GameCard>
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
