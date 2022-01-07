// SETUP VARIABLES

const DATETIME = {
    date: new Date(2020, 7, 21, 0, 0, 0, 0),
    time: 120,
    maxSecondsPerDay: 120
}

const IDEAL_PRICE_PER_ROLL = 0.84;
let PRICE_PER_ROLL = 1;

let SETTINGS = {
    daySpeed: 1,
    maxDaySpeed: 4
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
    globalTPRolls: 10000,
    tpRolls: 0,
    money: 10000,
    rollsFromTree: 1600
}

const SHOP_PRODUCTS = [
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
        price: 2000.00,
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
        price: 500.00,
        icon: ""
    },
    {
        id: 14,
        isVisible: 10000,
        maxQuantity: 1,
        quantity: 0,
        name: "Toilet Paper Multi Pack 8",
        description: "Sell 8 toilet paper rolls in a pack to get more sales.",
        price: 1000.00,
        icon: ""
    },
    {
        id: 15,
        isVisible: 20000,
        maxQuantity: 1,
        quantity: 0,
        name: "Toilet Paper Multi Pack 12",
        description: "Sell 12 toilet paper rolls in a pack to get more sales.",
        price: 1000.00,
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

const displayTPRollContainer = document.getElementById("display--tp-roll--container");
const displayPricePerRoll = document.getElementById("display--price--per-roll");
const displayMoney = document.getElementById("status--money");
const displayRolls = document.getElementById("status--rolls-available");
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

const vcInventory = document.getElementById("vc--inventory");
const vcFarm = document.getElementById("vc--farm");
const vcShop = document.getElementById("vc--shop");

// GET DOM ELEMENTS
// SETUP FUNCTIONS

const readableDateString = date => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

const updateGameTime = () => {
    DATETIME.time -= 1;

    if (DATETIME.time <= 0) {
        SHOP_PRODUCTS[0].price = returnNewTreePrice();
        DATETIME.date.setDate(DATETIME.date.getDate() + 1);
        DATETIME.time = DATETIME.maxSecondsPerDay;
        displayGameDate.innerText = readableDateString(DATETIME.date);
        updateShopDisplay();
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

// SETUP FUNCTIONS
// CHECKER FUNCTIONS

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
        default:
            return true;
    }
}

const checkUIElements = () => {
    displayGameDate.innerText = readableDateString(DATETIME.date);
    displayGameSpeed.innerText = `x${SETTINGS.daySpeed}`; 
    displayMoney.innerText = `${PLAYER_DATA.money}$`;
    displayRolls.innerText = `${PLAYER_DATA.tpRolls}`;
    displayProductInterest.innerText = `${MARKETING_DATA.productInteresed}%`;
    displayTotalRolls.innerText = `${PLAYER_DATA.globalTPRolls}`;
    displayStorageTrees.innerText = `${Math.ceil(PLAYER_DATA.rollsFromTree / calcMaxRollsFromTree())}/${calcTreeStorageTotal()}`;
    displayPossibleRolls.innerText = `${PLAYER_DATA.rollsFromTree}`;
    displayStorageTP.innerText = `${PLAYER_DATA.tpRolls}/${calcTPStorageTotal()}`;
    displayFactoriesQuantity.innerText = `${SHOP_PRODUCTS[1].quantity}`;
    displayFactoriesEfficiency.innerText = `${EQUIPMENT_DATA.multiplier}`;
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

buttonShowInventory.addEventListener("click", () => {
    buttonShowInventory.classList.add("active");
    buttonShowFarm.classList = "";
    buttonShowShop.classList = "";

    vcInventory.classList.add("active");
    vcFarm.classList = "";
    vcShop.classList = "";
})

buttonShowFarm.addEventListener("click", () => {
    buttonShowFarm.classList.add("active");
    buttonShowInventory.classList = "";
    buttonShowShop.classList = "";

    vcFarm.classList.add("active");
    vcInventory.classList = "";
    vcShop.classList = "";
})

buttonShowShop.addEventListener("click", () => {
    buttonShowShop.classList.add("active");
    buttonShowFarm.classList = "";
    buttonShowInventory.classList = "";

    vcShop.classList.add("active");
    vcFarm.classList = "";
    vcInventory.classList = "";
})

// EVENTLISTENERS
// GAME STARTUP

const gameStart = () => {

    displayPricePerRoll.innerText = `${PRICE_PER_ROLL}$`;
    checkProductInterest();
    checkUIElements();
    checkGameSpeedButtons()

    updateShopDisplay();

    console.log("Game started!");
    setTimeout(updateLoop, 1000);
    setInterval(updateShopDisplay, 1000);
}

// GAME STARTUP
// GAME LOOP

const updateLoop = () => {
    updateGameTime();

    checkUIElements();
    checkGameSpeedButtons()

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
    setTimeout(updateLoop, 1000 / SETTINGS.daySpeed);
}

// GAME LOOP
// START GAME

gameStart()