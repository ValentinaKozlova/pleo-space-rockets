import React from "react";
import {StarIcon} from "@chakra-ui/icons";
import {Tooltip} from "@chakra-ui/core";
import styled from "@emotion/styled";

const Button = styled.button`
  outline: none;
  position: ${props =>
    props.size==="l" ? 'relative' : 'absolute'};
  top: ${props =>
    props.size==="l" ? '0' : '18px'};
  right: 18px;
`

const StarButton = styled(StarIcon)`
    font-size: ${props =>
        props.size==="l" ? '48px' : '24px'};
`

export function AddToFavoritesButton({onAddToFavoritesClick, isActive, size, color}) {
    const label = `${isActive? "Remove from" : "Add to"} favorites`;
    const starColor = color || "#9e9e9e";

    function onButtonClick(e) {
        e.preventDefault()
        if (onAddToFavoritesClick) {
            onAddToFavoritesClick()
        }
    }
    return (
        <Tooltip hasArrow label={label} bg="#1A202C">
            <Button size={size} onClick={e => onButtonClick(e)} >
                <StarButton size={size} color={`${isActive? "#ff9800" : starColor}`} _hover={{ color: "#ffc107" }} />
            </Button>
        </Tooltip>
    )
}