// CANVAS SETUP

const worldLayer = document.getElementById("canvas-world-layer");
const treeLayer = document.getElementById("canvas-tree-layer");
const ctx_worldLayer = worldLayer.getContext("2d");
const ctx_treeLayer = treeLayer.getContext("2d");
const tilesize = 64;

// CANVAS SETUP
// SETUP VARIABLES

let DATETIME = {
    date: new Date(2019, 11, 1, 0, 0, 0, 0),
    endDate: new Date(2024, 11, 1, 0, 0, 0, 0),
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
    globalTPRolls: 1_000_000_000,
    tpRolls: 1_000_000_000,
    globalMoney: 1_000_000_000,
    money: 1_000_000_000,
    rollsFromTree: 1600
}

let FARM_DATA = {
    lvl: 0,
    treeData: []
}

let GAME_PAUSED = false;

let GAME_EVENTS = [
    {
        startDate: new Date(2019, 11, 2, 0, 0, 0, 0),
        endDate: new Date(2019, 11, 3, 0, 0, 0, 0),
        startEvent: () => {
        },
        activeEvent: () => {
        },
        endEvent: () => {
        },
        img: "event-calendar",
        effect: "",
        effectClass: "",
        title: "Help",
        description: "This game containes in game events where the game pauses to read the event description. This events can have all kind of stuff, Marketing could be increased or decreased, etc..<br>The blue fields below shows you the start and end date."
    },
    {
        startDate: new Date(2019, 11, 18, 0, 0, 0, 0),
        endDate: new Date(2019, 11, 25, 0, 0, 0, 0),
        startEvent: () => {
            MARKETING_DATA.multiplier += .35;
        },
        activeEvent: () => {
        },
        endEvent: () => {
            MARKETING_DATA.multiplier -= .35;
        },
        img: "event-christmas",
        effect: "+35% Marketing",
        effectClass: "positive",
        title: "Top Christmas Present",
        description: "Toilet Paper is on the top of the most wanted christmas presents this year. You need it probably every day, so why don't you gift it to your loved ones?"
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
        img: "event-tprolls",
        effect: "+35% Marketing",
        effectClass: "positive",
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
        img: "event-halloween",
        effect: "+10% Marketing",
        effectClass: "positive",
        title: "Halloween - TP-ing Pranks",
        description: "Halloween is near and people try to hoard toilet paper for the TP-ing pranks."
    },
    {
        startDate: new Date(2021, 9, 26, 0, 0, 0, 0),
        endDate: new Date(2021, 10, 1, 0, 0, 0, 0),
        startEvent: () => {
            MARKETING_DATA.multiplier += .1;
        },
        activeEvent: () => {
        },
        endEvent: () => {
            MARKETING_DATA.multiplier -= .1;
        },
        img: "event-halloween",
        effect: "+10% Marketing",
        effectClass: "positive",
        title: "Halloween - TP-ing Pranks",
        description: "Halloween is near and people try to hoard toilet paper for the TP-ing pranks."
    },
    {
        startDate: new Date(2022, 9, 26, 0, 0, 0, 0),
        endDate: new Date(2022, 10, 1, 0, 0, 0, 0),
        startEvent: () => {
            MARKETING_DATA.multiplier += .1;
        },
        activeEvent: () => {
        },
        endEvent: () => {
            MARKETING_DATA.multiplier -= .1;
        },
        img: "event-halloween",
        effect: "+10% Marketing",
        effectClass: "positive",
        title: "Halloween - TP-ing Pranks",
        description: "Halloween is near and people try to hoard toilet paper for the TP-ing pranks."
    },
    {
        startDate: new Date(2023, 9, 26, 0, 0, 0, 0),
        endDate: new Date(2023, 10, 1, 0, 0, 0, 0),
        startEvent: () => {
            MARKETING_DATA.multiplier += .1;
        },
        activeEvent: () => {
        },
        endEvent: () => {
            MARKETING_DATA.multiplier -= .1;
        },
        img: "event-halloween",
        effect: "+10% Marketing",
        effectClass: "positive",
        title: "Halloween - TP-ing Pranks",
        description: "Halloween is near and people try to hoard toilet paper for the TP-ing pranks."
    },
    {
        startDate: new Date(2024, 9, 26, 0, 0, 0, 0),
        endDate: new Date(2024, 10, 1, 0, 0, 0, 0),
        startEvent: () => {
            MARKETING_DATA.multiplier += .1;
        },
        activeEvent: () => {
        },
        endEvent: () => {
            MARKETING_DATA.multiplier -= .1;
        },
        img: "event-halloween",
        effect: "+10% Marketing",
        effectClass: "positive",
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
        icon: "add-tree"
    },
    {
        id: 1,
        isVisible: 0,
        maxQuantity: undefined,
        quantity: 0,
        name: "Auto Factory",
        description: "Produces 1 toilet paper roll per second. Will get better after you upgrade the factory in the later game.",
        price: 50.00,
        icon: "add-factory"
    },
    {
        id: 2,
        isVisible: 10000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Factory",
        description: "You will produce 2 rolls per second after upgrading your factories.",
        price: 2000.00,
        icon: "upgrade-factory"
    },
    {
        id: 3,
        isVisible: 1000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Tree Storage 1",
        description: "Store more trees.",
        price: 200.00,
        icon: "upgrade-treestorage"
    },
    {
        id: 4,
        isVisible: 5000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Tree Storage 2",
        description: "Store more trees.",
        price: 400.00,
        icon: "upgrade-treestorage"
    },
    {
        id: 5,
        isVisible: 15000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Tree Storage 3",
        description: "Store more trees.",
        price: 1000.00,
        icon: "upgrade-treestorage"
    },
    {
        id: 6,
        isVisible: 50000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Tree Storage 4",
        description: "Store more trees.",
        price: 5000.00,
        icon: "upgrade-treestorage"
    },
    {
        id: 7,
        isVisible: 100,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Toilet Paper Storage 1",
        description: "Store more trees.",
        price: 100.00,
        icon: "upgrade-tpstorage"
    },
    {
        id: 8,
        isVisible: 2500,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Toilet Paper Storage 2",
        description: "Store more trees.",
        price: 400.00,
        icon: "upgrade-tpstorage"
    },
    {
        id: 9,
        isVisible: 10000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Toilet Paper Storage 3",
        description: "Store more trees.",
        price: 800.00,
        icon: "upgrade-tpstorage"
    },
    {
        id: 10,
        isVisible: 50000,
        maxQuantity: 1,
        quantity: 0,
        name: "Upgrade Toilet Paper Storage 4",
        description: "Store more trees.",
        price: 1500.00,
        icon: "upgrade-tpstorage"
    },
    {
        id: 11,
        isVisible: 5000,
        maxQuantity: 1,
        quantity: 0,
        name: "Renewable Resources",
        description: "Get more rolls out of a tree.",
        price: 2500.00,
        icon: "renewable-resources"
    },
    {
        id: 12,
        isVisible: 1000,
        maxQuantity: 1,
        quantity: 0,
        name: "Colorfull Rolls",
        description: "Create colorfull toilet paper rolls to spice things up.",
        price: 500.00,
        icon: "marketing-colorfull"
    },
    {
        id: 13,
        isVisible: 5000,
        maxQuantity: 1,
        quantity: 0,
        name: "Multi Sheet ply",
        description: "Increase sheet ply to make the toilet paper comfy. The needed resources will not be increased. You found out how to get more toilet paper from a tree.",
        price: 1000.00,
        icon: "marketing-multisheet"
    },
    {
        id: 14,
        isVisible: 25000,
        maxQuantity: 1,
        quantity: 0,
        name: "Toilet Paper Multi Pack 8",
        description: "Sell 8 toilet paper rolls in a pack to get more sales.",
        price: 10000.00,
        icon: "tp-pack"
    },
    {
        id: 15,
        isVisible: 100000,
        maxQuantity: 1,
        quantity: 0,
        name: "Toilet Paper Multi Pack 12",
        description: "Sell 12 toilet paper rolls in a pack to get more sales.",
        price: 20000.00,
        icon: "tp-pack"
    },
    {
        id: 16,
        isVisible: 10000,
        maxQuantity: 1,
        quantity: 0,
        name: "Tree Farm",
        description: "Grow your own Trees and save some money. You can plant 5 trees. You can level the farm up to be able to plant more trees..",
        price: 4000.00,
        icon: "add-treefarm"
    },
    {
        id: 17,
        isVisible: 15000,
        maxQuantity: 1,
        quantity: 0,
        name: "Tree Farm Upgrade 1",
        description: "You are able to plant 10 trees.",
        price: 2000.00,
        icon: "upgrade-treefarm"
    },
    {
        id: 18,
        isVisible: 50000,
        maxQuantity: 1,
        quantity: 0,
        name: "Tree Farm Upgrade 2",
        description: "You are able to plant 20 trees.",
        price: 4000.00,
        icon: "upgrade-treefarm"
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
const buttonDecreasePrice = document.getElementById("btn--decrease-price");
const buttonIncreasePrice = document.getElementById("btn--increase-price");
const buttonCreateTPRoll = document.getElementById("btn--create-tpr");

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
    localStorage.removeItem("smallScreenSize")
    location.reload();
}

const endGame = () => {
    GAME_PAUSED = true;
    displayPopup.classList = "show";

    let content = `
            <div id="display--end--container-wrapper">
                <h2>You've made it!</h2>
                <div>
                    <div>
                        <img class="img-money" src="assets/spritesheet_icons.png" alt="Icons Spritesheet" />
                        <p>Total Money:</p>
                        <p>${readableNumber(PLAYER_DATA.globalMoney, 2, 1)}$</p>
                    </div>
                    <div>
                        <img class="img-money" src="assets/spritesheet_icons.png" alt="Icons Spritesheet" />
                        <p>Money left:</p>
                        <p>${readableNumber(PLAYER_DATA.money, 2, 1)}$</p>
                    </div>
                    <div>
                        <img class="img-tprolls" src="assets/spritesheet_icons.png" alt="Icons Spritesheet" />
                        <p>Total Rolls:</p>
                        <p>${readableNumber(PLAYER_DATA.globalTPRolls, 0, 1)}</p>
                    </div>
                    <div>
                        <img class="img-tprolls" src="assets/spritesheet_icons.png" alt="Icons Spritesheet" />
                        <p>Rolls left:</p>
                        <p>${readableNumber(PLAYER_DATA.tpRolls, 0, 1)}</p>
                    </div>
                </div>
                <button onclick="resetData()">Finish</button>
        </div>
    `;

    displayPopupContainer.innerHTML = content;
}

const readableDateString = date => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

const readableNumber = (num, dec, roundDec) => {
    let formatedNumber;
    
    switch (true) {
        case num / 1_000_000_000_000_000 > 0.999:
            formatedNumber = Math.round((num / 1_000_000_000 + Number.EPSILON) * 100) / 100;
            return `${formatedNumber.toFixed(roundDec)}q`;
        case num / 1_000_000_000_000 > 0.999:
            formatedNumber = Math.round((num / 1_000_000_000 + Number.EPSILON) * 100) / 100;
            return `${formatedNumber.toFixed(roundDec)}t`;
        case num / 1_000_000_000 > 0.999:
            formatedNumber = Math.round((num / 1_000_000_000 + Number.EPSILON) * 100) / 100;
            return `${formatedNumber.toFixed(roundDec)}b`;
        case num / 1_000_000 > 0.999:
            formatedNumber = Math.round((num / 1_000_000 + Number.EPSILON) * 100) / 100;
            return `${formatedNumber.toFixed(roundDec)}m`;
        case num / 1_000 > 0.999:
            formatedNumber = Math.round((num / 1_000 + Number.EPSILON) * 100) / 100;
            return `${formatedNumber.toFixed(roundDec)}K`;
        default:
            formatedNumber = Math.round((num + Number.EPSILON) * 100) / 100;
            return `${formatedNumber.toFixed(dec)}`;
    }
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
    displayPricePerRoll.innerText = `${readableNumber(PRICE_PER_ROLL, 2, 0)}$`
    checkProductInterest();
}
const raisePricePerRoll = () => {
    PRICE_PER_ROLL += 0.01;
    PRICE_PER_ROLL = Math.round((PRICE_PER_ROLL + Number.EPSILON) * 100) / 100;
    displayPricePerRoll.innerText = `${readableNumber(PRICE_PER_ROLL, 2, 0)}$`
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
    PLAYER_DATA.money += amount;
    PLAYER_DATA.money = Math.round((PLAYER_DATA.money + Number.EPSILON) * 100) / 100;
    PLAYER_DATA.globalMoney += amount;
    PLAYER_DATA.globalMoney = Math.round((PLAYER_DATA.globalMoney + Number.EPSILON) * 100) / 100;
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
                plantDay: new Date(DATETIME.date),
                type: Math.floor(Math.random() * 2)
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
        case 1:
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
        case 2:
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
        case 3:
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
        case 4: 
            // disabled lvl
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
                    <p>[${readableNumber((getFarmSpaces() - FARM_DATA.treeData.length) * 100, 0, 1)}$]</p>
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
        ctx_treeLayer.clearRect(0, 0, treeLayer.width, treeLayer.height);

        let treeCounter = 0;

        for (let y = 0; y < spaces.length; y++) {
            for (let x = 0; x < spaces[y].length; x++) {

                ctx_worldLayer.drawImage(spritesheetGround, getCurrentGroundTileXY(spaces[y][x])[0], getCurrentGroundTileXY(spaces[y][x])[1], tilesize, tilesize, x * tilesize, y * tilesize, tilesize, tilesize);

                if (y >= 0 && y * 2 < spaces.length - 2 && x > 0 && x * 2 < spaces[y].length - 2 && FARM_DATA.treeData[treeCounter] != undefined) {
                    let treeX = 0;

                    switch(true) {
                        case daysLeftTillHarvest(treeCounter) >= 7:
                            treeX = 0;
                            break;
                        case daysLeftTillHarvest(treeCounter) >= 4:
                            treeX = tilesize * 2;
                            break;
                        case daysLeftTillHarvest(treeCounter) >= 1:
                            treeX = tilesize * 4;
                            break;
                        default:
                            treeX = tilesize * 6;
                    }
                    
                    ctx_treeLayer.drawImage(spritesheetTrees, treeX, tilesize * 2 * FARM_DATA.treeData[treeCounter].type, tilesize * 2, tilesize * 2, x * tilesize * 2, y * tilesize * 1.5, tilesize * 2, tilesize * 2);
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
    let dummyID = "";
    let filteredShopArray = SHOP_PRODUCTS.filter((product) => {
        if (product.quantity === 0 && product.maxQuantity === 1 && product.icon !== dummyID) {
            dummyID = product.icon;
            return product; 
        } else if (product.icon === dummyID) {
            return null;
        } else {
            return product;
        }
    });

    for (let i = 0; i < filteredShopArray.length; i++) {
        if (filteredShopArray[i].isVisible <= PLAYER_DATA.globalTPRolls && (filteredShopArray[i].maxQuantity > filteredShopArray[i].quantity || filteredShopArray[i].maxQuantity == undefined)) {
            
            let price = filteredShopArray[i].price;
            let disabledBtn = "";
            let className = "cta";

            if (filteredShopArray[i].id === 0) {
                if (Math.ceil(PLAYER_DATA.rollsFromTree / calcMaxRollsFromTree()) >= calcTreeStorageTotal()) {
                    disabledBtn = "disabled";
                }
            }
            if (filteredShopArray[i].id === 1) {
                price = 100 * (filteredShopArray[i].quantity + 1);
                filteredShopArray[i].price = price;
            }
            if (filteredShopArray[i].price > PLAYER_DATA.money) {
                disabledBtn = "disabled";
                className = "";
            }

            shopContent += `<li>
                <div>
                    <div></div>
                    <img class="${filteredShopArray[i].icon}" src="assets/spritesheet_icons.png" alt="spritesheet icons" />
                    <p><span>${readableNumber(filteredShopArray[i].price, 0, 1)}$</span></p>
                </div>
                <div>
                    <h3>${filteredShopArray[i].name}</h3>
                    <p>${filteredShopArray[i].description}</p>
                    <button class="${className}" onClick="buyProduct(${filteredShopArray[i].id})" ${disabledBtn}>Buy</button>
                </div>
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
            return 100;
        case 1:
            return 1000;
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

    if (DATETIME.endDate - DATETIME.date == 0) {
        endGame();
    }
}

const showEventPopup = gameEvent => {
    GAME_PAUSED = true;
    displayPopup.classList = "show";
    let content = "";
    if (gameEvent.img != null && gameEvent.img.length > 0) {
        content += `
            <div id="display--popup--container--img-wrapper">
                <img class="${gameEvent.img}" src="assets/spritesheet_events.png" alt="Event Spritesheet">
                <p class="${gameEvent.effectClass}">${gameEvent.effect}</p>
            </div>
        `;
    }
    content += `
        <div id="display--popup--container-wrapper">
            <button onclick="hidePopup()">X</button>
            <div id="display--popup--container--text-wrapper">
                <h2>${gameEvent.title}</h2>
                <p>${gameEvent.description}</p>
            </div>`;

    if (gameEvent.startDate != null) {
        content += `
                <div id="display--popup--container--controls-wrapper">
                    <div>${readableDateString(gameEvent.startDate)}</div>`

        if (gameEvent.endDate != null) {
            content += `
                    <div>${readableDateString(gameEvent.endDate)}</div>`;
        }

        content += `</div>`;
    }

    content += `
        </div>
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
    displayMoney.innerText = `${readableNumber(PLAYER_DATA.money, 2, 1)}$`;
    displayProductInterest.innerText = `${MARKETING_DATA.productInteresed}%`;
    displayTotalRolls.innerText = `${readableNumber(PLAYER_DATA.globalTPRolls, 0, 1)}`;
    displayStorageTrees.innerText = `${Math.ceil(PLAYER_DATA.rollsFromTree / calcMaxRollsFromTree())}/${calcTreeStorageTotal()}`;
    displayPossibleRolls.innerText = `${readableNumber(PLAYER_DATA.rollsFromTree, 0, 1)}`;
    displayStorageTP.innerText = `${readableNumber(PLAYER_DATA.tpRolls, 0, 1)}/${readableNumber(calcTPStorageTotal(), 0, 0)}`;
    displayFactoriesQuantity.innerText = `${readableNumber(SHOP_PRODUCTS[1].quantity, 0, 1)}`;
    displayFactoriesEfficiency.innerText = `${EQUIPMENT_DATA.multiplier}`;
    displayPricePerRoll.innerText = `${readableNumber(PRICE_PER_ROLL, 2, 0)}$`

    if (SHOP_PRODUCTS[16].quantity > 0) {
        buttonShowFarm.disabled = false;
    } else {
        buttonShowFarm.disabled = true;
    }

    if (MARKETING_DATA.productInteresed <= 0) {
        buttonIncreasePrice.disabled = true;
    } else if (MARKETING_DATA.productInteresed > 0 && buttonIncreasePrice.disabled) {
        buttonIncreasePrice.disabled = false;
    }

    if (PRICE_PER_ROLL <= 0) {
        buttonDecreasePrice.disabled = true;
    } else if (PRICE_PER_ROLL > 0 && buttonDecreasePrice.disabled) {
        buttonDecreasePrice.disabled = false;
    }

    if (PLAYER_DATA.tpRolls >= calcTPStorageTotal()) {
        buttonCreateTPRoll.disabled = true;
    } else if (PLAYER_DATA.tpRolls < calcTPStorageTotal() && buttonCreateTPRoll.disabled) {
        buttonCreateTPRoll.disabled = false;
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

buttonIncreasePrice.addEventListener("click", ()=> {
    if (MARKETING_DATA.productInteresed > 0) {
        raisePricePerRoll()
    }
})
buttonDecreasePrice.addEventListener("click", ()=> {
    if (PRICE_PER_ROLL > 0) {
        lowerPricePerRoll()
    }
})
buttonCreateTPRoll.addEventListener("click", ()=> {
    if (PLAYER_DATA.tpRolls < calcTPStorageTotal()) {
        createTPRoll(1);
    }
})



// EVENTLISTENERS
// GAME STARTUP

const gameStart = () => {
    worldLayer.width = 14 * tilesize;
    worldLayer.height = 9 * tilesize;
    treeLayer.width = 14 * tilesize;
    treeLayer.height = 9 * tilesize;

    if (loadData()) {
        console.log("Game loaded successfully!");
    } else {
        console.log("No save data found or save data is corrupted!");
        showEventPopup(
            {
                startDate: null,
                endDate: null,
                img: null,
                effect: "",
                effectClass: "",
                title: "Storytime!",
                description: "You always wanted to start a company that produces toilet paper, it was your childhood dream job. You have found investors who give you the money to start.<br>They give you 5 years to prove to them that your company can survive.<br>Can you do it?"
            }
        );
    }

    checkProductInterest();
    checkUIElements();
    checkGameSpeedButtons();
    renderFarm();

    updateShopDisplay();

    checkEvents();
    
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
                if (MARKETING_DATA.amount * Math.round(MARKETING_DATA.productInteresed / 100) > PLAYER_DATA.tpRolls) {
                    sellTPRoll(PLAYER_DATA.tpRolls);
                } else {
                    sellTPRoll(MARKETING_DATA.amount * Math.round(MARKETING_DATA.productInteresed / 100));
                }
            }
        } else if (PLAYER_DATA.tpRolls - MARKETING_DATA.multiplier >= 0) {
            if (Math.random() * 100 <= MARKETING_DATA.productInteresed) {
                sellTPRoll(PLAYER_DATA.tpRolls);
            }
        }

        if (SHOP_PRODUCTS[1].quantity > 0) {
            createTPRoll(SHOP_PRODUCTS[1].quantity * EQUIPMENT_DATA.multiplier)
        }

        // show popup if the screensize is to small
        if (window.innerWidth < 610 && localStorage.getItem("smallScreenSize") != 1) {
            showEventPopup({
                startDate: null,
                endDate: null,
                img: null,
                effect: "",
                effectClass: "",
                title: "Screen Size too small",
                description: "Your screen width is too small to get the best experience. If you are on a mobile device, try to switch to landscape mode.<br>This is just a tip, you can still play the game on the small screen size."
            })
            localStorage.setItem("smallScreenSize", 1)
        }
            
    }

    setTimeout(updateLoop, 1000 / SETTINGS.daySpeed);
}

// GAME LOOP
// START GAME

window.addEventListener('load', gameStart)
