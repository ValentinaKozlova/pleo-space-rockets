import React, {useState} from "react";
import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";
import { useSpaceXPaginated } from "../utils/use-space-x";
import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavoritesDrawer from "./favorites-drawer";
import {AddToFavoritesButton} from "./add-to-favorites";
import { useDisclosure } from "@chakra-ui/react";
import {getFavorites, addToFavorites, removeFromFavorites} from "./updateFavorites";
import {FavoritesButton} from "./favorites-button";

const PAGE_SIZE = 12;

export default function Launches() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );

  const favoriteLaunches = getFavorites("launches");
  const launchesArr = data && data.flat().filter((launch, i) => favoriteLaunches.hasOwnProperty(`launches_${i}`));

  return (
    <div>
      <Flex
        align="center"
        justify="space-between"
      >
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        />
        <FavoritesButton onOpen={onOpen} />
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch, i) => (
              <LaunchItem key={i} launch={launch} flightNumber={launch.flight_number} onOpen={onOpen} dataIndex={i} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
      <FavoritesDrawer
        title="Launches"
        isOpen={isOpen}
        onClose={onClose}
      >
          {
              launchesArr && launchesArr.map((launch, i) => {
                return <LaunchItem key={i} launch={launch} flightNumber={launch.flight_number} onOpen={onOpen} />
              })
          }
      </FavoritesDrawer>
    </div>
  );
}

export function LaunchItem({ launch, onOpen, dataIndex, flightNumber }) {
    const name = "launches"
    const favoriteLaunches = getFavorites(name);
    const key = `${name}_${dataIndex}`
    let isInFavorites = favoriteLaunches && favoriteLaunches.hasOwnProperty(key);
    const [isActive, setIsActive] = useState(isInFavorites)

    function onAddToFavoritesClick(dataIndex) {
        if (!isInFavorites) {
            addToFavorites(dataIndex, flightNumber, name, onOpen)
            setIsActive(true)
        } else {
            removeFromFavorites(dataIndex, name)
            setIsActive(false)
        }
    }

  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box p="6" position="relative">
          <Box>
            <Box d="flex" alignItems="baseline">
              {launch.launch_success ? (
                <Badge px="2" variant="solid" variantColor="green">
                  Successful
                </Badge>
              ) : (
                <Badge px="2" variant="solid" variantColor="red">
                  Failed
                </Badge>
              )}
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
              </Box>
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {launch.mission_name}
            </Box>
            <Flex>
              <Text fontSize="sm">{formatDate(launch.launch_date_utc)}</Text>
              <Text color="gray.500" ml="2" fontSize="sm">
                {timeAgo(launch.launch_date_utc)}
              </Text>
            </Flex>
          </Box>
          <AddToFavoritesButton isActive={isActive} onAddToFavoritesClick={() => onAddToFavoritesClick(dataIndex)} />
      </Box>
    </Box>
  );
}
