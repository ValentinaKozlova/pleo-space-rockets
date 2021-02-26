import React from "react";
import {Box, Stack, Heading} from "@chakra-ui/core";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/core";

export default function FavoritesDrawer ({ isOpen, onClose, title, children }) {
    return <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Favorites
            </DrawerHeader>
            <DrawerBody style={{overflowY: "scroll"}}>
              <Stack spacing="24px">
                <Box>
                    <Heading fontSize="xl">{title}</Heading>
                    { children }
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
    </Drawer>
}