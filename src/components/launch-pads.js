import React, {useState} from "react";
import { Badge, Box, SimpleGrid, Text, Flex } from "@chakra-ui/core";
import { Link } from "react-router-dom";

import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { useSpaceXPaginated } from "../utils/use-space-x";
import FavoritesDrawer from "./favorites-drawer";
import {AddToFavoritesButton} from "./add-to-favorites";
import { useDisclosure } from "@chakra-ui/react";
import {getFavorites, addToFavorites, removeFromFavorites} from "./updateFavorites";
import {FavoritesButton} from "./favorites-button";

const PAGE_SIZE = 12;

export default function LaunchPads() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  );

  const favoritePads = JSON.parse(localStorage.getItem("pads"));
  const padsArr = data && data.flat().filter((pad, i) => favoritePads.hasOwnProperty(`pads_${i}`));

  return (
    <div>
      <Flex
        align="center"
        justify="space-between"
      >
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
        />
        <FavoritesButton onOpen={onOpen} />
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad, i) => (
              <LaunchPadItem onOpen={onOpen} key={launchPad.site_id} siteId={launchPad.site_id} launchPad={launchPad} dataIndex={i} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
        <FavoritesDrawer
            title="Launch Pads"
            isOpen={isOpen}
            onClose={onClose}
        >
            {
              padsArr && padsArr.map(launchPad => {
                return <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />
              })
            }
        </FavoritesDrawer>
    </div>
  );
}

function LaunchPadItem({ launchPad, onOpen, dataIndex, siteId }) {
    const name = "pads"
    const favoritePads = getFavorites(name);
    const key = `pads_${dataIndex}`;
    let isInFavorites = favoritePads && favoritePads.hasOwnProperty(key);

    const [isActive, setIsActive] = useState(isInFavorites)
    function onAddToFavoritesClick(dataIndex) {
        if (!isInFavorites) {
            addToFavorites(dataIndex, siteId, name, onOpen)
            setIsActive(true)
        } else {
            removeFromFavorites(dataIndex, name)
            setIsActive(false)
        }
    }

  return (
    <Box
      as={Link}
      to={`/launch-pads/${launchPad.site_id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launchPad.status === "active" ? (
            <Badge px="2" variant="solid" variantColor="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Retired
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
            {launchPad.attempted_launches} attempted &bull;{" "}
            {launchPad.successful_launches} succeeded
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launchPad.name}
        </Box>
        <Text color="gray.500" fontSize="sm">
          {launchPad.vehicles_launched.join(", ")}
        </Text>
      </Box>
        <AddToFavoritesButton isActive={isActive} onAddToFavoritesClick={() => onAddToFavoritesClick(dataIndex)} />
    </Box>
  );
}
