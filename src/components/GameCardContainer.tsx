import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    <Box borderRadius="5px" overflow="hidden">
      {children}
    </Box>
  );
};

export default GameCardContainer;
