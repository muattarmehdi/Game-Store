import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url-tweak-optimization";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, loading, error } = useGenres();

  if (error) return null;

  if (loading) return <Spinner />;

  return (
    <>
      <Heading textAlign="left" fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius="5px"
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />{" "}
              <Button
                fontSize="md"
                variant="ghost"
                whiteSpace="normal"
                textAlign="left"
                onClick={() => onSelectGenre(genre)}
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                fontFamily={
                  genre.id === selectedGenre?.id ? "mono" : "sans-serif"
                }
              >
                {genre.name}
              </Button>{" "}
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
