// GAME SETTINGS
let SETTINGS = {
  theme: "terminal",
  autoSave: "on",
  marketTimer: 0,
  lifecycle: 1000,
  priceIncrease: 1.2,
  equipment: {
    autoMiner: {
      efficiency: 0.1,
      coinAmount: 1
    },
    betterAutoMiner: {
      efficiency: 0.4,
      coinAmount: 1
    },
    highQualityAutoMiner: {
      efficiency: 0.9,
      coinAmount: 1
    }
  },
  stock: {
    timer: 30000,
    maxEntries: 10
  },
  console: {
    maxEntries: 30
  },
  stats: {
    maxInt: 100,
    maxChar: 20
  }
};

// GAME SETTINGS END
// --------------------
// GAME VARIABLE SETUP

let GLOBAL_VALUES = {
  startTimestamp: 0,
  money: 10,
  coins: 1,
  int: 0,
  char: 0
};
let GLOBAL_EQUIPMENT = {
  autoMiner: 0,
  betterAutoMiner: 0,
  highQualityAutoMiner: 0,
  helperSell: {
    inInv: false,
    turnedOn: false,
    sellValue: 100
  },
  helperBuy: {
    inInv: false,
    turnedOn: false,
    buyValue: 100
  }
};
let GLOBAL_PRICES = {
  autoMiner: 100,
  betterAutoMiner: 1000,
  highQualityAutoMiner: 7500,
  helperSell: 1500,
  helperBuy: 1500,
  courseInt: 500,
  courseChar: 500,
  retire: 1000000000
};
let GLOBAL_STOCKDATA = {
  timer: SETTINGS.stock.timer,
  currentBuyValue: 1.05,
  currentSellValue: 1,
  history: []
};

// GAME VARIABLE SETUP END
// --------------------
// GAME INIT

// get dom elements for popup
const elementPopup = document.getElementById("popup");

const elementShowIntHelper = document.getElementById("popup--helper-int--show");
const elementPopupInt = document.getElementById("popup--helper-int");
const elementPopupIntCancel = document.getElementById(
  "popup--helper-int--cancel"
);
const elementShowCharHelper = document.getElementById("popup--helper-char--show");
const elementPopupChar = document.getElementById("popup--helper-char");
const elementPopupCharCancel = document.getElementById(
  "popup--helper-char--cancel"
);

const elementPopupReset = document.getElementById("popup--reset-game");
const elementPopupResetCancle = document.getElementById(
  "popup--reset-game--cancle"
);
const elementPopupResetDelete = document.getElementById(
  "popup--reset-game--delete"
);
const elementPopupSettings = document.getElementById("popup--settings");
const elementPopupSettingsCancle = document.getElementById(
  "popup--settings--cancle"
);
const elementPopupSettingsSave = document.getElementById(
  "popup--settings--save"
);
const elementPopupSettingsSelectedTheme = document.getElementById(
  "popup--settings--selected-theme"
);
const elementPopupSettingsAutoSave = document.getElementById(
  "popup--settings--auto-save"
);
const elementPopupSettingsMarketTimer = document.getElementById(
  "popup--settings--market-timer"
);
const elementPopupRetire = document.getElementById("popup--retire");
const elementPopupRetireRestart = document.getElementById(
  "popup--retire--restart"
);

// get dom elements for header
const elementGameSave = document.getElementById("game--save");
const elementGameReset = document.getElementById("game--reset");
const elementGameSettings = document.getElementById("game--settings");

// get dom elements for info
const elementInfo = document.getElementById("info");
const elementInfoChar = document.getElementById("info--char");
const elementInfoInt = document.getElementById("info--int");
const elementInfoCoins = document.getElementById("info--coins");
const elementInfoMoney = document.getElementById("info--money");

// get dom elements for equipment
const elementEquipment = document.getElementById("equipment");
const elementEquipmentAutoMiner = document.getElementById(
  "equipment--auto-miner"
);
const elementEquipmentBetterAutoMiner = document.getElementById(
  "equipment--better-auto-miner"
);
const elementEquipmentHighQualityAutoMiner = document.getElementById(
  "equipment--highquality-auto-miner"
);

// get dom elements for stock
const elementStock = document.getElementById("stock");
const elementStockTimer = document.getElementById("stock--timer");
const elementStockBuy = document.getElementById("stock--buy");
const elementStockSell = document.getElementById("stock--sell");
const elementStockChart = document.getElementById("stock--chart");

// get dom elements for actions
const elementActions = document.getElementById("actions");
const elementActionSellInput = document.getElementById("action--sell-input");
const elementActionSellCoin = document.getElementById("action--sell-coin");
const elementActionSellAllCoins = document.getElementById("action--sell-all-coins");
const elementActionBuyInput = document.getElementById("action--buy-input");
const elementActionBuyCoin = document.getElementById("action--buy-coin");
const elementActionBuyAllCoins = document.getElementById("action--buy-all-coins");
const elementActionMineCoin = document.getElementById("action--mine-coin");
const elementActionHelperBuyContainer = document.getElementById(
  "action--helper-buy-container"
);
const elementActionHelperBuyInput = document.getElementById(
  "action--helper-buy-input"
);
const elementActionHelperBuy = document.getElementById("action--helper-buy");
const elementActionHelperSellContainer = document.getElementById(
  "action--helper-sell-container"
);
const elementActionHelperSellInput = document.getElementById(
  "action--helper-sell-input"
);
const elementActionHelperSell = document.getElementById("action--helper-sell");

// get dom elements for shop
const elementShop = document.getElementById("shop");
const elementShopAutoMiner = document.getElementById("shop--auto-miner");
const elementShopBetterAutoMiner = document.getElementById(
  "shop--better-auto-miner"
);
const elementShopHighQualityAutoMiner = document.getElementById(
  "shop--highquality-auto-miner"
);
const elementShopAutoMinerSell = document.getElementById(
  "shop--auto-miner-sell"
);
const elementShopBetterAutoMinerSell = document.getElementById(
  "shop--better-auto-miner-sell"
);
const elementShopHighQualityAutoMinerSell = document.getElementById(
  "shop--highquality-auto-miner-sell"
);
let elementShopHelperBuyContainer = document.getElementById(
  "shop--helper-buy-container"
);
const elementShopHelperBuy = document.getElementById("shop--helper-buy");
let elementShopHelperSellContainer = document.getElementById(
  "shop--helper-sell-container"
);
const elementShopHelperSell = document.getElementById("shop--helper-sell");
let elementShopCourseCharContainer = document.getElementById(
  "shop--course-char-container"
);
const elementShopCourseChar = document.getElementById("shop--course-char");
let elementShopCourseIntContainer = document.getElementById(
  "shop--course-int-container"
);
const elementShopCourseInt = document.getElementById("shop--course-int");
const elementShopRetire = document.getElementById("shop--finish-game");
const elementShopRetireContainer = document.getElementById(
  "shop--finish-game--container"
);

// get dom elements for console
const elementConsole = document.getElementById("console");

// predefined functions
// write text to taskbar
// Type - String - possible strings "info", "warning", "error"
// Text - String - Text to be displayed
const writeToConsole = (type, text) => {
  // remove entries if there are to much
  while (elementConsole.children.length >= SETTINGS.console.maxEntries) {
    elementConsole.removeChild(elementConsole.children[0]);
  }

  // create html element
  const paragraph = document.createElement("P");

  // create current timestamp
  const timestamp = new Date(Date.now());

  // set class to type
  paragraph.classList.add(`console--${type.toLowerCase()}`);

  // create content - Date and text
  paragraph.innerHTML = `<span>${timestamp.toLocaleDateString(undefined, {
    year: "numeric"
  })}.${timestamp.toLocaleDateString(undefined, {
    month: "2-digit"
  })}.${timestamp.toLocaleDateString(undefined, {
    day: "2-digit"
  })} ${timestamp.toLocaleTimeString(undefined)} |</span>${text}`;

  // append child to console
  elementConsole.appendChild(paragraph);

  if (
    elementConsole.scrollTop >=
    elementConsole.scrollHeight - elementConsole.clientHeight - 65
  ) {
    // scroll to bottom of console
    elementConsole.scrollTop = elementConsole.scrollHeight;
  }
};

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

// manage money
const addMoney = (amount) => {
  GLOBAL_VALUES.money += amount;
  writeToConsole(
    "info",
    `Money added! Amount: ${formatNumber(amount.toFixed(2))}€`
  );
};
const removeMoney = (amount) => {
  GLOBAL_VALUES.money -= amount;
  writeToConsole(
    "info",
    `Money removed! Amount: ${formatNumber(amount.toFixed(2))}€`
  );
};
const updateMoney = () => {
  elementInfoMoney.innerText =
    formatNumber(GLOBAL_VALUES.money.toFixed(2)) + "€";
};

// manage int
const addInt = (amount) => {
  GLOBAL_VALUES.int += amount;
  writeToConsole("info", `Intelligence increased! Amount: ${amount}`);
};
const removeInt = (amount) => {
  GLOBAL_VALUES.int -= amount;
  writeToConsole("info", `Intelligence decreased! Amount: ${amount}`);
};
const updateInt = () => {
  elementInfoInt.innerText = GLOBAL_VALUES.int;
};

// manage char
const addChar = (amount) => {
  GLOBAL_VALUES.char += amount;
  writeToConsole("info", `Charisma increased! Amount: ${amount}`);
};
const removeChar = (amount) => {
  GLOBAL_VALUES.char -= amount;
  writeToConsole("info", `Charisma decreased! Amount: ${amount}`);
};
const updateChar = () => {
  elementInfoChar.innerText = GLOBAL_VALUES.char;
};

// manage coins
const addCoins = (amount) => {
  GLOBAL_VALUES.coins += amount;
  if (amount === 1) {
    writeToConsole("info", `${amount} Coin earned!`);
  } else {
    writeToConsole("info", `${formatNumber(amount)} Coins earned!`);
  }
};
const removeCoins = (amount) => {
  GLOBAL_VALUES.coins -= amount;
  if (amount === 1) {
    writeToConsole("info", `${amount} Coin sold!`);
  } else {
    writeToConsole("info", `${formatNumber(amount)} Coins sold!`);
  }
};
const updateCoins = () => {
  elementInfoCoins.innerText = formatNumber(GLOBAL_VALUES.coins);
};

// manage autoMiner
const addAutoMiner = (amount) => {
  GLOBAL_EQUIPMENT.autoMiner += amount;
  writeToConsole("info", `Auto Miner added! Amount: ${amount}`);
};
const removeAutoMiner = (amount) => {
  GLOBAL_EQUIPMENT.autoMiner -= amount;
  writeToConsole("info", `Auto Miner removed! Amount: ${amount}`);
};
const updateAutoMiner = () => {
  elementEquipmentAutoMiner.innerText = GLOBAL_EQUIPMENT.autoMiner;
};
const updatePriceTagAutoMiner = () => {
  elementShopAutoMiner.children[0].innerText = formatNumber(
    GLOBAL_PRICES.autoMiner
  );
  elementShopAutoMinerSell.children[0].innerText = formatNumber(
    Math.floor(
      (GLOBAL_PRICES.autoMiner /
        (SETTINGS.priceIncrease - GLOBAL_VALUES.char / 100)) *
        0.9
    )
  );
};

// manage better autoMiner
const addBetterAutoMiner = (amount) => {
  GLOBAL_EQUIPMENT.betterAutoMiner += amount;
  writeToConsole("info", `Better Auto Miner added! Amount: ${amount}`);
};
const removeBetterAutoMiner = (amount) => {
  GLOBAL_EQUIPMENT.betterAutoMiner -= amount;
  writeToConsole("info", `Better Auto Miner removed! Amount: ${amount}`);
};
const updateBetterAutoMiner = () => {
  elementEquipmentBetterAutoMiner.innerText = GLOBAL_EQUIPMENT.betterAutoMiner;
};
const updatePriceTagBetterAutoMiner = () => {
  elementShopBetterAutoMiner.children[0].innerText = formatNumber(
    GLOBAL_PRICES.betterAutoMiner
  );
  elementShopBetterAutoMinerSell.children[0].innerText = formatNumber(
    Math.floor(
      (GLOBAL_PRICES.betterAutoMiner /
        (SETTINGS.priceIncrease - GLOBAL_VALUES.char / 100)) *
        0.9
    )
  );
};

// manage HQ autoMiner
const addHighQualityAutoMiner = (amount) => {
  GLOBAL_EQUIPMENT.highQualityAutoMiner += amount;
  writeToConsole("info", `High Quality Auto Miner added! Amount: ${amount}`);
};
const removeHighQualityAutoMiner = (amount) => {
  GLOBAL_EQUIPMENT.highQualityAutoMiner -= amount;
  writeToConsole("info", `High Quality Auto Miner removed! Amount: ${amount}`);
};
const updateHighQualityAutoMiner = () => {
  elementEquipmentHighQualityAutoMiner.innerText =
    GLOBAL_EQUIPMENT.highQualityAutoMiner;
};
const updatePriceTagHighQualityAutoMiner = () => {
  elementShopHighQualityAutoMiner.children[0].innerText = formatNumber(
    GLOBAL_PRICES.highQualityAutoMiner
  );
  elementShopHighQualityAutoMinerSell.children[0].innerText = formatNumber(
    Math.floor(
      (GLOBAL_PRICES.highQualityAutoMiner /
        (SETTINGS.priceIncrease - GLOBAL_VALUES.char / 100)) *
        0.9
    )
  );
};

const updatePriceTagHelperBuy = () => {
  elementShopHelperBuy.children[0].innerText = formatNumber(
    GLOBAL_PRICES.helperBuy
  );
};
const updatePriceTagHelperSell = () => {
  elementShopHelperSell.children[0].innerText = formatNumber(
    GLOBAL_PRICES.helperSell
  );
};
const updatePriceTagCourseInt = () => {
  elementShopCourseInt.children[0].innerText = formatNumber(
    GLOBAL_PRICES.courseInt
  );
};
const updatePriceTagCourseChar = () => {
  elementShopCourseChar.children[0].innerText = formatNumber(
    GLOBAL_PRICES.courseChar
  );
};
const updatePriceTagRetire = () => {
  elementShopRetire.children[0].innerText = formatNumber(GLOBAL_PRICES.retire);
};

// manage price increase
const increasePrice = (price) => {
  return Math.floor(
    price * (SETTINGS.priceIncrease - GLOBAL_VALUES.char / 100)
  );
};

// mine coin
const mineCoin = (amount, efficiency) => {
  const randomVal = Math.ceil(Math.random() * 10);
  let coins = amount;

  if (GLOBAL_VALUES.int / 10 + randomVal > 1) {
    if (GLOBAL_VALUES.int >= Math.ceil(Math.random() * 10)) {
      coins *= 2;
    }
  }

  if (randomVal <= efficiency * 10) {
    addCoins(Math.round(coins));
  }
};

// sell coins
const sellCoins = () => {
  removeCoins(parseInt(elementActionSellInput.value));
  addMoney(elementActionSellInput.value * GLOBAL_STOCKDATA.currentSellValue);
  elementActionSellInput.value = 0;
};

// buy coins
const buyCoins = () => {
  addCoins(parseInt(elementActionBuyInput.value));
  removeMoney(elementActionBuyInput.value * GLOBAL_STOCKDATA.currentBuyValue);
  elementActionBuyInput.value = 0;
};

// new stock value
const generateStockSellValue = () => {
  while (GLOBAL_STOCKDATA.history.length >= SETTINGS.stock.maxEntries) {
    GLOBAL_STOCKDATA.history.shift();
  }

  const randomVal = Math.ceil(Math.random() * 10);
  let stockPercentage = 0;

  if (GLOBAL_STOCKDATA.currentSellValue < 0.3) {
    switch (true) {
      case randomVal <= 2:
        stockPercentage = Math.ceil(Math.random() * 15);
        break;
      case randomVal <= 4:
        stockPercentage = Math.ceil(Math.random() * 25);
        break;
      case randomVal <= 6:
        stockPercentage = Math.ceil(Math.random() * 35);
        break;
      case randomVal <= 8:
        stockPercentage = Math.ceil(Math.random() * 45);
        break;
      case randomVal === 9:
        stockPercentage = Math.ceil(Math.random() * 55);
        break;
      case randomVal === 10:
        stockPercentage = Math.ceil(Math.random() * 70);
        break;
      default:
        writeToConsole("error", "Stock could not be generated!");
    }
  } else {
    switch (true) {
      case randomVal === 1:
        stockPercentage = Math.ceil(Math.random() * -30);
        break;
      case randomVal === 7:
        stockPercentage = Math.ceil(Math.random() * -15);
        break;
      case randomVal === 5:
        stockPercentage = Math.ceil(Math.random() * -10);
        break;
      case randomVal === 3:
        stockPercentage = Math.ceil(Math.random() * -5);
        break;
      case randomVal === 6:
        stockPercentage = 0;
        break;
      case randomVal === 2:
        stockPercentage = Math.ceil(Math.random() * 5);
        break;
      case randomVal === 8:
        stockPercentage = Math.ceil(Math.random() * 5);
        break;
      case randomVal === 9:
        stockPercentage = Math.ceil(Math.random() * 10);
        break;
      case randomVal === 4:
        stockPercentage = Math.ceil(Math.random() * 15);
        break;
      case randomVal === 10:
        stockPercentage = Math.ceil(Math.random() * 30);
        break;
      default:
        writeToConsole("error", "Stock could not be generated!");
    }
  }

  const stockIncreaseDecrease =
    (GLOBAL_STOCKDATA.currentSellValue / 100) * stockPercentage;
  GLOBAL_STOCKDATA.currentSellValue += stockIncreaseDecrease;
  GLOBAL_STOCKDATA.history.push(GLOBAL_STOCKDATA.currentSellValue);
  GLOBAL_STOCKDATA.currentBuyValue = GLOBAL_STOCKDATA.currentSellValue * 1.05;
};

const updateStockValue = () => {
  let stylingClass = "not-changed";

  if (
    GLOBAL_STOCKDATA.currentSellValue >
    GLOBAL_STOCKDATA.history[GLOBAL_STOCKDATA.history.length - 2]
  ) {
    stylingClass = "positive";
  } else if (
    GLOBAL_STOCKDATA.currentSellValue <
    GLOBAL_STOCKDATA.history[GLOBAL_STOCKDATA.history.length - 2]
  ) {
    stylingClass = "negative";
  }
  elementStockSell.innerText =
    formatNumber(GLOBAL_STOCKDATA.currentSellValue.toFixed(2)) + "€";
  elementStockBuy.innerText =
    formatNumber(GLOBAL_STOCKDATA.currentBuyValue.toFixed(2)) + "€";
  elementStockSell.classList = stylingClass;
};

const updateStockTimer = () => {
  elementStockTimer.innerText = GLOBAL_STOCKDATA.timer / 1000 + "s";
};

const createStockChart = () => {
  const maxValue = Math.max(...GLOBAL_STOCKDATA.history);
  const maxChartValueY = maxValue + maxValue / 2;

  elementStockChart.innerHTML = "";

  if (GLOBAL_STOCKDATA.history.length - 1 <= 0) {
    elementStockChart.innerHTML = `<text x="5%" y="15%">Waiting for more data...</text>`;
  }

  for (let hid = 0; hid < GLOBAL_STOCKDATA.history.length - 1; hid++) {
    elementStockChart.innerHTML += `<line
              x1="${(100 / SETTINGS.stock.maxEntries) * hid}%"
              y1="${
                100 - (100 / maxChartValueY) * GLOBAL_STOCKDATA.history[hid]
              }%"
              x2="${(100 / SETTINGS.stock.maxEntries) * (hid + 1)}%"
              y2="${
                100 - (100 / maxChartValueY) * GLOBAL_STOCKDATA.history[hid + 1]
              }%"
              stroke="lime"
              strokeWidth="5px"
            />`;
  }
};

const helperBuyCoins = () => {
  if (
    GLOBAL_EQUIPMENT.helperBuy.buyValue >= GLOBAL_STOCKDATA.currentBuyValue &&
    Math.floor(GLOBAL_VALUES.money / GLOBAL_STOCKDATA.currentBuyValue) > 0 &&
    GLOBAL_EQUIPMENT.helperBuy.turnedOn
  ) {
    const coins = Math.floor(
      GLOBAL_VALUES.money / GLOBAL_STOCKDATA.currentBuyValue
    );
    addCoins(coins);
    removeMoney(coins * GLOBAL_STOCKDATA.currentBuyValue);
  }
};

const helperSellCoins = () => {
  if (
    GLOBAL_EQUIPMENT.helperSell.sellValue <=
      GLOBAL_STOCKDATA.currentSellValue &&
    GLOBAL_VALUES.coins > 0 &&
    GLOBAL_EQUIPMENT.helperSell.turnedOn
  ) {
    addMoney(GLOBAL_VALUES.coins * GLOBAL_STOCKDATA.currentSellValue);
    removeCoins(GLOBAL_VALUES.coins);
  }
};

const saveGame = (silent) => {
  localStorage.setItem("GLOBAL_VALUES", JSON.stringify(GLOBAL_VALUES));
  localStorage.setItem("GLOBAL_EQUIPMENT", JSON.stringify(GLOBAL_EQUIPMENT));
  localStorage.setItem("GLOBAL_PRICES", JSON.stringify(GLOBAL_PRICES));
  localStorage.setItem("GLOBAL_STOCKDATA", JSON.stringify(GLOBAL_STOCKDATA));
  if (!silent) {
    writeToConsole("success", "Game saved!");
  }
};

const resetGame = () => {
  localStorage.removeItem("GLOBAL_VALUES");
  localStorage.removeItem("GLOBAL_EQUIPMENT");
  localStorage.removeItem("GLOBAL_PRICES");
  localStorage.removeItem("GLOBAL_STOCKDATA");
  localStorage.removeItem("SETTINGS");
  writeToConsole("success", "Game reseted!");
  window.location.reload();
};

const loadGame = () => {
  GLOBAL_VALUES = JSON.parse(localStorage.getItem("GLOBAL_VALUES"));
  GLOBAL_EQUIPMENT = JSON.parse(localStorage.getItem("GLOBAL_EQUIPMENT"));
  GLOBAL_PRICES = JSON.parse(localStorage.getItem("GLOBAL_PRICES"));
  GLOBAL_STOCKDATA = JSON.parse(localStorage.getItem("GLOBAL_STOCKDATA"));

  writeToConsole("success", "Game loaded successfully!");
};

// GAME INIT END
// --------------------
// GAME EVENTLISTENERS

elementShowIntHelper.addEventListener("click", () => {
  elementPopupInt.classList = "show";
  elementPopup.classList = "show";
});
elementPopupIntCancel.addEventListener("click", () => {
  elementPopupInt.classList = "";
  elementPopup.classList = "";
});
elementShowCharHelper.addEventListener("click", () => {
  elementPopupChar.classList = "show";
  elementPopup.classList = "show";
});
elementPopupCharCancel.addEventListener("click", () => {
  elementPopupChar.classList = "";
  elementPopup.classList = "";
});
elementPopupResetCancle.addEventListener("click", () => {
  elementPopupReset.classList = "";
  elementPopup.classList = "";
});
elementPopupResetDelete.addEventListener("click", () => {
  elementPopupReset.classList = "";
  elementPopup.classList = "";
  resetGame();
});
elementGameReset.addEventListener("click", () => {
  elementPopupReset.classList = "show";
  elementPopup.classList = "show";
});
elementGameSave.addEventListener("click", () => saveGame(false));

elementPopupSettingsCancle.addEventListener("click", () => {
  elementPopupSettings.classList = "";
  elementPopup.classList = "";
});
elementPopupSettingsSave.addEventListener("click", () => {
  elementPopupSettings.classList = "";
  elementPopup.classList = "";
  const tempSettings = { theme: elementPopupSettingsSelectedTheme.value, autoSave: elementPopupSettingsAutoSave.value, marketTimer: elementPopupSettingsMarketTimer.value};
  localStorage.setItem("SETTINGS", JSON.stringify(tempSettings));
  saveGame(true);
  window.location.reload();
});
elementGameSettings.addEventListener("click", () => {
  elementPopupSettings.classList = "show";
  elementPopup.classList = "show";
  let tempSettings = {
    theme: "terminal",
    autoSave: "on",
    marketTimer: 0
  };
  if (localStorage.getItem("SETTINGS") !== null) {
    if (JSON.parse(localStorage.getItem("SETTINGS")).theme === null) {
      tempSettings.theme = "terminal"
    } else {
      tempSettings.theme = JSON.parse(localStorage.getItem("SETTINGS")).theme
    }

    if (JSON.parse(localStorage.getItem("SETTINGS")).autoSave === null) {
      tempSettings.autoSave = "on"
    } else {
      tempSettings.autoSave = JSON.parse(localStorage.getItem("SETTINGS")).autoSave
    }

    if (JSON.parse(localStorage.getItem("SETTINGS")).marketTimer === null) {
      tempSettings.marketTimer = 0
    } else {
      tempSettings.marketTimer = JSON.parse(localStorage.getItem("SETTINGS")).marketTimer
    }
  }
  
  if (SETTINGS.autoSave === "on") {
    if (!elementGameSave.classList.contains("hide")) {
      elementGameSave.classList.add("hide");
    }
  } else {
    if (elementGameSave.classList.contains("hide")) {
      elementGameSave.classList.remove("hide");
    }
  }

  SETTINGS.theme = tempSettings.theme;
  SETTINGS.autoSave = tempSettings.autoSave;
  SETTINGS.marketTimer = tempSettings.marketTimer;
  elementPopupSettingsSelectedTheme.value = SETTINGS.theme;
  elementPopupSettingsAutoSave.value = SETTINGS.autoSave;
  elementPopupSettingsMarketTimer.value = SETTINGS.marketTimer;
});

elementActionMineCoin.addEventListener("click", () => mineCoin(1, 0.2));
elementShopAutoMiner.addEventListener("click", () => {
  if (checkAvailableMoney(GLOBAL_PRICES.autoMiner)) {
    addAutoMiner(1);
    removeMoney(GLOBAL_PRICES.autoMiner);
    GLOBAL_PRICES.autoMiner = increasePrice(GLOBAL_PRICES.autoMiner);
  }
});
elementShopAutoMinerSell.addEventListener("click", () => {
  if (GLOBAL_EQUIPMENT.autoMiner > 0) {
    removeAutoMiner(1);
    addMoney(GLOBAL_PRICES.autoMiner * 0.9);
  }
});
elementShopBetterAutoMiner.addEventListener("click", () => {
  if (checkAvailableMoney(GLOBAL_PRICES.betterAutoMiner)) {
    addBetterAutoMiner(1);
    removeMoney(GLOBAL_PRICES.betterAutoMiner);
    GLOBAL_PRICES.betterAutoMiner = increasePrice(
      GLOBAL_PRICES.betterAutoMiner
    );
  }
});
elementShopBetterAutoMinerSell.addEventListener("click", () => {
  if (GLOBAL_EQUIPMENT.betterAutoMiner > 0) {
    removeBetterAutoMiner(1);
    addMoney(GLOBAL_PRICES.betterAutoMiner * 0.9);
  }
});
elementShopHighQualityAutoMiner.addEventListener("click", () => {
  if (checkAvailableMoney(GLOBAL_PRICES.highQualityAutoMiner)) {
    addHighQualityAutoMiner(1);
    removeMoney(GLOBAL_PRICES.highQualityAutoMiner);
    GLOBAL_PRICES.highQualityAutoMiner = increasePrice(
      GLOBAL_PRICES.highQualityAutoMiner
    );
  }
});
elementShopHighQualityAutoMinerSell.addEventListener("click", () => {
  if (GLOBAL_EQUIPMENT.highQualityAutoMiner > 0) {
    removeHighQualityAutoMiner(1);
    addMoney(GLOBAL_PRICES.highQualityAutoMiner * 0.9);
  }
});
elementActionSellInput.addEventListener("input", (e) => {
  if (e.target.value > GLOBAL_VALUES.coins) {
    e.target.value = GLOBAL_VALUES.coins;
  }

  if (
    (isNaN(parseInt(e.target.value)) && !elementActionSellCoin.disabled) ||
    (GLOBAL_VALUES.coins === 0 && !elementActionSellCoin.disabled)
  ) {
    elementActionSellCoin.disabled = true;
  } else if (
    (!isNaN(parseInt(e.target.value)) && elementActionSellCoin.disabled) ||
    (GLOBAL_VALUES.coins > 0 && elementActionSellCoin.disabled)
  ) {
    elementActionSellCoin.disabled = false;
  }

  e.target.value = Math.round(e.target.value);
});
elementActionSellCoin.addEventListener("click", () => sellCoins());
elementActionBuyInput.addEventListener("input", (e) => {
  if (e.target.value * GLOBAL_STOCKDATA.currentBuyValue > GLOBAL_VALUES.money) {
    e.target.value = Math.floor(
      GLOBAL_VALUES.money / GLOBAL_STOCKDATA.currentBuyValue
    );
  }

  if (
    (isNaN(parseInt(e.target.value)) && !elementActionBuyCoin.disabled) ||
    (GLOBAL_VALUES.money < GLOBAL_STOCKDATA.currentBuyValue &&
      !elementActionBuyCoin.disabled)
  ) {
    elementActionBuyCoin.disabled = true;
  } else if (
    (!isNaN(parseInt(e.target.value)) && elementActionBuyCoin.disabled) ||
    (GLOBAL_VALUES.money < GLOBAL_STOCKDATA.currentBuyValue &&
      elementActionBuyCoin.disabled)
  ) {
    elementActionBuyCoin.disabled = false;
  }

  e.target.value = Math.round(e.target.value);
});
elementActionBuyCoin.addEventListener("click", () => {
  if (
    checkAvailableMoney(
      GLOBAL_STOCKDATA.currentBuyValue * parseInt(elementActionBuyInput.value)
    )
  ) {
    buyCoins();
  }
});
elementActionBuyAllCoins.addEventListener("click", () => {
  let buyValueTemp = GLOBAL_STOCKDATA.currentBuyValue
  let coinsBought = Math.floor(GLOBAL_VALUES.money / buyValueTemp);
  removeMoney(coinsBought * buyValueTemp);
  addCoins(coinsBought);
});
elementActionSellAllCoins.addEventListener("click", () => {
  let sellValueTemp = GLOBAL_STOCKDATA.currentSellValue
  addMoney(GLOBAL_VALUES.coins * sellValueTemp)
  removeCoins(GLOBAL_VALUES.coins);
});
elementShopHelperBuy.addEventListener("click", () => {
  if (checkAvailableMoney(GLOBAL_PRICES.helperBuy)) {
    GLOBAL_EQUIPMENT.helperBuy.inInv = true;
    removeMoney(GLOBAL_PRICES.helperBuy);
    elementShop.removeChild(elementShopHelperBuyContainer);
    elementActionHelperBuyContainer.classList.remove("hidden");
    
    elementShopHelperBuyContainer = null;
  }
});
elementShopHelperSell.addEventListener("click", () => {
  if (checkAvailableMoney(GLOBAL_PRICES.helperSell)) {
    GLOBAL_EQUIPMENT.helperSell.inInv = true;
    removeMoney(GLOBAL_PRICES.helperSell);
    elementShop.removeChild(elementShopHelperSellContainer);
    elementActionHelperSellContainer.classList.remove("hidden");

    elementShopHelperSellContainer = null;
  }
});
elementShopCourseChar.addEventListener("click", () => {
  if (
    checkAvailableMoney(GLOBAL_PRICES.courseChar) &&
    GLOBAL_VALUES.char < SETTINGS.stats.maxChar
  ) {
    removeMoney(GLOBAL_PRICES.courseChar);

    if (Math.ceil(Math.random() * 10) <= 6) {
      writeToConsole("info", "You learned something new!");
      addChar(1);
    } else {
      writeToConsole("info", "Didn't learned anything new in this course!");
    }
    GLOBAL_PRICES.courseChar = increasePrice(GLOBAL_PRICES.courseChar);

  }
});
elementShopCourseInt.addEventListener("click", () => {
  if (
    checkAvailableMoney(GLOBAL_PRICES.courseInt) &&
    GLOBAL_VALUES.int < SETTINGS.stats.maxInt
  ) {
    removeMoney(GLOBAL_PRICES.courseInt);

    if (Math.ceil(Math.random() * 10) <= 6) {
      writeToConsole("info", "You learned something new!");
      addInt(1);
    } else {
      writeToConsole("info", "Didn't learned anything new in this course!");
    }

    GLOBAL_PRICES.courseInt = increasePrice(GLOBAL_PRICES.courseInt);

  }
});
elementActionHelperBuyInput.addEventListener("input", (e) => {
  GLOBAL_EQUIPMENT.helperBuy.buyValue = parseFloat(e.target.value);
  if (
    isNaN(GLOBAL_EQUIPMENT.helperBuy.buyValue) &&
    !elementActionHelperBuy.disabled &&
    !GLOBAL_EQUIPMENT.helperBuy.turnedOn
  ) {
    elementActionHelperBuy.disabled = true;
  } else if (
    !isNaN(GLOBAL_EQUIPMENT.helperBuy.buyValue) &&
    elementActionHelperBuy.disabled
  ) {
    elementActionHelperBuy.disabled = false;
  }
});
elementActionHelperSellInput.addEventListener("input", (e) => {
  GLOBAL_EQUIPMENT.helperSell.sellValue = parseFloat(e.target.value);
  if (
    isNaN(GLOBAL_EQUIPMENT.helperSell.sellValue) &&
    !elementActionHelperSell.disabled &&
    !GLOBAL_EQUIPMENT.helperSell.turnedOn
  ) {
    elementActionHelperSell.disabled = true;
  } else if (
    !isNaN(GLOBAL_EQUIPMENT.helperSell.sellValue) &&
    elementActionHelperSell.disabled
  ) {
    elementActionHelperSell.disabled = false;
  }
});
elementActionHelperBuy.addEventListener("click", () => {
  if (GLOBAL_EQUIPMENT.helperBuy.turnedOn) {
    GLOBAL_EQUIPMENT.helperBuy.turnedOn = false;
    elementActionHelperBuy.innerText = "Turn On";
  } else {
    GLOBAL_EQUIPMENT.helperBuy.turnedOn = true;
    elementActionHelperBuy.innerText = "Turn Off";
  }
});
elementActionHelperSell.addEventListener("click", () => {
  if (GLOBAL_EQUIPMENT.helperSell.turnedOn) {
    GLOBAL_EQUIPMENT.helperSell.turnedOn = false;
    elementActionHelperSell.innerText = "Turn On";
  } else {
    GLOBAL_EQUIPMENT.helperSell.turnedOn = true;
    elementActionHelperSell.innerText = "Turn Off";
  }
});
elementShopRetire.addEventListener("click", () => {
  elementPopupRetire.classList = "show";
  elementPopup.classList = "show";
});
elementPopupRetireRestart.addEventListener("click", () => {
  elementPopupRetire.classList = "";
  elementPopup.classList = "";
  resetGame();
});

// GAME EVENTLISTENERS END
// --------------------
// GAME CHECKS

const checkAvailableMoney = (costs) => {
  if (GLOBAL_VALUES.money >= costs) {
    return true;
  } else {
    return false;
  }
};

const checkAutoMiners = () => {
  let globalCoins = 0;

  if (GLOBAL_EQUIPMENT.autoMiner > 0) {
    let efficiency =
      GLOBAL_EQUIPMENT.autoMiner *
      (SETTINGS.equipment.autoMiner.efficiency + GLOBAL_VALUES.int / 10);
    let coin = 0;
    const randNumber = Math.random();

    if (randNumber <= efficiency) {
      coin = Math.ceil(efficiency)
    }

    globalCoins += Math.round(coin);
  }

  if (GLOBAL_EQUIPMENT.betterAutoMiner > 0) {
    let efficiency =
      GLOBAL_EQUIPMENT.betterAutoMiner *
      (SETTINGS.equipment.betterAutoMiner.efficiency + GLOBAL_VALUES.int / 10);
    let coin = 0;
    const randNumber = Math.random();

    if (randNumber <= efficiency) {
      coin = Math.ceil(efficiency)
    }

    globalCoins += Math.round(coin);
  }
  if (GLOBAL_EQUIPMENT.highQualityAutoMiner > 0) {
    let efficiency =
      GLOBAL_EQUIPMENT.highQualityAutoMiner *
      (SETTINGS.equipment.highQualityAutoMiner.efficiency + GLOBAL_VALUES.int / 10);
    let coin = 0;
    const randNumber = Math.random();

    if (randNumber <= efficiency) {
      coin = Math.ceil(efficiency)
    }

    globalCoins += Math.round(coin);
  }

  if (globalCoins > 0) addCoins(globalCoins);
};

const checkCoins = () => {
  elementActionSellInput.max = GLOBAL_VALUES.coins;
};

const checkTimerStockChange = () => {
  if (GLOBAL_STOCKDATA.timer === 0) {
    helperBuyCoins();
    helperSellCoins();

    generateStockSellValue();
    updateStockValue();
    createStockChart();

    GLOBAL_STOCKDATA.timer = SETTINGS.stock.timer - (SETTINGS.marketTimer * 1000);
  } else {
    GLOBAL_STOCKDATA.timer -= SETTINGS.lifecycle;
  }
};

const checkShopPrices = () => {
  // auto miner
  if (
    GLOBAL_VALUES.money < GLOBAL_PRICES.autoMiner &&
    elementShopAutoMiner.disabled === false
  ) {
    elementShopAutoMiner.disabled = true;
  } else if (
    GLOBAL_VALUES.money >= GLOBAL_PRICES.autoMiner &&
    elementShopAutoMiner.disabled
  ) {
    elementShopAutoMiner.disabled = false;
  }
  if (
    GLOBAL_EQUIPMENT.autoMiner === 0 &&
    elementShopAutoMinerSell.disabled === false
  ) {
    elementShopAutoMinerSell.disabled = true;
  } else if (
    GLOBAL_EQUIPMENT.autoMiner > 0 &&
    elementShopAutoMinerSell.disabled
  ) {
    elementShopAutoMinerSell.disabled = false;
  }
  // better auto miner
  if (
    GLOBAL_VALUES.money < GLOBAL_PRICES.betterAutoMiner &&
    elementShopBetterAutoMiner.disabled === false
  ) {
    elementShopBetterAutoMiner.disabled = true;
  } else if (
    GLOBAL_VALUES.money >= GLOBAL_PRICES.betterAutoMiner &&
    elementShopBetterAutoMiner.disabled
  ) {
    elementShopBetterAutoMiner.disabled = false;
  }
  if (
    GLOBAL_EQUIPMENT.betterAutoMiner === 0 &&
    elementShopBetterAutoMinerSell.disabled === false
  ) {
    elementShopBetterAutoMinerSell.disabled = true;
  } else if (
    GLOBAL_EQUIPMENT.betterAutoMiner > 0 &&
    elementShopBetterAutoMinerSell.disabled
  ) {
    elementShopBetterAutoMinerSell.disabled = false;
  }
  // high quality auto miner
  if (
    GLOBAL_VALUES.money < GLOBAL_PRICES.highQualityAutoMiner &&
    elementShopHighQualityAutoMiner.disabled === false
  ) {
    elementShopHighQualityAutoMiner.disabled = true;
  } else if (
    GLOBAL_VALUES.money >= GLOBAL_PRICES.highQualityAutoMiner &&
    elementShopHighQualityAutoMiner.disabled
  ) {
    elementShopHighQualityAutoMiner.disabled = false;
  }
  if (
    GLOBAL_EQUIPMENT.highQualityAutoMiner === 0 &&
    elementShopHighQualityAutoMinerSell.disabled === false
  ) {
    elementShopHighQualityAutoMinerSell.disabled = true;
  } else if (
    GLOBAL_EQUIPMENT.highQualityAutoMiner > 0 &&
    elementShopHighQualityAutoMinerSell.disabled
  ) {
    elementShopHighQualityAutoMinerSell.disabled = false;
  }
  // stock helper sell
  if (
    GLOBAL_VALUES.money < GLOBAL_PRICES.helperSell &&
    elementShopHelperSell.disabled === false
  ) {
    elementShopHelperSell.disabled = true;
  } else if (
    GLOBAL_VALUES.money >= GLOBAL_PRICES.helperSell &&
    elementShopHelperSell.disabled
  ) {
    elementShopHelperSell.disabled = false;
  }
  // stock helper buy
  if (
    GLOBAL_VALUES.money < GLOBAL_PRICES.helperBuy &&
    elementShopHelperBuy.disabled === false
  ) {
    elementShopHelperBuy.disabled = true;
  } else if (
    GLOBAL_VALUES.money >= GLOBAL_PRICES.helperBuy &&
    elementShopHelperBuy.disabled
  ) {
    elementShopHelperBuy.disabled = false;
  }
  // course int
  if (
    GLOBAL_VALUES.money < GLOBAL_PRICES.courseInt &&
    elementShopCourseInt.disabled === false
  ) {
    elementShopCourseInt.disabled = true;
  } else if (
    GLOBAL_VALUES.money >= GLOBAL_PRICES.courseInt &&
    elementShopCourseInt.disabled
  ) {
    elementShopCourseInt.disabled = false;
  }
  // course char
  if (
    GLOBAL_VALUES.money < GLOBAL_PRICES.courseChar &&
    elementShopCourseChar.disabled === false
  ) {
    elementShopCourseChar.disabled = true;
  } else if (
    GLOBAL_VALUES.money >= GLOBAL_PRICES.courseChar &&
    elementShopCourseChar.disabled
  ) {
    elementShopCourseChar.disabled = false;
  }
  // retire
  if (
    (GLOBAL_VALUES.money < GLOBAL_PRICES.retire &&
      elementShopRetire.disabled === false) ||
    (GLOBAL_VALUES.int < SETTINGS.stats.maxInt &&
      elementShopRetire.disabled === false) ||
    (GLOBAL_VALUES.char < SETTINGS.stats.maxChar &&
      elementShopRetire.disabled === false)
  ) {
    elementShopRetire.disabled = true;
  } else if (
    GLOBAL_VALUES.money >= GLOBAL_PRICES.retire &&
    elementShopRetire.disabled &&
    GLOBAL_VALUES.int >= SETTINGS.stats.maxInt &&
    GLOBAL_VALUES.char >= SETTINGS.stats.maxChar
  ) {
    elementShopRetire.disabled = false;
  }

  if (
    GLOBAL_VALUES.int >= SETTINGS.stats.maxInt &&
    elementShopCourseIntContainer !== null
  ) {
    elementShop.removeChild(elementShopCourseIntContainer);
    elementShopCourseIntContainer = null;
  }
  if (
    GLOBAL_VALUES.char >= SETTINGS.stats.maxChar &&
    elementShopCourseCharContainer !== null
  ) {
    elementShop.removeChild(elementShopCourseCharContainer);
    elementShopCourseCharContainer = null;
  }
};

const checkSaveGame = () => {
  if (
    localStorage.getItem("GLOBAL_VALUES") !== null &&
    localStorage.getItem("GLOBAL_EQUIPMENT") !== null &&
    localStorage.getItem("GLOBAL_PRICES") !== null &&
    localStorage.getItem("GLOBAL_STOCKDATA") !== null
  ) {
    writeToConsole("info", "Found saved game! Trying to load data...");
    return true;
  } else if (
    localStorage.getItem("GLOBAL_VALUES") !== null ||
    localStorage.getItem("GLOBAL_EQUIPMENT") !== null ||
    localStorage.getItem("GLOBAL_PRICES") !== null ||
    localStorage.getItem("GLOBAL_STOCKDATA") !== null
  ) {
    writeToConsole(
      "error",
      "Saved game is corrupted! A new game will be loaded!"
    );
    return false;
  } else {
    writeToConsole("info", "No saved game found. A new game will be loaded!");
    return false;
  }
};

const checkHelperSell = () => {
  if (GLOBAL_EQUIPMENT.helperSell.inInv) {
    elementShop.removeChild(elementShopHelperSellContainer);
    elementActionHelperSellContainer.classList.remove("hidden");
    elementActionHelperSellInput.value = GLOBAL_EQUIPMENT.helperSell.sellValue;
    if (
      isNaN(GLOBAL_EQUIPMENT.helperSell.sellValue) &&
      !elementActionHelperSell.disabled &&
      !GLOBAL_EQUIPMENT.helperSell.turnedOn
    ) {
      elementActionHelperSell.disabled = true;
    } else if (
      !isNaN(GLOBAL_EQUIPMENT.helperSell.sellValue) &&
      elementActionHelperSell.disabled
    ) {
      elementActionHelperSell.disabled = false;
    }

    if (GLOBAL_EQUIPMENT.helperSell.turnedOn) {
      GLOBAL_EQUIPMENT.helperSell.turnedOn = false;
      elementActionHelperSell.innerText = "Turn On";
    } else {
      GLOBAL_EQUIPMENT.helperSell.turnedOn = true;
      elementActionHelperSell.innerText = "Turn Off";
    }
  }
};
const checkHelperBuy = () => {
  if (GLOBAL_EQUIPMENT.helperBuy.inInv) {
    elementShop.removeChild(elementShopHelperBuyContainer);
    elementActionHelperBuyContainer.classList.remove("hidden");
    elementActionHelperBuyInput.value = GLOBAL_EQUIPMENT.helperBuy.buyValue;
    if (
      isNaN(GLOBAL_EQUIPMENT.helperBuy.buyValue) &&
      !elementActionHelperBuy.disabled &&
      !GLOBAL_EQUIPMENT.helperBuy.turnedOn
    ) {
      elementActionHelperBuy.disabled = true;
    } else if (
      !isNaN(GLOBAL_EQUIPMENT.helperBuy.buyValue) &&
      elementActionHelperBuy.disabled
    ) {
      elementActionHelperBuy.disabled = false;
    }

    if (GLOBAL_EQUIPMENT.helperBuy.turnedOn) {
      GLOBAL_EQUIPMENT.helperBuy.turnedOn = false;
      elementActionHelperBuy.innerText = "Turn On";
    } else {
      GLOBAL_EQUIPMENT.helperBuy.turnedOn = true;
      elementActionHelperBuy.innerText = "Turn Off";
    }
  }
};

// GAME CHECKS END
// --------------------
// GAME LOGIC

const startup = () => {
  // STARTUP STARTED

  // check if savefile is available and load it
  if (checkSaveGame()) {
    // load data
    loadGame();
    checkHelperBuy();
    checkHelperSell();
    if (localStorage.getItem("SETTINGS") !== null) {
      if (localStorage.getItem("SETTINGS").theme !== null) {
        SETTINGS.theme =
          JSON.parse(localStorage.getItem("SETTINGS")).theme;
      }
      if (localStorage.getItem("SETTINGS").autoSave !== null) {
        SETTINGS.autoSave =
          JSON.parse(localStorage.getItem("SETTINGS")).autoSave;
      }
      if (localStorage.getItem("SETTINGS").marketTimer !== null) {
        SETTINGS.marketTimer =
          JSON.parse(localStorage.getItem("SETTINGS")).marketTimer;
      }
    }

    if (SETTINGS.autoSave !== "off") {
      if (!elementGameSave.classList.contains("hide")) {
        elementGameSave.classList.add("hide");
      }
    }
  } else {
    // setup new data
    GLOBAL_VALUES.startTimestamp = Date.now();
  }

  // set initial screen values
  updateStockValue();
  createStockChart();
  updateStockTimer();
  writeToConsole("info", "Game started!");

  // STARTUP ENDED
  setInterval(() => updateLoop(), SETTINGS.lifecycle);
};

const updateLoop = () => {
  // UPDATE STARTED

  checkShopPrices();
  checkCoins();
  checkAutoMiners();

  checkTimerStockChange();
  updateStockTimer();

  updateCoins();
  updateInt();
  updateChar();
  updateMoney();

  updateAutoMiner();
  updatePriceTagAutoMiner();
  updateBetterAutoMiner();
  updatePriceTagBetterAutoMiner();
  updateHighQualityAutoMiner();
  updatePriceTagHighQualityAutoMiner();
  updatePriceTagHelperBuy();
  updatePriceTagHelperSell();
  updatePriceTagCourseInt();
  updatePriceTagCourseChar();
  updatePriceTagRetire();

  if (SETTINGS.autoSave === "on") {
    saveGame(true);
  }
  // UPDATE ENDED
};

// GAME Logic END
// ---------------------
// Start Game
startup();
