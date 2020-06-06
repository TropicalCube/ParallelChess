imageFolderPath = "images";

beigeFileName = "beige.PNG";
brownFileName = "terracotta.PNG";
brownEligibleFileName = "terracotta_eligible.PNG";
brownWhiteFileName = "terracotta_white.PNG";
brownWhiteSelectedFileName = "terracotta_white_selected.PNG";
brownWhiteEligibleFileName = "terracotta_white_eligible.PNG";
brownWhiteKingFileName = "terracotta_white_king.PNG";
brownWhiteKingSelectedFileName = "terracotta_white_king_selected.PNG";
brownWhiteKingEligibleFileName = "terracotta_white_king_eligible.PNG";
brownBlackFileName = "terracotta_black.PNG";
brownBlackSelectedFileName = "terracotta_black_selected.PNG";
brownBlackEligibleFileName = "terracotta_black_eligible.PNG";
brownBlackKingFileName = "terracotta_black_king.PNG";
brownBlackKingSelectedFileName = "terracotta_black_king_selected.PNG";
brownBlackKingEligibleFileName = "terracotta_black_king_eligible.PNG";

beigeFilePath = imageFolderPath.concat("/", beigeFileName);
brownFilePath = imageFolderPath.concat("/", brownFileName);
brownEligibleFilePath = imageFolderPath.concat("/", brownEligibleFileName);
brownWhiteFilePath = imageFolderPath.concat("/", brownWhiteFileName);
brownWhiteSelectedFilePath = imageFolderPath.concat("/", brownWhiteSelectedFileName);
brownWhiteEligibleFilePath = imageFolderPath.concat("/", brownWhiteEligibleFileName);
brownWhiteKingFilePath = imageFolderPath.concat("/", brownWhiteKingFileName);
brownWhiteKingSelectedFilePath = imageFolderPath.concat("/", brownWhiteKingSelectedFileName);
brownWhiteKingEligibleFilePath = imageFolderPath.concat("/", brownWhiteKingEligibleFileName);
brownBlackFilePath = imageFolderPath.concat("/", brownBlackFileName);
brownBlackSelectedFilePath = imageFolderPath.concat("/", brownBlackSelectedFileName);
brownBlackEligibleFilePath = imageFolderPath.concat("/", brownBlackEligibleFileName);
brownBlackKingFilePath = imageFolderPath.concat("/", brownBlackKingFileName);
brownBlackKingSelectedFilePath = imageFolderPath.concat("/", brownBlackKingSelectedFileName);
brownBlackKingEligibleFilePath = imageFolderPath.concat("/", brownBlackKingEligibleFileName);

beige = "beige";
brown = "brown";
white = "white";
black = "black";
empty = "empty";
yes = "yes";
no = "no";

blackWinsMsg = "Game over! Black wins!";
whiteWinsMsg = "Game over! White wins!";
stalemateMsg = "Game over! Stalemate!";

turn = white;

whiteAI = yes;
blackAI = yes;

function changeTurn() {
    if (turn == white) {
        turn = black;
    } else {
        turn = white;
    }
}

function selectTile(obj) {
    if (isEligible(obj) || isSelected(obj)) {
        if (isOccupied(obj)) {
            if (isSelected(obj)) {
                obj.dataset.selected = no;
                updateTile(obj);
                refreshEligible();
            } else if (!isAnySelected() && obj.dataset.occupant == turn) {
                obj.dataset.selected = yes;
                updateTile(obj);
                refreshEligible();
            }
        } else if (isAnySelected()) {
            if (makeLegalMove(getSelected(), obj)) {
                getSelected().dataset.occupant = empty;
                getSelected().dataset.kingpiece = no;
                updateTile(getSelected());
                getSelected().dataset.selected = no;
                refreshEligible();
                if (!isAnyWhite()) {
                    blackWins();
                } else if (!isAnyBlack()) {
                    whiteWins();
                } else if (!isAnyEligible()) {
                    changeTurn();
                    refreshEligible();
                    if (!isAnyEligible()) {
                        stalemate();
                    } else {
                        if (turn == white) {
                            whiteWins();
                        } else {
                            blackWins();
                        }
                    }
                } else {
                    updateUnclickable();
                    delayedAIMove();
                }
            }
        }
    }
}

function whiteWins() {
    document.getElementById("msg").innerHTML = whiteWinsMsg;
    document.getElementById("replay").style.display = "block";
}

function blackWins() {
    document.getElementById("msg").innerHTML = blackWinsMsg;
    document.getElementById("replay").style.display = "block";
}

function stalemate() {
    document.getElementById("msg").innerHTML = stalemateMsg;
    document.getElementById("replay").style.display = "block";
}

function updateTile(obj) {
    if (isOccupied(obj)) {
        if (obj.dataset.occupant == white) {
            if (isSelected(obj)) {
                if (isKingpiece(obj)) {
                    obj.src = brownWhiteKingSelectedFilePath;
                } else {
                    obj.src = brownWhiteSelectedFilePath;
                }
            } else if (isEligible(obj)) {
                if (isKingpiece(obj)) {
                    obj.src = brownWhiteKingEligibleFilePath;
                } else {
                    obj.src = brownWhiteEligibleFilePath;
                }
            } else {
                if (isKingpiece(obj)) {
                    obj.src = brownWhiteKingFilePath;
                } else {
                    obj.src = brownWhiteFilePath;
                }
            }
        } else {
            if (isSelected(obj)) {
                if (isKingpiece(obj)) {
                    obj.src = brownBlackKingSelectedFilePath;
                } else {
                    obj.src = brownBlackSelectedFilePath;
                }
            } else if (isEligible(obj)) {
                if (isKingpiece(obj)) {
                    obj.src = brownBlackKingEligibleFilePath;
                } else {
                    obj.src = brownBlackEligibleFilePath;
                }
            } else {
                if (isKingpiece(obj)) {
                    obj.src = brownBlackKingFilePath;
                } else {
                    obj.src = brownBlackFilePath;
                }
            }
        }
    } else if (isEligible(obj)) {
        obj.src = brownEligibleFilePath;
    } else {
        obj.src = brownFilePath;
    }
}

function makeUnclickable(objList) {
    for (i = 0; i < objList.length; i++) {
        objList[i].style.pointerEvents = "none";
    }
}

function makeClickable(objList) {
    for (i = 0; i < objList.length; i++) {
        objList[i].style.pointerEvents = "auto";
    }
}

function updateUnclickable() {
    if (whiteAI == yes) {
        makeUnclickable(document.querySelectorAll('[data-occupant='.concat(white, ']')));
    }
    if (blackAI == yes) {
        makeUnclickable(document.querySelectorAll('[data-occupant='.concat(black, ']')));
    }
    makeClickable(document.querySelectorAll('[data-occupant='.concat(empty, ']')));
}

function isIdValid(idString) {
    if (idString.length > 2) {
        return false;
    }
    return /[1-8][a-h]/.test(idString);
}

function getPrimaryAdjacent(tile) {
    id1 = "";
    id2 = "";
    id3 = "";
    id4 = "";
    if (isKingpiece(tile)) {
        id1 = ((parseInt(tile.id.charAt(0)) + 1).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() - 1));
        id2 = ((parseInt(tile.id.charAt(0)) + 1).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() + 1));
        id3 = ((parseInt(tile.id.charAt(0)) - 1).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() - 1));
        id4 = ((parseInt(tile.id.charAt(0)) - 1).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() + 1));
    } else {
        if (tile.dataset.occupant == white) {
            id1 = ((parseInt(tile.id.charAt(0)) + 1).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() - 1));
            id2 = ((parseInt(tile.id.charAt(0)) + 1).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() + 1));
        } else {
            id1 = ((parseInt(tile.id.charAt(0)) - 1).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() - 1));
            id2 = ((parseInt(tile.id.charAt(0)) - 1).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() + 1));
        }
    }
    ids = [];
    if (isIdValid(id1)) {
        ids.push(id1);
    } else {
        ids.push("");
    }
    if (isIdValid(id2)) {
        ids.push(id2);
    } else {
        ids.push("");
    }
    if (isIdValid(id3)) {
        ids.push(id3);
    } else {
        ids.push("");
    }
    if (isIdValid(id4)) {
        ids.push(id4);
    } else {
        ids.push("");
    }
    return ids;
}

function getSecondaryAdjacent(tile) {
    id1 = "";
    id2 = "";
    id3 = "";
    id4 = "";
    if (isKingpiece(tile)) {
        id1 = ((parseInt(tile.id.charAt(0)) + 2).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() - 2));
        id2 = ((parseInt(tile.id.charAt(0)) + 2).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() + 2));
        id3 = ((parseInt(tile.id.charAt(0)) - 2).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() - 2));
        id4 = ((parseInt(tile.id.charAt(0)) - 2).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() + 2));
    } else {
        if (tile.dataset.occupant == white) {
            id1 = ((parseInt(tile.id.charAt(0)) + 2).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() - 2));
            id2 = ((parseInt(tile.id.charAt(0)) + 2).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() + 2));
        } else {
            id1 = ((parseInt(tile.id.charAt(0)) - 2).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() - 2));
            id2 = ((parseInt(tile.id.charAt(0)) - 2).toString()).concat(String.fromCharCode(tile.id.charAt(1).charCodeAt() + 2));
        }
    }
    ids = [];
    if (isIdValid(id1)) {
        ids.push(id1);
    } else {
        ids.push("");
    }
    if (isIdValid(id2)) {
        ids.push(id2);
    } else {
        ids.push("");
    }
    if (isIdValid(id3)) {
        ids.push(id3);
    } else {
        ids.push("");
    }
    if (isIdValid(id4)) {
        ids.push(id4);
    } else {
        ids.push("");
    }
    return ids;
}

function makeLegalMove(tile1, tile2) {
    if (getPrimaryAdjacent(tile1).includes(tile2.id)) {
        tile2.dataset.occupant = tile1.dataset.occupant;
        tile2.dataset.kingpiece = tile1.dataset.kingpiece;
        if (tile2.dataset.kingpiece == no) {
            if (isOccupantAtEdge(tile2)) {
                tile2.dataset.kingpiece = yes;
            }
        }
        updateTile(tile2);
        changeTurn();
        return true;
    }
    secondaryTiles = getSecondaryAdjacent(tile1);
    if (secondaryTiles.includes(tile2.id)) {
        if (tile2.id == secondaryTiles[0]) {
            killTile = document.getElementById(getPrimaryAdjacent(tile1)[0]);
        } else if (tile2.id == secondaryTiles[1]) {
            killTile = document.getElementById(getPrimaryAdjacent(tile1)[1]);
        } else if (tile2.id == secondaryTiles[2]) {
            killTile = document.getElementById(getPrimaryAdjacent(tile1)[2]);
        } else {
            killTile = document.getElementById(getPrimaryAdjacent(tile1)[3]);
        }
        if (areOccupantsInverse(tile1, killTile)) {
            killTile.dataset.occupant = empty;
            killTile.dataset.kingpiece = no;
            updateTile(killTile);
            tile2.dataset.occupant = tile1.dataset.occupant;
            tile2.dataset.kingpiece = tile1.dataset.kingpiece;
            if (tile2.dataset.kingpiece == no) {
                if (isOccupantAtEdge(tile2)) {
                    tile2.dataset.kingpiece = yes;
                    updateTile(tile2);
                    changeTurn();
                    tile1.dataset.jumping = no;
                    return true;
                }
            }
            updateTile(tile2);
            if (getEligibleMoves(tile2)[1].length > 0) {
                tile2.dataset.jumping = yes;
            } else {
                changeTurn();
            }
            tile1.dataset.jumping = no;
            return true;
        } else {
            return false;
        }
    }
}

function delayedAIMove() {
    setTimeout(function () {
        makeAIMove();
    }, 1000);
}

function isAITurn() {
    return (blackAI == yes && turn == black) || (whiteAI == yes && turn == white);
}

function makeAIMove() {
    if (isAITurn()) {
        mvList = getAllEligibleMoves();
        if (mvList.length > 0) {
            selectTile(mvList[Math.floor(Math.random() * mvList.length)]);
            mvList = getAllEligibleMoves();
            selectTile(mvList[Math.floor(Math.random() * mvList.length)]);
        }
    }
}

function isOccupied(tile) {
    return tile.dataset.occupant != empty;
}

function isSelected(tile) {
    return tile.dataset.selected == yes;
}

function isAnySelected() {
    return (document.querySelector('[data-selected='.concat(yes, ']')) != null);
}

function isAnyJumping() {
    return (document.querySelector('[data-jumping='.concat(yes, ']')) != null);
}

function getSelected() {
    return document.querySelector('[data-selected='.concat(yes, ']'));
}

function getJumping() {
    return document.querySelector('[data-jumping='.concat(yes, ']'));
}

function isEligible(tile) {
    return tile.dataset.eligible == yes;
}

function isKingpiece(tile) {
    return tile.dataset.kingpiece == yes;
}

function areOccupantsInverse(tile1, tile2) {
    return (tile1.dataset.occupant == white && tile2.dataset.occupant == black) || (tile1.dataset.occupant == black && tile2.dataset.occupant == white);
}

function isOccupantAtEdge(tile) {
    if (tile.dataset.occupant == white) {
        if (parseInt(tile.id.charAt(0)) > 7) {
            return true;
        } else {
            return false;
        }
    } else {
        if (parseInt(tile.id.charAt(0)) < 2) {
            return true;
        } else {
            return false;
        }
    }
}

function getEligibleMoves(tile) {
    primaryAdjacent = getPrimaryAdjacent(tile);
    secondaryAdjacent = getSecondaryAdjacent(tile);
    eligibleMoves = [];
    eligibleMoves.push([]);
    eligibleMoves.push([]);
    if (secondaryAdjacent[0] && !isOccupied(document.getElementById(secondaryAdjacent[0])) && areOccupantsInverse(document.getElementById(primaryAdjacent[0]), tile)) {
        eligibleMoves[1].push(secondaryAdjacent[0]);
    }
    if (secondaryAdjacent[1] && !isOccupied(document.getElementById(secondaryAdjacent[1])) && areOccupantsInverse(document.getElementById(primaryAdjacent[1]), tile)) {
        eligibleMoves[1].push(secondaryAdjacent[1]);
    }
    if (secondaryAdjacent[2] && !isOccupied(document.getElementById(secondaryAdjacent[2])) && areOccupantsInverse(document.getElementById(primaryAdjacent[2]), tile)) {
        eligibleMoves[1].push(secondaryAdjacent[2]);
    }
    if (secondaryAdjacent[3] && !isOccupied(document.getElementById(secondaryAdjacent[3])) && areOccupantsInverse(document.getElementById(primaryAdjacent[3]), tile)) {
        eligibleMoves[1].push(secondaryAdjacent[3]);
    }
    if (eligibleMoves[1].length == 0) {
        if (primaryAdjacent[0] && !isOccupied(document.getElementById(primaryAdjacent[0]))) {
            eligibleMoves[0].push(primaryAdjacent[0]);
        }
        if (primaryAdjacent[1] && !isOccupied(document.getElementById(primaryAdjacent[1]))) {
            eligibleMoves[0].push(primaryAdjacent[1]);
        }
        if (primaryAdjacent[2] && !isOccupied(document.getElementById(primaryAdjacent[2]))) {
            eligibleMoves[0].push(primaryAdjacent[2]);
        }
        if (primaryAdjacent[3] && !isOccupied(document.getElementById(primaryAdjacent[3]))) {
            eligibleMoves[0].push(primaryAdjacent[3]);
        }
    }
    return eligibleMoves;
}

function getAllEligibleMoves() {
    return document.querySelectorAll('[data-eligible='.concat(yes, ']'));
}

function refreshEligible() {
    removeAllEligible();
    if (isAnySelected()) {
        eligibleList = getEligibleMoves(getSelected());
        if (eligibleList[1].length > 0) {
            for (i = 0; i < eligibleList[1].length; i++) {
                eTile = document.getElementById(eligibleList[1][i]);
                eTile.dataset.eligible = yes;
                updateTile(eTile);
            }
        } else {
            for (i = 0; i < eligibleList[0].length; i++) {
                eTile = document.getElementById(eligibleList[0][i]);
                eTile.dataset.eligible = yes;
                updateTile(eTile);
            }
        }
    } else if (isAnyJumping()) {
        eTile = getJumping();
        eTile.dataset.eligible = yes;
        updateTile(eTile);
    } else {
        updateAllEligible();
    }
}

function updateAllEligible() {
    if (turn == white) {
        allEligible = document.querySelectorAll('[data-occupant='.concat(white, ']'));
    } else {
        allEligible = document.querySelectorAll('[data-occupant='.concat(black, ']'));
    }
    anyJumping = false;
    auxList = [];
    for (i = 0; i < allEligible.length; i++) {
        if (getEligibleMoves(allEligible[i])[1].length > 0) {
            if (!anyJumping) {
                anyJumping = true;
            }
            allEligible[i].dataset.eligible = yes;
            updateTile(allEligible[i]);
        } else if (getEligibleMoves(allEligible[i])[0].length > 0 && !anyJumping) {
            auxList.push(allEligible[i]);
        }
    }
    if (!anyJumping) {
        for (i = 0; i < auxList.length; i++) {
            auxList[i].dataset.eligible = yes;
            updateTile(auxList[i]);
        }
    }
}

function removeAllEligible() {
    allEligible = document.querySelectorAll('[data-eligible='.concat(yes, ']'));
    for (i = 0; i < allEligible.length; i++) {
        allEligible[i].dataset.eligible = no;
        updateTile(allEligible[i]);
    }
}

function isAnyWhite() {
    return document.querySelector('[data-occupant='.concat(white, ']')) != null;
}

function isAnyBlack() {
    return document.querySelector('[data-occupant='.concat(black, ']')) != null;
}

function isAnyEligible() {
    return document.querySelector('[data-eligible='.concat(yes, ']')) != null;
}

function buildBoard() {
    d1 = document.createElement("DIV");
    document.getElementById("board").appendChild(d1);
    att = document.createAttribute("class");
    att.value = "row";
    d1.setAttributeNode(att);
    y = 1;
    for (m = 0; m < 8; m++) {
        c = document.createElement("DIV");
        d1.appendChild(c);
        att = document.createAttribute("class");
        att.value = "column";
        c.setAttributeNode(att);
        if (m % 2 == 0) {
            x = 0;
        } else {
            x = 1;
        }
        for (n = 0; n < 8; n++) {
            i = document.createElement("IMG");
            c.appendChild(i);
            if (x % 2 == 0) {
                imgSrc = beigeFilePath;
                tileColour = beige;
                occupant = empty;
            } else if (y < 25) {
                imgSrc = brownWhiteFilePath;
                tileColour = brown;
                occupant = white;
            } else if (y > 40) {
                imgSrc = brownBlackFilePath;
                tileColour = brown;
                occupant = black;
            } else {
                imgSrc = brownFilePath;
                tileColour = brown;
                occupant = empty;
            }
            att = document.createAttribute("src");
            att.value = imgSrc;
            i.setAttributeNode(att);
            att = document.createAttribute("data-tile-colour");
            att.value = tileColour;
            i.setAttributeNode(att);
            att = document.createAttribute("data-occupant");
            att.value = occupant;
            i.setAttributeNode(att);
            att = document.createAttribute("data-eligible");
            att.value = no;
            i.setAttributeNode(att);
            att = document.createAttribute("class");
            att.value = "tile";
            i.setAttributeNode(att);
            att = document.createAttribute("id");
            att.value = ((m + 1).toString()).concat(String.fromCharCode(97 + n));
            i.setAttributeNode(att);
            att = document.createAttribute("data-selected");
            att.value = no;
            i.setAttributeNode(att);
            att = document.createAttribute("data-jumping");
            att.value = no;
            i.setAttributeNode(att);
            att = document.createAttribute("data-kingpiece");
            att.value = no;
            i.setAttributeNode(att);
            att = document.createAttribute("onclick");
            att.value = "selectTile(this)";
            i.setAttributeNode(att);
            x++;
            y++;
        }
    }
    updateAllEligible();
}

function resetGame() {
    document.getElementById("board").innerHTML = "";
    document.getElementById("msg").innerHTML = "";
    document.getElementById("replay").style.display = "none";
    turn = white;
    buildBoard();
}

function startNewAIvsAI() {
    resetGame();
    whiteAI = yes;
    blackAI = yes;
    updateUnclickable();
    delayedAIMove();
}

function startNewPlayervsAI() {
    resetGame();
    whiteAI = no;
    blackAI = yes;
    updateUnclickable();
}

function startNewPlayervsPlayerLocal() {
    resetGame();
    whiteAI = no;
    blackAI = no;
}

function replayGame() {
    if (whiteAI == yes) {
        if (blackAI == yes) {
            startNewAIvsAI();
        } else {
            startNewPlayervsAI();
        }
    } else if (blackAI == yes) {
        startNewPlayervsAI();
    } else {
        startNewPlayervsPlayerLocal();
    }
}