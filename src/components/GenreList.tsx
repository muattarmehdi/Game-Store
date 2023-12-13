import { HStack, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url-tweak-optimization";

const GenreList = () => {
  const { data, loading, error } = useGenres();

  if (error) return null;

  if (loading) return <Spinner />;

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius="5px"
              src={getCroppedImageUrl(genre.image_background)}
            />{" "}
            <Text fontSize="md">{genre.name}</Text>{" "}
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
