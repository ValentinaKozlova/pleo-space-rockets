import React from "react";
import {Button } from "@chakra-ui/core";

export function FavoritesButton({onOpen}) {
    return <Button style={{marginRight: "1.5rem"}} onClick={() => onOpen()}>Favorites</Button>
}