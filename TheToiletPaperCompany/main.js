// CANVAS SETUP

const worldLayer = document.getElementById("canvas-world-layer");
const shadowLayer = document.getElementById("canvas-shadow-layer");
const treeLayer = document.getElementById("canvas-tree-layer");
const ctx_worldLayer = worldLayer.getContext("2d");
const ctx_shadowLayer = shadowLayer.getContext("2d");
const ctx_treeLayer = treeLayer.getContext("2d");
const tilesize = 64;

// CANVAS SETUP
// SETUP VARIABLES

let DATETIME = {
    date: new Date(2019, 11, 1, 0, 0, 0, 0),
    time: 120,
    maxSecondsPerDay: 120
}

let IDEAL_PRICE_PER_ROLL = 0.84;
let PRICE_PER_ROLL = 1;

let SETTINGS = {
    daySpeed: 1,
    maxDaySpeed: 8
}

let MARKETING_DATA = {
    productInteresed: 0,
    multiplier: 0,
    amount: 1
}

let EQUIPMENT_DATA = {
    multiplier: 1
}

let PLAYER_DATA = {
    globalTPRolls: 1000000,
    tpRolls: 0,
    money: 1000000,
    rollsFromTree: 1600
}

let FARM_DATA = {
    lvl: 0,
    treeData: []
}

let GAME_PAUSED = false;

let GAME_EVENTS = [
    {
        startDate: new Date(2019, 11, 18, 0, 0, 0, 0),
        endDate: new Date(2020, 11, 25, 0, 0, 0, 0),
        startEvent: () => {
            MARKETING_DATA.multiplier += .35;
        },
        activeEvent: () => {
        },
        endEvent: () => {
            MARKETING_DATA.multiplier -= .35;
        },
        img: "assets/ToiletPaperRoll.png",
        title: "Top Christmas Presents",
        description: "Toilet Paper is on the top of our christmas presents list. You need it probably every day, so why don't you gift it to your loved ones?"
    },
    {
        startDate: new Date(2020, 2, 1, 0, 0, 0, 0),
        endDate: new Date(2020, 2, 31, 0, 0, 0, 0),
        startEvent: () => {
            MARKETING_DATA.multiplier += .35;
        },
        activeEvent: () => {
        },
        endEvent: () => {
            MARKETING_DATA.multiplier -= .35;
        },
        img: "assets/ToiletPaperRoll.png",
        title: "Pandemic - People horde Toilet Paper",
        description: "The C-Virus hit the world. Everyone tries to hoard as much toilet paper as they can get. The needs for toilet paper are higher than usual."
    },
    {
        startDate: new Date(2020, 9, 26, 0, 0, 0, 0),
        endDate: new Date(2020, 10, 1, 0, 0, 0, 0),
        startEvent: () => {
            MARKETING_DATA.multiplier += .1;
        },
        activeEvent: () => {
        },
        endEvent: () => {
            MARKETING_DATA.multiplier -= .1;
        },
        img: "assets/ToiletPaperRoll.png",
        title: "Halloween - TP-ing Pranks",
        description: "Halloween is near and people try to hoard toilet paper for the TP-ing pranks."
    }
]

let SHOP_PRODUCTS = [
    {
        id: 0,
        isVisible: 0,
        maxQuantity: undefined,
        quantity: 0,
        name: "Tree",
        description: "A tree to produce toilet paper rolls from.",
        price: 500.00,
        icon: ""
    },
    {
        id: 1,
        isVisible: 0,
        maxQuantity: undefined,
        quantity: 0,
        name: "Auto Factory",
        description: "Produces 1 toilet paper roll per second. Will get better after you upgrade the factory in the later game.",
        price: 50.00,
        icon: ""
    },
    {
        id: 2,
        isVisible: 10000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Factory",
        description: "You will produce 2 rolls per second after upgrading your factories.",
        price: 2000.00,
        icon: ""
    },
    {
        id: 3,
        isVisible: 500,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Tree Storage 1",
        description: "Store more trees.",
        price: 200.00,
        icon: ""
    },
    {
        id: 4,
        isVisible: 1000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Tree Storage 2",
        description: "Store more trees.",
        price: 300.00,
        icon: ""
    },
    {
        id: 5,
        isVisible: 3000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Tree Storage 3",
        description: "Store more trees.",
        price: 500.00,
        icon: ""
    },
    {
        id: 6,
        isVisible: 5000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Tree Storage 4",
        description: "Store more trees.",
        price: 1000.00,
        icon: ""
    },
    {
        id: 7,
        isVisible: 1000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Toilet Paper Storage 1",
        description: "Store more trees.",
        price: 200.00,
        icon: ""
    },
    {
        id: 8,
        isVisible: 2500,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Toilet Paper Storage 2",
        description: "Store more trees.",
        price: 250.00,
        icon: ""
    },
    {
        id: 9,
        isVisible: 10000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Toilet Paper Storage 3",
        description: "Store more trees.",
        price: 400.00,
        icon: ""
    },
    {
        id: 10,
        isVisible: 50000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Toilet Paper Storage 4",
        description: "Store more trees.",
        price: 750.00,
        icon: ""
    },
    {
        id: 11,
        isVisible: 5000,
        maxQuantity: 1,
        quantity: 0,
        name: "Renewable Resources",
        description: "Get more rolls out of a tree.",
        price: 2500.00,
        icon: ""
    },
    {
        id: 12,
        isVisible: 500,
        maxQuantity: 1,
        quantity: 0,
        name: "Colorfull Rolls",
        description: "Create colorfull toilet paper rolls to spice things up.",
        price: 500.00,
        icon: ""
    },
    {
        id: 13,
        isVisible: 1500,
        maxQuantity: 1,
        quantity: 0,
        name: "Multi Sheet ply",
        description: "Increase sheet ply to make the toilet paper comfy. The needed resources will not be increased. You found out how to get more toilet paper from a tree.",
        price: 1000.00,
        icon: ""
    },
    {
        id: 14,
        isVisible: 10000,
        maxQuantity: 1,
        quantity: 0,
        name: "Toilet Paper Multi Pack 8",
        description: "Sell 8 toilet paper rolls in a pack to get more sales.",
        price: 2500.00,
        icon: ""
    },
    {
        id: 15,
        isVisible: 20000,
        maxQuantity: 1,
        quantity: 0,
        name: "Toilet Paper Multi Pack 12",
        description: "Sell 12 toilet paper rolls in a pack to get more sales.",
        price: 5000.00,
        icon: ""
    },
    {
        id: 16,
        isVisible: 10000,
        maxQuantity: 1,
        quantity: 0,
        name: "Tree Farm",
        description: "Grow your own Trees and save some money. You can plant 5 trees. You can level the farm up to be able to plant more trees..",
        price: 4000.00,
        icon: ""
    },
    {
        id: 17,
        isVisible: 15000,
        maxQuantity: 1,
        quantity: 0,
        name: "Tree Farm Upgrade 1",
        description: "You are able to plant 10 trees.",
        price: 6000.00,
        icon: ""
    },
    {
        id: 18,
        isVisible: 30000,
        maxQuantity: 1,
        quantity: 0,
        name: "Tree Farm Upgrade 2",
        description: "You are able to plant 25 trees.",
        price: 9000.00,
        icon: ""
    },
    {
        id: 19,
        isVisible: 50000,
        maxQuantity: 1,
        quantity: 0,
        name: "Tree Farm Upgrade 3",
        description: "You are able to plant 50 trees.",
        price: 14000.00,
        icon: ""
    }
]

// SETUP VARIABLES
// GET DOM ELEMENTS

const buttonGameSpeedMinus = document.getElementById("game--speed--minus");
const buttonGameSpeedPlus = document.getElementById("game--speed--plus");
const buttonShowInventory = document.getElementById("btn--inventory");
const buttonShowFarm = document.getElementById("btn--farm");
const buttonShowShop = document.getElementById("btn--shop");
const buttonHideFarm = document.getElementById("btn--farm-close");
const buttonHideShop = document.getElementById("btn--shop-close");
const buttonFarmLvlUp = document.getElementById("btn--farm--lvl-up");
const buttonFarmBuyTree = document.getElementById("btn--farm--buy-tree");

const displayViewTitleShop = document.getElementById("view-title--shop");
const displayViewTitleFarm = document.getElementById("view-title--farm");
const displayPopup = document.getElementById("display--popup");
const displayPopupContainer = document.getElementById("display--popup--container");
const displayTPRollContainer = document.getElementById("display--tp-roll--container");
const displayPricePerRoll = document.getElementById("display--price--per-roll");
const displayMoney = document.getElementById("status--money");
const displayTotalRolls = document.getElementById("status--rolls-total");
const displayProductInterest = document.getElementById("status--product-interest");
const displayGameSpeed = document.getElementById("game--speed");
const displayGameDate = document.getElementById("game--date");
const displayGameTime = document.getElementById("game--time");
const displayShopProducts = document.getElementById("display--shop--products");
const displayStorageTrees = document.getElementById("display--storage--trees");
const displayPossibleRolls = document.getElementById("display--possible-rolls");
const displayStorageTP = document.getElementById("display--storage--tp");
const displayFactoriesQuantity = document.getElementById("display--factories--quantity");
const displayFactoriesEfficiency = document.getElementById("display--factories--efficiency");
const displayFarmControls = document.getElementById("farm-controls");
const displayFarmContainer = document.getElementById("farm-container");

const spritesheetGround = document.getElementById("spritesheet-ground");
const spritesheetTrees = document.getElementById("spritesheet-trees");
const spritesheetShadow = document.getElementById("spritesheet-shadow");

const vcClicker = document.getElementById("vc--clicker");
const vcFarm = document.getElementById("vc--farm");
const vcShop = document.getElementById("vc--shop");

const masterBody = document.getElementById("body");

// GET DOM ELEMENTS
// SETUP FUNCTIONS

const saveData = () => {
    localStorage.setItem("DATETIME", JSON.stringify(DATETIME));
    localStorage.setItem("IDEAL_PRICE_PER_ROLL", IDEAL_PRICE_PER_ROLL);
    localStorage.setItem("PRICE_PER_ROLL", PRICE_PER_ROLL);
    localStorage.setItem("SETTINGS", JSON.stringify(SETTINGS));
    localStorage.setItem("MARKETING_DATA", JSON.stringify(MARKETING_DATA));
    localStorage.setItem("EQUIPMENT_DATA", JSON.stringify(EQUIPMENT_DATA));
    localStorage.setItem("PLAYER_DATA", JSON.stringify(PLAYER_DATA));
    localStorage.setItem("SHOP_PRODUCTS", JSON.stringify(SHOP_PRODUCTS));
    localStorage.setItem("FARM_DATA", JSON.stringify(FARM_DATA));
    localStorage.setItem("GAME_PAUSED", GAME_PAUSED);
}

const loadData = () => {
    let loadedSuccessfully = true;

    const loaded_DATETIME = JSON.parse(localStorage.getItem("DATETIME"));
    const loaded_IDEAL_PRICE_PER_ROLL = JSON.parse(localStorage.getItem("IDEAL_PRICE_PER_ROLL"));
    const loaded_PRICE_PER_ROLL = JSON.parse(localStorage.getItem("PRICE_PER_ROLL"));
    const loaded_SETTINGS = JSON.parse(localStorage.getItem("SETTINGS"));
    const loaded_MARKETING_DATA = JSON.parse(localStorage.getItem("MARKETING_DATA"));
    const loaded_EQUIPMENT_DATA = JSON.parse(localStorage.getItem("EQUIPMENT_DATA"));
    const loaded_PLAYER_DATA = JSON.parse(localStorage.getItem("PLAYER_DATA"));
    const loaded_SHOP_PRODUCTS = JSON.parse(localStorage.getItem("SHOP_PRODUCTS"));
    const loaded_FARM_DATA = JSON.parse(localStorage.getItem("FARM_DATA"));
    const loaded_GAME_PAUSED = JSON.parse(localStorage.getItem("GAME_PAUSED"));

    if (loaded_DATETIME != null && loaded_IDEAL_PRICE_PER_ROLL != null && loaded_PRICE_PER_ROLL != null && loaded_SETTINGS != null && loaded_MARKETING_DATA != null && loaded_EQUIPMENT_DATA != null && loaded_PLAYER_DATA != null && loaded_SHOP_PRODUCTS != null&& loaded_GAME_PAUSED != null) {
        DATETIME.date = new Date(loaded_DATETIME.date);
        DATETIME.time = loaded_DATETIME.time;
        DATETIME.maxSecondsPerDay = loaded_DATETIME.maxSecondsPerDay;
        IDEAL_PRICE_PER_ROLL = loaded_IDEAL_PRICE_PER_ROLL;
        PRICE_PER_ROLL = loaded_PRICE_PER_ROLL;
        SETTINGS = loaded_SETTINGS;
        MARKETING_DATA = loaded_MARKETING_DATA;
        EQUIPMENT_DATA = loaded_EQUIPMENT_DATA;
        PLAYER_DATA = loaded_PLAYER_DATA;
        SHOP_PRODUCTS = loaded_SHOP_PRODUCTS;
        FARM_DATA = loaded_FARM_DATA;
        GAME_PAUSED = loaded_GAME_PAUSED;
    } else {
        loadedSuccessfully = false;
    }

    return loadedSuccessfully;
}

const resetData = () => {
    localStorage.removeItem("DATETIME");
    localStorage.removeItem("IDEAL_PRICE_PER_ROLL");
    localStorage.removeItem("PRICE_PER_ROLL");
    localStorage.removeItem("SETTINGS");
    localStorage.removeItem("MARKETING_DATA");
    localStorage.removeItem("EQUIPMENT_DATA");
    localStorage.removeItem("PLAYER_DATA");
    localStorage.removeItem("SHOP_PRODUCTS");
    localStorage.removeItem("FARM_DATA");
    localStorage.removeItem("GAME_PAUSED");
    location.reload();
}

const readableDateString = date => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

const updateGameTime = () => {
    DATETIME.time -= 1;

    if (DATETIME.time <= 0) {
        newDay()
    }

    displayGameTime.innerText = `${DATETIME.time}s`;
}

const lowerPricePerRoll = () => {
    PRICE_PER_ROLL -= 0.01;
    PRICE_PER_ROLL = Math.round((PRICE_PER_ROLL + Number.EPSILON) * 100) / 100;
    displayPricePerRoll.innerText = `${PRICE_PER_ROLL}$`
    checkProductInterest();
}
const raisePricePerRoll = () => {
    PRICE_PER_ROLL += 0.01;
    PRICE_PER_ROLL = Math.round((PRICE_PER_ROLL + Number.EPSILON) * 100) / 100;
    displayPricePerRoll.innerText = `${PRICE_PER_ROLL}$`
    checkProductInterest();
}

const animateCreateTPRoll = quantity => {
    const randPositionTop = [30,35,40,45,50,55,60,65,70];
    const randPositionLeft = [37,40,43,52,55,58];

    let addText = document.createElement("P");
    if (quantity === 1) {
        addText.innerText = `+${quantity} Roll`;
    } else {
        addText.innerText = `+${quantity} Rolls`;
    }
    addText.style.top = `${randPositionTop[Math.floor(Math.random() * randPositionTop.length)]}%`;
    addText.style.left = `${randPositionLeft[Math.floor(Math.random() * randPositionLeft.length)]}%`;
    displayTPRollContainer.appendChild(addText);

    setTimeout(()=> {
        displayTPRollContainer.removeChild(addText);
    }, 1500)
}

const createTPRoll = quantity => {
    let newQuantity;

    if (PLAYER_DATA.tpRolls + quantity <= calcTPStorageTotal()) {
        newQuantity = quantity
    } else {
        newQuantity = calcTPStorageTotal() - PLAYER_DATA.tpRolls;
    }

    if (PLAYER_DATA.rollsFromTree >= newQuantity && PLAYER_DATA.rollsFromTree > 0) {
        animateCreateTPRoll(newQuantity)
        PLAYER_DATA.tpRolls += newQuantity;
        PLAYER_DATA.globalTPRolls += newQuantity;
        PLAYER_DATA.rollsFromTree -= newQuantity;
    } else if (PLAYER_DATA.rollsFromTree < newQuantity && PLAYER_DATA.rollsFromTree > 0) {
        animateCreateTPRoll(PLAYER_DATA.rollsFromTree)
        PLAYER_DATA.tpRolls += PLAYER_DATA.rollsFromTree;
        PLAYER_DATA.globalTPRolls += PLAYER_DATA.rollsFromTree;
        PLAYER_DATA.rollsFromTree -= PLAYER_DATA.rollsFromTree;
    }
}

const removeTPRoll = quantity => {
    PLAYER_DATA.tpRolls -= quantity;
}

const sellTPRoll = quantity => {
    removeTPRoll(quantity);
    addMoney((quantity * PRICE_PER_ROLL));
}

const removeMoney = amount => {
    PLAYER_DATA.money -= amount
    PLAYER_DATA.money = Math.round((PLAYER_DATA.money + Number.EPSILON) * 100) / 100;
}

const addMoney = amount => {
    PLAYER_DATA.money += amount
    PLAYER_DATA.money = Math.round((PLAYER_DATA.money + Number.EPSILON) * 100) / 100;
}

const buyProduct = productID => {
    if (SHOP_PRODUCTS[productID].price <= PLAYER_DATA.money) {
        if (checkProduct(productID)) {
            SHOP_PRODUCTS[productID].quantity += 1;
            removeMoney(SHOP_PRODUCTS[productID].price)
            updateShopDisplay();
        }
    }

}

const returnNewTreePrice = () => {
    const newDelta = Math.random() * 150;
    return Math.round(400 + newDelta);
}

const harvestTrees = quantity => {
    let treeStorageAvailable = calcTreeStorageTotal() - Math.ceil((PLAYER_DATA.rollsFromTree) / calcMaxRollsFromTree());
    let qt = quantity;

    if (treeStorageAvailable < quantity) {
        qt = treeStorageAvailable;
    }

    for (let i = 0; i < qt; i++) {
        if (isHarvestDateValid(0)) {
            FARM_DATA.treeData.splice(0, 1);
            PLAYER_DATA.rollsFromTree += calcMaxRollsFromTree();
        }
    }

    renderFarm();
}

const plantTrees = amount => {
    if (FARM_DATA.treeData.length + amount <= getFarmSpaces() && amount * 100 <= PLAYER_DATA.money) {
        for (let i = 0; i < amount; i++) {
            const tree = {
                plantDay: new Date(DATETIME.date)
            }
            FARM_DATA.treeData.push(tree);
            PLAYER_DATA.money -= 100;
        }

        renderFarm()
    }
}

const getFarmSpaces = () => {
    switch(FARM_DATA.lvl) {
        case 1:
            return 5;
        case 2:
            return 10;
        case 3:
            return 20;
        case 4:
            return 50;
        default:
            return 0;
    }
}

const getFarmSlots = () => {
    let spaces = [];

    switch (FARM_DATA.lvl) {
        case 0: 
            spaces = [
                [12,13,14,13,13,14,14,13,13,14,13,14,14,15],
                [20,22, 2, 2, 2,21, 2, 2,22, 2, 2, 2, 1,23],
                [28, 2, 2, 2, 2, 2, 2, 2, 2, 2,21, 2, 2,31],
                [20,22, 2, 2, 2, 2, 2,21, 2, 2, 2, 0, 2,23],
                [28, 2, 2, 2,22, 2, 2,29, 2, 2, 2, 2,22,31],
                [20,30, 2, 2, 1,21, 2,22, 2, 2,22, 2, 2,31],
                [20,21,22, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,23],
                [28, 1, 2, 2,22, 2, 2, 2, 2,21,30,22,21,31],
                [36,37,38,37,37,38,38,37,37,37,38,37,38,39]
            ]
            break;
        case 1:
            spaces = [
                [12,13,14,13,13,14,14,13,13,14,13,14,14,15],
                [20, 8, 9,10, 9, 9,10,11,22, 2, 2, 2, 1,23],
                [28,16,26, 3,18, 3, 3,19, 2, 2,21, 2, 2,31],
                [20,32,33,33,34,33,34,35, 2, 2, 2, 0, 2,23],
                [28, 2, 2, 2,22, 2, 2,29, 2, 2, 2, 2,22,31],
                [20,30, 2, 2, 1,21, 2,22, 2, 2,22, 2, 2,31],
                [20,21,22, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,23],
                [28, 1, 2, 2,22, 2, 2, 2, 2,21,30,22,21,31],
                [36,37,38,37,37,38,38,37,37,37,38,37,38,39]
            ]
            break;
        case 2:
            spaces = [
                [12,13,14,13,13,14,14,13,13,14,13,14,14,15],
                [20, 8, 9,10, 9, 9,10,10, 9,10, 9,10,11,23],
                [28,16,26, 3,18, 3, 3,25, 3,25,26, 3,27,31],
                [20,32,33,33,34,33,34,34,33,34,33,34,35,23],
                [28, 2, 2, 2,22, 2, 2,29, 2, 2, 2, 2,22,31],
                [20,30, 2, 2, 1,21, 2,22, 2, 2,22, 2, 2,31],
                [20,21,22, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,23],
                [28, 1, 2, 2,22, 2, 2, 2, 2,21,30,22,21,31],
                [36,37,38,37,37,38,38,37,37,37,38,37,38,39]
            ]
            break;
        case 3:
            spaces = [
                [12,13,14,13,13,14,14,13,13,14,13,14,14,15],
                [20, 8, 9,10, 9, 9,10,10, 9,10, 9,10,11,23],
                [28,16,26, 3,18, 3, 3, 3, 3,25,26, 3,27,31],
                [20,16, 3, 3,26, 3, 3,26, 3, 3,18, 3,27,23],
                [20,32,33,33,34,33,34,34,33,34,33,34,35,23],
                [20,30, 2, 2, 1,21, 2,22, 2, 2,22, 2, 2,31],
                [20,21,22, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,23],
                [28, 1, 2, 2,22, 2, 2, 2, 2,21,30,22,21,31],
                [36,37,38,37,37,38,38,37,37,37,38,37,38,39]
            ]
            break;
        case 4:
            spaces = [
                [12,13,14,13,13,14,14,13,13,14,13,14,14,15],
                [20, 8, 9,10, 9, 9,10,10, 9,10, 9,10,11,23],
                [28,16,26, 3,18, 3, 3, 3, 3,25,26, 3,27,31],
                [20,16, 3, 3,17, 3, 3,26, 3, 3,18, 3,27,23],
                [20,16, 3,25, 3, 3,17, 3, 3, 3, 3, 3,27,23],
                [20,16, 3, 3,26, 3, 3, 3, 3, 3, 3, 3,27,31],
                [20,16, 3, 3,18, 3, 3,25, 3, 3,18, 3,27,23],
                [28,32,33,33,34,33,34,34,33,34,33,34,35,31],
                [36,37,38,37,37,38,38,37,37,37,38,37,38,39]
            ]
            break;
        default:
            spaces = []
    }

    return spaces;
}

const renderFarmControls = () => {
    if (FARM_DATA.lvl > 0) {

        displayFarmControls.innerHTML = `
            <button onclick="plantTrees(1)" ${PLAYER_DATA.money < 100 || getFarmSpaces() - FARM_DATA.treeData.length <= 0 ? "disabled" : ""}>
                <img class="plant" src="assets/spritesheet_icons.png" alt="Icons Spritesheet" />
                <p>Plant 1 tree</p>
                <p>[100$]</p>
            </button>
        `;

        if (getFarmSpaces() - FARM_DATA.treeData.length > 1) {
            displayFarmControls.innerHTML += `
                <button onclick="plantTrees(${getFarmSpaces() - FARM_DATA.treeData.length})" ${PLAYER_DATA.money < (getFarmSpaces() - FARM_DATA.treeData.length) * 100 ? "disabled" : ""}>
                    <img class="plant" src="assets/spritesheet_icons.png" alt="Icons Spritesheet" />
                    <p>Plant ${getFarmSpaces() - FARM_DATA.treeData.length} trees</p>
                    <p>[${(getFarmSpaces() - FARM_DATA.treeData.length) * 100}$]</p>
                </button>
            `;
        }

        let treeHarvestCounter = 0;
        for (let i = 0; i < FARM_DATA.treeData.length; i++) {
            if (isHarvestDateValid(i)) {
                treeHarvestCounter += 1;
            }
        }

        if (treeHarvestCounter > 0) {
            displayFarmControls.innerHTML += `
                <button onclick="harvestTrees(${treeHarvestCounter})" ${calcTreeStorageTotal() - Math.ceil((PLAYER_DATA.rollsFromTree) / calcMaxRollsFromTree()) <= 0 ? "disabled" : ""}>
                    <img class="harvest" src="assets/spritesheet_icons.png" alt="Icons Spritesheet" />
                    <p>Harvest all trees</p>
                </button>
            `;
        }
    }
}

const renderFarm = () => {
    renderFarmControls();

    let spaces = getFarmSlots();

    if (spaces.length > 0) {
        ctx_worldLayer.clearRect(0, 0, worldLayer.width, worldLayer.height);
        ctx_shadowLayer.clearRect(0, 0, treeLayer.width, treeLayer.height);
        ctx_treeLayer.clearRect(0, 0, treeLayer.width, treeLayer.height);

        let treeCounter = 0;

        for (let y = 0; y < spaces.length; y++) {
            for (let x = 0; x < spaces[y].length; x++) {

                ctx_worldLayer.drawImage(spritesheetGround, getCurrentGroundTileXY(spaces[y][x])[0], getCurrentGroundTileXY(spaces[y][x])[1], tilesize, tilesize, x * tilesize, y * tilesize, tilesize, tilesize);

                if (y > 0 && y < spaces.length - 3 && x > 1 && x < spaces[y].length - 2 && FARM_DATA.treeData[treeCounter] != undefined) {
                    let treeX = 0;

                    switch(true) {
                        case daysLeftTillHarvest(treeCounter) >= 7:
                            treeX = 0;
                            break;
                        case daysLeftTillHarvest(treeCounter) >= 4:
                            treeX = tilesize;
                            break;
                        case daysLeftTillHarvest(treeCounter) >= 0:
                            treeX = tilesize * 2;
                            break;
                        default:
                            treeX = tilesize * 3;
                    }
                    
                    ctx_shadowLayer.drawImage(spritesheetShadow, treeX, 0, tilesize, tilesize * 2, x * tilesize, y * tilesize, tilesize, tilesize * 2);
                    ctx_treeLayer.drawImage(spritesheetTrees, treeX, 0, tilesize, tilesize * 2, x * tilesize, y * tilesize, tilesize, tilesize * 2);
                    treeCounter += 1;
                }

            }
        }
    }
}

const getCurrentGroundTileXY = id => {
    switch (id) {
        case 0:
            return [0,0];
        case 1:
            return [tilesize, 0];
        case 2:
            return [tilesize * 2, 0];
        case 3:
            return [tilesize * 3, 0];
        case 4:
            return [tilesize * 4, 0];
        case 5:
            return [tilesize * 5, 0];
        case 6:
            return [tilesize * 6, 0];
        case 7:
            return [tilesize * 7, 0];
        case 8:
            return [0, tilesize];
        case 9:
            return [tilesize, tilesize];
        case 10:
            return [tilesize * 2, tilesize];
        case 11:
            return [tilesize * 3, tilesize];
        case 12:
            return [tilesize * 4, tilesize];
        case 13:
            return [tilesize * 5, tilesize];
        case 14:
            return [tilesize * 6, tilesize];
        case 15:
            return [tilesize * 7, tilesize];
        case 16:
            return [0, tilesize * 2];
        case 17:
            return [tilesize, tilesize * 2];
        case 18:
            return [tilesize * 2, tilesize * 2];
        case 19:
            return [tilesize * 3, tilesize * 2];
        case 20:
            return [tilesize * 4, tilesize * 2];
        case 21:
            return [tilesize * 5, tilesize * 2];
        case 22:
            return [tilesize * 6, tilesize * 2];
        case 23:
            return [tilesize * 7, tilesize * 2];
        case 24:
            return [0, tilesize * 3];
        case 25:
            return [tilesize, tilesize * 3];
        case 26:
            return [tilesize * 2, tilesize * 3];
        case 27:
            return [tilesize * 3, tilesize * 3];
        case 28:
            return [tilesize * 4, tilesize * 3];
        case 29:
            return [tilesize * 5, tilesize * 3];
        case 30:
            return [tilesize * 6, tilesize * 3];
        case 31:
            return [tilesize * 7, tilesize * 3];
        case 32:
            return [0, tilesize * 4];
        case 33:
            return [tilesize, tilesize * 4];
        case 34:
            return [tilesize * 2, tilesize * 4];
        case 35:
            return [tilesize * 3, tilesize * 4];
        case 36:
            return [tilesize * 4, tilesize * 4];
        case 37:
            return [tilesize * 5, tilesize * 4];
        case 38:
            return [tilesize * 6, tilesize * 4];
        case 39:
            return [tilesize * 7, tilesize * 4];
    }
}

const updateShopDisplay = () => {

    let shopContent = "";

    for (let i = 0; i < SHOP_PRODUCTS.length; i++) {
        if (SHOP_PRODUCTS[i].isVisible <= PLAYER_DATA.globalTPRolls && (SHOP_PRODUCTS[i].maxQuantity > SHOP_PRODUCTS[i].quantity || SHOP_PRODUCTS[i].maxQuantity == undefined)) {
            
            let price = SHOP_PRODUCTS[i].price;
            let disabledBtn = "";
            let className = "cta";

            if (SHOP_PRODUCTS[i].id === 0) {
                if (Math.ceil(PLAYER_DATA.rollsFromTree / calcMaxRollsFromTree()) >= calcTreeStorageTotal()) {
                    disabledBtn = "disabled";
                }
            }
            if (SHOP_PRODUCTS[i].id === 1) {
                price = 100 * (SHOP_PRODUCTS[i].quantity + 1);
                SHOP_PRODUCTS[i].price = price;
            }
            if (SHOP_PRODUCTS[i].price > PLAYER_DATA.money) {
                disabledBtn = "disabled";
                className = "";
            }

            shopContent += `<li>
                <h3>${SHOP_PRODUCTS[i].name}</h3>
                <p>${SHOP_PRODUCTS[i].description}</p>
                <p>Price: <span>${price}$</span></p>
                <button class="${className}" onClick="buyProduct(${SHOP_PRODUCTS[i].id})" ${disabledBtn}>Buy</button>
            </li>`
        }
    }

    displayShopProducts.innerHTML = shopContent;
}

const calcTreeStorageTotal = () => {
    const totalLvl = SHOP_PRODUCTS[3].quantity + SHOP_PRODUCTS[4].quantity + SHOP_PRODUCTS[5].quantity + SHOP_PRODUCTS[6].quantity;

    switch (totalLvl) {
        case 0:
            return 5;
        case 1:
            return 10;
        case 2:
            return 25;
        case 3:
            return 50;
        case 4:
            return 100;
    }
}

const calcTPStorageTotal = () => {
    const totalLvl = SHOP_PRODUCTS[7].quantity + SHOP_PRODUCTS[8].quantity + SHOP_PRODUCTS[9].quantity + SHOP_PRODUCTS[10].quantity;

    switch (totalLvl) {
        case 0:
            return 1000;
        case 1:
            return 2500;
        case 2:
            return 10000;
        case 3:
            return 50000;
        case 4:
            return 100000;
    }
}

const calcMaxRollsFromTree = () => {
    if (SHOP_PRODUCTS[11].quantity > 0) {
        return 1000;
    } else {
        return 800;
    }
}

const newDay = () => {
    SHOP_PRODUCTS[0].price = returnNewTreePrice();
    DATETIME.date.setDate(DATETIME.date.getDate() + 1);
    DATETIME.time = DATETIME.maxSecondsPerDay;
    displayGameDate.innerText = readableDateString(DATETIME.date);
    checkEvents();
    checkProductInterest();
    updateShopDisplay();
    renderFarm();
}

const showEventPopup = gameEvent => {
    GAME_PAUSED = true;
    displayPopup.classList = "show";
    let content = "";
    if (gameEvent.img != null && gameEvent.img.length > 0) {
        content += `<img src="${gameEvent.img}" alt="${gameEvent.title}" />`;
    }
    content += `
        <h2>${gameEvent.title}</h2>
        <p>${gameEvent.description}</p>
        <button onclick="hidePopup()">Ok</button>
    `;
    displayPopupContainer.innerHTML = content;
}

const hidePopup = () => {
    displayPopup.classList = "hide";
    setTimeout(() => {
        displayPopup.classList = "";
        GAME_PAUSED = false;
    }, 400);
    
}

// SETUP FUNCTIONS
// CHECKER FUNCTIONS

const checkEvents = () => {
    for (let e = 0; e < GAME_EVENTS.length; e++) {
        if (GAME_EVENTS[e].startDate - DATETIME.date == 0) {
            GAME_EVENTS[e].startEvent();
            showEventPopup(GAME_EVENTS[e]);
        } else if (GAME_EVENTS[e].startDate < DATETIME.date && GAME_EVENTS[e].endDate > DATETIME.date) {      
            GAME_EVENTS[e].activeEvent();
        } else if (GAME_EVENTS[e].endDate - DATETIME.date == 0) {
            GAME_EVENTS[e].endEvent();
        }
    }
}

const isHarvestDateValid = id => {
    const tempDate = FARM_DATA.treeData[id].plantDay;
    const harvestDate = new Date(tempDate);
    harvestDate.setDate(harvestDate.getDate() + 10);

    return harvestDate < DATETIME.date;
}

const daysLeftTillHarvest = id => {
    const tempDate = FARM_DATA.treeData[id].plantDay;
    const harvestDate = new Date(tempDate);
    harvestDate.setDate(harvestDate.getDate() + 10);

    return (DATETIME.date - harvestDate) / (3600 * 24) / -1000;
}

const checkProduct = productID => {
    switch (productID) {
        case 0:
            if (Math.ceil(PLAYER_DATA.rollsFromTree / calcMaxRollsFromTree()) < calcTreeStorageTotal()) {
                PLAYER_DATA.rollsFromTree += calcMaxRollsFromTree();
                return true;
            }
            return false;
        case 2:
            EQUIPMENT_DATA.multiplier += 1;
            return true;
        case 12:
            MARKETING_DATA.multiplier += .05;
            checkProductInterest();
            return true;
        case 13:
            MARKETING_DATA.multiplier += .15;
            checkProductInterest();
            return true;
        case 14:
            MARKETING_DATA.amount += 8;
            return true;
        case 15:
            MARKETING_DATA.amount += 12
            return true;
        case 16:
            FARM_DATA.lvl += 1;
            renderFarm();
            return true;
        case 17:
            FARM_DATA.lvl += 1;
            renderFarm();
            return true;
        case 18:
            FARM_DATA.lvl += 1;
            renderFarm();
            return true;
        case 19:
            FARM_DATA.lvl += 1;
            renderFarm();
            return true;
        default:
            return true;
    }
}

const checkUIElements = () => {
    displayGameDate.innerText = readableDateString(DATETIME.date);
    displayGameSpeed.innerText = `x${SETTINGS.daySpeed}`; 
    displayMoney.innerText = `${PLAYER_DATA.money}$`;
    displayProductInterest.innerText = `${MARKETING_DATA.productInteresed}%`;
    displayTotalRolls.innerText = `${PLAYER_DATA.globalTPRolls}`;
    displayStorageTrees.innerText = `${Math.ceil(PLAYER_DATA.rollsFromTree / calcMaxRollsFromTree())}/${calcTreeStorageTotal()}`;
    displayPossibleRolls.innerText = `${PLAYER_DATA.rollsFromTree}`;
    displayStorageTP.innerText = `${PLAYER_DATA.tpRolls}/${calcTPStorageTotal()}`;
    displayFactoriesQuantity.innerText = `${SHOP_PRODUCTS[1].quantity}`;
    displayFactoriesEfficiency.innerText = `${EQUIPMENT_DATA.multiplier}`;
    displayPricePerRoll.innerText = `${PRICE_PER_ROLL}$`

    if (SHOP_PRODUCTS[16].quantity > 0) {
        buttonShowFarm.disabled = false;
    } else {
        buttonShowFarm.disabled = true;
    }
}

const checkGameSpeedButtons = () => {
    if (SETTINGS.daySpeed <= 1) {
        buttonGameSpeedMinus.disabled = true;
    } else {
        buttonGameSpeedMinus.disabled = false;
    }
    if (SETTINGS.daySpeed >= SETTINGS.maxDaySpeed) {
        buttonGameSpeedPlus.disabled = true;
    } else {
        buttonGameSpeedPlus.disabled = false;
    }
}

const checkProductInterest = () => {
    const currentPercentage = Math.round((((100 / (IDEAL_PRICE_PER_ROLL + MARKETING_DATA.multiplier)) * PRICE_PER_ROLL) + Number.EPSILON) * 100) / 100;
    MARKETING_DATA.productInteresed = Math.round(100 - (currentPercentage - 100));
}

// CHECKER FUNCTIONS
// EVENTLISTENERS

buttonGameSpeedMinus.addEventListener("click", () => {
    if (SETTINGS.daySpeed > 1) {
        SETTINGS.daySpeed /= 2;
        displayGameSpeed.innerText = `x${SETTINGS.daySpeed}`;
    }

    checkGameSpeedButtons()
})
buttonGameSpeedPlus.addEventListener("click", () => {
    if (SETTINGS.daySpeed < SETTINGS.maxDaySpeed) {
        SETTINGS.daySpeed *= 2;
        displayGameSpeed.innerText = `x${SETTINGS.daySpeed}`;
    }

    checkGameSpeedButtons()
})

buttonShowFarm.addEventListener("click", () => {
    buttonShowFarm.classList = "hidden";
    buttonShowShop.classList = "";
    buttonHideFarm.classList = "";
    buttonHideShop.classList = "hidden";

    displayViewTitleFarm.classList = "";
    displayViewTitleShop.classList = "hidden";

    vcFarm.classList.add("active");
    vcShop.classList = "";
    vcClicker.classList = "";

    masterBody.classList = "farm";
})
buttonHideFarm.addEventListener("click", () => {
    buttonShowFarm.classList = "";
    buttonShowShop.classList = "";
    buttonHideFarm.classList = "hidden";
    buttonHideShop.classList = "hidden";

    displayViewTitleFarm.classList = "hidden";
    displayViewTitleShop.classList = "hidden";

    vcFarm.classList = "";
    vcShop.classList = "";
    vcClicker.classList.add("active");

    masterBody.classList = "";
})
buttonShowShop.addEventListener("click", () => {
    buttonShowFarm.classList = "";
    buttonShowShop.classList = "hidden";
    buttonHideFarm.classList = "hidden";
    buttonHideShop.classList = "";
    
    displayViewTitleFarm.classList = "hidden";
    displayViewTitleShop.classList = "";

    vcFarm.classList = "";
    vcShop.classList.add("active");
    vcClicker.classList = "";

    masterBody.classList = "shop";
})
buttonHideShop.addEventListener("click", () => {
    buttonShowFarm.classList = "";
    buttonShowShop.classList = "";
    buttonHideFarm.classList = "hidden";
    buttonHideShop.classList = "hidden";

    displayViewTitleFarm.classList = "hidden";
    displayViewTitleShop.classList = "hidden";

    vcFarm.classList = "";
    vcShop.classList = "";
    vcClicker.classList.add("active");

    masterBody.classList = "";
})

// EVENTLISTENERS
// GAME STARTUP

const gameStart = () => {
    worldLayer.width = 14 * tilesize;
    worldLayer.height = 9 * tilesize;
    shadowLayer.width = 14 * tilesize;
    shadowLayer.height = 9 * tilesize;
    treeLayer.width = 14 * tilesize;
    treeLayer.height = 9 * tilesize;

    if (loadData()) {
        console.log("Game loaded successfully")
    } else {
        console.log("No save data found or save data is corrupted!");
    }

    checkProductInterest();
    checkUIElements();
    checkGameSpeedButtons();
    renderFarm();

    updateShopDisplay();
    
    setTimeout(updateLoop, 1000);
    setInterval(()=> {
        if (!GAME_PAUSED) {
            renderFarmControls();
            updateShopDisplay()
            saveData()
        }
    }, 1000);
}

// GAME STARTUP
// GAME LOOP

const updateLoop = () => {

    if (!GAME_PAUSED) {

        updateGameTime();

        checkUIElements();
        checkGameSpeedButtons();

        if (PLAYER_DATA.tpRolls - MARKETING_DATA.amount >= 0) {
            if (Math.random() * 100 <= MARKETING_DATA.productInteresed) {
                sellTPRoll(MARKETING_DATA.amount);
            }
        } else if (PLAYER_DATA.tpRolls - MARKETING_DATA.multiplier >= 0) {
            if (Math.random() * 100 <= MARKETING_DATA.productInteresed) {
                sellTPRoll(PLAYER_DATA.tpRolls);
            }
        }

        if (SHOP_PRODUCTS[1].quantity > 0) {
            createTPRoll(SHOP_PRODUCTS[1].quantity * EQUIPMENT_DATA.multiplier)
        }
            
    }

    setTimeout(updateLoop, 1000 / SETTINGS.daySpeed);
}

// GAME LOOP
// START GAME

window.addEventListener('load', gameStart)
