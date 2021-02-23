import React from "react";
import {StarIcon} from "@chakra-ui/icons";
import {Tooltip} from "@chakra-ui/core";

export function AddToFavoritesButton({onAddToFavoritesClick, id, isActive}) {

    function onButtunClick(e) {
        e.preventDefault()
        if (onAddToFavoritesClick) {
            onAddToFavoritesClick(id)
        }
    }
    return (
        <Tooltip hasArrow label="Add to favorites" bg="#1A202C">
            <button style={{outline: "none", position: "absolute", top: "18px", right: "18px"}} onClick={e => onButtunClick(e)} >
                <StarIcon style={{fontSize: "24px"}} color={`${isActive? "#ff9800" : "#9e9e9e"}`} _hover={{ color: "#ffc107" }} />
            </button>
        </Tooltip>
    )
}