import React from "react";
import { Badge, Box, SimpleGrid, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";

import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { useSpaceXPaginated } from "../utils/use-space-x";
import FavoritesDrawer from "./favorites-drawer";
import {AddToFavoritesButton} from "./add-to-favorites";
import { useDisclosure } from "@chakra-ui/react";
import {getFavorites, updateFavorites} from "./updateFavorites";

const PAGE_SIZE = 12;

export default function LaunchPads() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  );

    function renderFavoriteLaunches() {
        const favoritePads = JSON.parse(localStorage.getItem("pads"));
        for (let item in favoritePads) {
            let padId = favoritePads[item]
            let launchPad = data && data.flat()[padId] && data.flat()[padId]

            if (launchPad) {
                return <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />
            }
        }
    }

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad, i) => (
              <LaunchPadItem onOpen={onOpen} key={launchPad.site_id} launchPad={launchPad} dataIndex={i} />
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
                renderFavoriteLaunches()
            }
        </FavoritesDrawer>
    </div>
  );
}

function LaunchPadItem({ launchPad, onOpen, dataIndex }) {
    function onAddToFavoritesClick(dataIndex) {
        updateFavorites(dataIndex, "pads")
        onOpen();
    }
    const favoriteLaunches = getFavorites("pads");
    const key = `pads_${dataIndex}`
    const isActive = favoriteLaunches && favoriteLaunches.hasOwnProperty(key)
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
