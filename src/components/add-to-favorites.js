import React from "react";
import {StarIcon} from "@chakra-ui/icons";

export function AddToFavoritesButton({onAddToFavoritesClick, id, isActive}) {

    function onButtunClick(e) {
        e.preventDefault()
        if (onAddToFavoritesClick) {
            onAddToFavoritesClick(id)
        }
    }
    return (
        <button style={{outline: "none"}} onClick={e => onButtunClick(e)} >
            <StarIcon style={{fontSize: "24px"}} color={`${isActive? "#ff9800" : "#9e9e9e"}`} _hover={{ color: "#ffc107" }} />
        </button>
    )
}