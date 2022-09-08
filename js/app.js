(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".score")) document.querySelectorAll(".score").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 2500);
        if (document.querySelector(".score")) document.querySelectorAll(".score").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    const window_width = document.documentElement.clientWidth;
    const window_height = document.documentElement.clientHeight;
    let audio_main, audio_hit, audio_destroy, audio_shoot;
    if (document.querySelector(".main")) {
        audio_main = document.querySelector(".audio_main");
        audio_main.preload = "auto";
        audio_main.volume = [ .1 ];
    } else if (document.querySelector(".game")) {
        audio_main = document.querySelector(".audio_main");
        audio_hit = document.querySelector(".audio_hit");
        audio_destroy = document.querySelector(".audio_destroy");
        audio_shoot = document.querySelector(".audio_shoot");
        audio_main.preload = "auto";
        audio_hit.preload = "auto";
        audio_destroy.preload = "auto";
        audio_shoot.preload = "auto";
        audio_main.volume = [ .1 ];
        audio_hit.volume = [ .5 ];
        audio_destroy.volume = [ .5 ];
        audio_shoot.volume = [ .5 ];
    }
    function playStopBgMusic(status) {
        if (status) audio_main.play(); else audio_main.pause();
    }
    function playShoot() {
        if ("on" == sessionStorage.getItem("sound")) {
            audio_shoot.currentTime = 0;
            audio_shoot.play();
        }
    }
    function playHit() {
        if ("on" == sessionStorage.getItem("sound")) {
            audio_hit.currentTime = 0;
            audio_hit.play();
        }
    }
    function playDestroy() {
        if ("on" == sessionStorage.getItem("sound")) audio_destroy.play();
    }
    function deleteMoney(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1900);
    }
    function noMoney(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1400);
    }
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function addMoney(count, block, delay, delay_off) {
        let money = Math.floor(+sessionStorage.getItem("money") + count);
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    function saveArrStorrage(arr, name) {
        sessionStorage.setItem(name, JSON.stringify(arr));
    }
    function addNumberStorrage(name, number) {
        let arr = getArrStorrage(name);
        arr.push(number);
        saveArrStorrage(arr, name);
    }
    function getArrStorrage(name) {
        let arr = JSON.parse(sessionStorage.getItem(name));
        let numbers = arr;
        numbers.sort((function(a, b) {
            return a - b;
        }));
        return numbers;
    }
    function getVibration(val) {
        if ("on" == sessionStorage.getItem("vibro")) window.navigator.vibrate(val);
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function getRandomAnimate() {
        let number = getRandom(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = getRandom(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        getRandomAnimate();
    }), 2e4);
    const prices = {
        weapon_2: 1200,
        weapon_3: 3500,
        weapon_4: 4500,
        pwr_1: 200,
        pwr_2: 250,
        pwr_3: 350,
        pwr_4: 500,
        ammo_1: 10,
        ammo_2: 15,
        ammo_3: 20,
        ammo_4: 25
    };
    const weapon_params = {
        pwr_1: 16,
        pwr_2: 23,
        pwr_3: 30,
        pwr_4: 40,
        ammo_1: 18,
        ammo_2: 14,
        ammo_3: 12,
        ammo_4: 10
    };
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
        document.querySelector(".main__body").classList.add("_active");
        drawPrices();
        writeStartSettings();
        writeCurrentSettings();
        writeStartWeapons();
        chekBoughtWeapons();
        checkCurrentWeapon();
        writeStartParamsWeapons();
        sessionStorage.setItem("music", "on");
        changeStateMusic();
    }
    function drawPrices() {
        document.querySelector('[data-weapon="2"] .price').textContent = `${prices.weapon_2 / 1e3}k`;
        document.querySelector('[data-weapon="3"] .price').textContent = `${prices.weapon_3 / 1e3}k`;
        document.querySelector('[data-weapon="4"] .price').textContent = `${prices.weapon_4 / 1e3}k`;
        document.querySelector('[data-power="1"]').textContent = prices.pwr_1;
        document.querySelector('[data-power="2"]').textContent = prices.pwr_2;
        document.querySelector('[data-power="3"]').textContent = prices.pwr_3;
        document.querySelector('[data-power="4"]').textContent = prices.pwr_4;
        document.querySelector('[data-ammo="1"]').textContent = prices.ammo_1;
        document.querySelector('[data-ammo="2"]').textContent = prices.ammo_2;
        document.querySelector('[data-ammo="3"]').textContent = prices.ammo_3;
        document.querySelector('[data-ammo="4"]').textContent = prices.ammo_4;
    }
    function writeStartWeapons() {
        if (!sessionStorage.getItem("weapons")) {
            let weapons = [ "1" ];
            saveArrStorrage(weapons, "weapons");
        }
        if (!sessionStorage.getItem("current-weapon")) sessionStorage.setItem("current-weapon", 1);
    }
    function writeStartSettings() {
        if (!sessionStorage.getItem("sound")) sessionStorage.setItem("sound", "off");
        if (!sessionStorage.getItem("music")) sessionStorage.setItem("music", "off");
        if (!sessionStorage.getItem("vibro")) sessionStorage.setItem("vibro", "off");
    }
    function writeCurrentSettings() {
        document.querySelector(".button__sound-txt").textContent = `sound: ${sessionStorage.getItem("sound")}`;
        document.querySelector(".button__music-txt").textContent = `music: ${sessionStorage.getItem("music")}`;
        document.querySelector(".button__vibro-txt").textContent = `vibration: ${sessionStorage.getItem("vibro")}`;
    }
    function buyWeapon(block) {
        let number = block.dataset.weapon;
        let price;
        if (2 == number) price = prices.weapon_2; else if (3 == number) price = prices.weapon_3; else if (4 == number) price = prices.weapon_4;
        if (+sessionStorage.getItem("money") >= price) {
            setTimeout((() => {
                block.classList.add("_bought");
            }), 0);
            deleteMoney(price, ".score");
            addNumberStorrage("weapons", number);
        } else if (+sessionStorage.getItem("money") < price) noMoney(".score");
    }
    function chekBoughtWeapons() {
        let boughtWeapons = getArrStorrage("weapons");
        let items = document.querySelectorAll(".weapon");
        boughtWeapons.forEach((weapon => {
            items.forEach((item => {
                if (item.dataset.weapon == weapon) setTimeout((() => {
                    item.classList.add("_bought");
                }), 0);
            }));
        }));
    }
    function checkCurrentWeapon() {
        let weapon = +sessionStorage.getItem("current-weapon");
        document.querySelectorAll(".weapon").forEach((item => {
            if (item.dataset.weapon == weapon) item.classList.add("_active");
        }));
    }
    function writeStartParamsWeapons() {
        if (!sessionStorage.getItem("power-1")) sessionStorage.setItem("power-1", weapon_params.pwr_1);
        if (!sessionStorage.getItem("power-2")) sessionStorage.setItem("power-2", weapon_params.pwr_2);
        if (!sessionStorage.getItem("power-3")) sessionStorage.setItem("power-3", weapon_params.pwr_3);
        if (!sessionStorage.getItem("power-4")) sessionStorage.setItem("power-4", weapon_params.pwr_4);
        document.querySelector('[data-item-power="1"]').textContent = sessionStorage.getItem("power-1");
        document.querySelector('[data-item-power="2"]').textContent = sessionStorage.getItem("power-2");
        document.querySelector('[data-item-power="3"]').textContent = sessionStorage.getItem("power-3");
        document.querySelector('[data-item-power="4"]').textContent = sessionStorage.getItem("power-4");
        if (!sessionStorage.getItem("ammo-1")) sessionStorage.setItem("ammo-1", weapon_params.ammo_1);
        if (!sessionStorage.getItem("ammo-2")) sessionStorage.setItem("ammo-2", weapon_params.ammo_2);
        if (!sessionStorage.getItem("ammo-3")) sessionStorage.setItem("ammo-3", weapon_params.ammo_3);
        if (!sessionStorage.getItem("ammo-4")) sessionStorage.setItem("ammo-4", weapon_params.ammo_4);
        document.querySelector('[data-item-ammo="1"]').textContent = sessionStorage.getItem("ammo-1");
        document.querySelector('[data-item-ammo="2"]').textContent = sessionStorage.getItem("ammo-2");
        document.querySelector('[data-item-ammo="3"]').textContent = sessionStorage.getItem("ammo-3");
        document.querySelector('[data-item-ammo="4"]').textContent = sessionStorage.getItem("ammo-4");
    }
    function changeStateSound() {
        if ("on" == sessionStorage.getItem("sound")) sessionStorage.setItem("sound", "off"); else sessionStorage.setItem("sound", "on");
        setTimeout((() => {
            document.querySelector(".button__sound-txt").textContent = `sound: ${sessionStorage.getItem("sound")}`;
        }), 300);
    }
    function changeStateMusic() {
        if ("on" == sessionStorage.getItem("music")) {
            sessionStorage.setItem("music", "off");
            playStopBgMusic(false);
        } else {
            sessionStorage.setItem("music", "on");
            playStopBgMusic(true);
        }
        setTimeout((() => {
            document.querySelector(".button__music-txt").textContent = `music: ${sessionStorage.getItem("music")}`;
        }), 300);
    }
    function changeStateVibro() {
        let uagent = navigator.userAgent.toLowerCase();
        if ("on" == sessionStorage.getItem("vibro")) {
            sessionStorage.setItem("vibro", "off");
            if (-1 === uagent.lastIndexOf("iphone") && -1 === uagent.lastIndexOf("ipad") && -1 === uagent.lastIndexOf("webos")) window.navigator.vibrate(0);
        } else {
            sessionStorage.setItem("vibro", "on");
            if (-1 === uagent.lastIndexOf("iphone") && -1 === uagent.lastIndexOf("ipad") && -1 === uagent.lastIndexOf("webos")) setTimeout((() => {
                window.navigator.vibrate(100);
            }), 400);
        }
        setTimeout((() => {
            document.querySelector(".button__vibro-txt").textContent = `vibration: ${sessionStorage.getItem("vibro")}`;
        }), 300);
    }
    function showPrivacy() {
        sessionStorage.removeItem("privacy");
        preloader.classList.add("_show");
        wrapper.classList.add("_hide");
        setTimeout((() => {
            preloader.classList.remove("_hide");
            preloader.classList.remove("_show");
            wrapper.classList.remove("_visible");
            wrapper.classList.remove("_hide");
        }), 1e3);
    }
    function clickUpgradePowerWeapon(item) {
        if (1 == item && prices.pwr_1 <= +sessionStorage.getItem("money")) {
            ++weapon_params.pwr_1;
            deleteMoney(prices.pwr_1, ".score");
            document.querySelector('[data-item-power="1"]').textContent = weapon_params.pwr_1;
            sessionStorage.setItem("power-1", weapon_params.pwr_1);
        } else if (2 == item && prices.pwr_2 <= +sessionStorage.getItem("money")) {
            ++weapon_params.pwr_2;
            deleteMoney(prices.pwr_2, ".score");
            document.querySelector('[data-item-power="2"]').textContent = weapon_params.pwr_2;
            sessionStorage.setItem("power-2", weapon_params.pwr_2);
        } else if (3 == item && prices.pwr_3 <= +sessionStorage.getItem("money")) {
            ++weapon_params.pwr_3;
            deleteMoney(prices.pwr_3, ".score");
            document.querySelector('[data-item-power="3"]').textContent = weapon_params.pwr_3;
            sessionStorage.setItem("power-3", weapon_params.pwr_3);
        } else if (4 == item && prices.pwr_4 <= +sessionStorage.getItem("money")) {
            ++weapon_params.pwr_4;
            deleteMoney(prices.pwr_4, ".score");
            document.querySelector('[data-item-power="4"]').textContent = weapon_params.pwr_4;
            sessionStorage.setItem("power-4", weapon_params.pwr_4);
        }
    }
    function clickUpgradeAmmoWeapon(item) {
        if (1 == item && prices.ammo_1 <= +sessionStorage.getItem("money")) {
            sessionStorage.setItem("ammo-1", +sessionStorage.getItem("ammo-1") + 1);
            deleteMoney(prices.ammo_1, ".score");
            document.querySelector('[data-item-ammo="1"]').textContent = sessionStorage.getItem("ammo-1");
        } else if (2 == item && prices.ammo_2 <= +sessionStorage.getItem("money")) {
            sessionStorage.setItem("ammo-2", +sessionStorage.getItem("ammo-2") + 1);
            deleteMoney(prices.ammo_2, ".score");
            document.querySelector('[data-item-ammo="2"]').textContent = sessionStorage.getItem("ammo-2");
        } else if (3 == item && prices.ammo_3 <= +sessionStorage.getItem("money")) {
            sessionStorage.setItem("ammo-3", +sessionStorage.getItem("ammo-3") + 1);
            deleteMoney(prices.ammo_3, ".score");
            document.querySelector('[data-item-ammo="3"]').textContent = sessionStorage.getItem("ammo-3");
        } else if (4 == item && prices.ammo_4 <= +sessionStorage.getItem("money")) {
            sessionStorage.setItem("ammo-4", +sessionStorage.getItem("ammo-4") + 1);
            deleteMoney(prices.ammo_4, ".score");
            document.querySelector('[data-item-ammo="4"]').textContent = sessionStorage.getItem("ammo-4");
        }
    }
    let startHealth = 265;
    const configToy = {
        currentHealth: startHealth,
        currentPower: 0
    };
    if (document.querySelector(".game") && document.querySelector(".preloader").classList.contains("_hide")) {
        drawCurrentHero();
        writeStartCountGuns();
        writeCurrentSettings();
        drawStartBg();
        checkCurrentPower();
        drawRandToy();
        sessionStorage.setItem("music", "on");
        changeStateMusic();
    }
    const toyHeight = window_width > 600 ? 600 : 300;
    const config = {
        currentWin: 0
    };
    function checkCurrentPower() {
        let currenWeapon = +sessionStorage.getItem("current-weapon");
        if (1 == currenWeapon) configToy.currentPower = +sessionStorage.getItem("power-1");
        if (2 == currenWeapon) configToy.currentPower = +sessionStorage.getItem("power-2");
        if (3 == currenWeapon) configToy.currentPower = +sessionStorage.getItem("power-3");
        if (4 == currenWeapon) configToy.currentPower = +sessionStorage.getItem("power-4");
    }
    function drawStartBg() {
        let randCount = getRandom(1, 3);
        document.querySelector(".wrapper").style.backgroundImage = `url("img/other/bg-${randCount}.jpg")`;
    }
    function drawCurrentHero() {
        let currentNinja = +sessionStorage.getItem("current-weapon");
        document.querySelector(".footer__ninja img").setAttribute("src", `img/characters/ninja-${currentNinja}.svg`);
    }
    function writeStartCountGuns() {
        let currenWeapon = +sessionStorage.getItem("current-weapon");
        if (1 == currenWeapon) document.querySelector(".guns__count").textContent = sessionStorage.getItem("ammo-1"); else if (2 == currenWeapon) document.querySelector(".guns__count").textContent = sessionStorage.getItem("ammo-2"); else if (3 == currenWeapon) document.querySelector(".guns__count").textContent = sessionStorage.getItem("ammo-3"); else if (4 == currenWeapon) document.querySelector(".guns__count").textContent = sessionStorage.getItem("ammo-4");
    }
    function drawRandToy() {
        let num = getRandom(1, 4);
        let coeff = window_width > 600 ? 2 : 1;
        if (2 == num) document.querySelector(".toy__image img").style.transform = `scale(${.7 * coeff}) translate(-70px,-20px)`; else if (3 == num) document.querySelector(".toy__image img").style.transform = `scale(${1.4 * coeff}) translate(0,-50px)`; else if (1 == num) document.querySelector(".toy__image img").style.transform = `scale(${1 * coeff})`;
        document.querySelector(".toy__image img").setAttribute("src", `img/characters/toy-${num}.svg`);
    }
    function shootToy() {
        let rotationBlock = getRandom(4, 20);
        let rotationToy = 1.5 * rotationBlock;
        let tl = gsap.timeline({
            defaults: {
                duration: 5,
                ease: "elastic.out(2.5, 0.2)"
            }
        });
        if (1 == +sessionStorage.getItem("current-weapon")) {
            tl.fromTo(".toy", {
                rotation: `${rotationBlock}deg`
            }, {
                rotation: "0"
            });
            tl.fromTo(".toy__image img", {
                rotation: `${rotationToy}deg`
            }, {
                rotation: "0"
            }, "<");
            hittingToy();
            playHit();
        } else {
            createGun();
            playShoot();
            setTimeout((() => {
                tl.fromTo(".toy", {
                    rotation: `${rotationBlock}deg`
                }, {
                    rotation: "0"
                });
                tl.fromTo(".toy__image img", {
                    rotation: `${rotationToy}deg`
                }, {
                    rotation: "0"
                }, "<");
                hittingToy();
                playHit();
            }), 900);
        }
    }
    function hittingToy() {
        let uagent = navigator.userAgent.toLowerCase();
        if (-1 === uagent.lastIndexOf("iphone") && -1 === uagent.lastIndexOf("ipad") && -1 === uagent.lastIndexOf("webos")) getVibration(100);
        let num = Math.random() * (1.5 - .7) + .8;
        let hit = Math.floor(configToy.currentPower * num);
        configToy.currentHealth -= hit;
        deleteGunsAfterHit();
        convertHealthToy();
        createText(hit);
        addMoney(hit, ".score", 500, 1500);
        config.currentWin += hit;
        let randPieces = getRandom(1, 5);
        for (let i = 0; i < randPieces; i++) createPieceOfToy();
    }
    function deleteGunsAfterHit() {
        let currentWeapon = +sessionStorage.getItem("current-weapon");
        if (1 == currentWeapon) {
            sessionStorage.setItem("ammo-1", +sessionStorage.getItem("ammo-1") - 1);
            document.querySelector(".guns__count").textContent = sessionStorage.getItem("ammo-1");
        } else if (2 == currentWeapon) {
            sessionStorage.setItem("ammo-2", +sessionStorage.getItem("ammo-2") - 1);
            document.querySelector(".guns__count").textContent = sessionStorage.getItem("ammo-2");
        } else if (3 == currentWeapon) {
            sessionStorage.setItem("ammo-3", +sessionStorage.getItem("ammo-3") - 1);
            document.querySelector(".guns__count").textContent = sessionStorage.getItem("ammo-3");
        } else if (4 == currentWeapon) {
            sessionStorage.setItem("ammo-4", +sessionStorage.getItem("ammo-4") - 1);
            document.querySelector(".guns__count").textContent = sessionStorage.getItem("ammo-4");
        }
    }
    function convertHealthToy() {
        let currentPecent = 100 * configToy.currentHealth / startHealth;
        let currentPercent_2 = 100 - currentPecent;
        let offset = -537 - 2.73 * currentPercent_2;
        document.querySelector(".fill").style.transform = `translateX(${offset}px) translateY(-61px) scale(3)`;
        if (offset <= -810) {
            let uagent = navigator.userAgent.toLowerCase();
            if (-1 === uagent.lastIndexOf("iphone") && -1 === uagent.lastIndexOf("ipad") && -1 === uagent.lastIndexOf("webos")) getVibration(500);
            destroyToy();
            document.querySelectorAll(".score-txt").forEach((item => item.textContent = config.currentWin));
        }
    }
    function createText(num) {
        let textBlock = document.createElement("div");
        textBlock.textContent = `+${Math.floor(num)}`;
        document.querySelector(".game__body").append(textBlock);
        textBlock.style.cssText = `\n\t\tposition: absolute;\n\t\ttop: ${toyHeight - 50}px;\n\t\tleft: 50%;\n\t\tz-index: 4;\n\t\ttransform: translate(-50%, -50%);\n\t\tcolor: rgba(255, 255, 255, 0.27);\n\t\tfont-size: 36px;\n\t\t-webkit-text-stroke: 1px #2071C5;\n\t`;
        let xOffset = getRandom(-150, 150);
        let yOffset = getRandom(-150, 150);
        gsap.to(textBlock, {
            rotation: "360deg",
            x: xOffset,
            y: yOffset,
            duration: 1
        });
        setTimeout((() => {
            textBlock.remove();
        }), 1500);
    }
    function createPieceOfToy() {
        let thing = document.createElement("img");
        thing.setAttribute("src", "img/icons/toy-piece.svg");
        thing.setAttribute("alt", "icon");
        document.querySelector(".game__body").append(thing);
        thing.style.cssText = `\n\t\tposition: absolute;\n\t\ttop: ${toyHeight - 50}px;\n\t\tleft: 50%;\n\t\tz-index: 4;\n\t\ttransform: translate(-50%, -50%);\n\t`;
        let xOffset = getRandom(-100, 100);
        let yOffset = getRandom(-100, 100);
        let randRotation = getRandom(180, 360);
        gsap.to(thing, {
            rotation: `${randRotation}deg`,
            x: xOffset,
            y: yOffset,
            ease: "back.out(3)",
            duration: .5
        });
        setTimeout((() => {
            thing.remove();
        }), 1500);
    }
    function destroyToy() {
        document.querySelector(".toy__image img").style.pointerEvents = "none";
        let xOffset = getRandom(-100, 100);
        let yOffset = getRandom(-100, 100);
        setTimeout((() => {
            playDestroy();
        }), 1750);
        gsap.to(".toy__image img", {
            x: xOffset,
            y: yOffset,
            rotation: 360,
            opacity: 0,
            scale: .1,
            duration: 2,
            delay: .5,
            ease: "power3.in",
            onComplete: function() {
                if (document.querySelector(".toy__image img")) document.querySelector(".toy__image img").remove();
                if (!document.querySelector(".win-text")) showWinText();
                setTimeout((() => {
                    document.querySelector(".win").classList.add("_active");
                    addMoney(config.currentWin, ".score", 500, 1500);
                }), 2e3);
            }
        });
    }
    function createToy() {
        let toy = document.createElement("img");
        toy.setAttribute("src", `img/characters/toy-1.svg`);
        document.querySelector(".toy__image").append(toy);
    }
    function createGun() {
        let gun = document.createElement("img");
        let y1 = window_height / 7;
        let y2 = window_height / 6;
        let y3 = window_height / 5;
        let x1 = getRandom(15, 80);
        let x2 = 0;
        let x3 = getRandom(-70, 0);
        let currentWeapon = +sessionStorage.getItem("current-weapon");
        if (4 == currentWeapon) {
            x2 = getRandom(150, 250);
            gun.style.left = 0;
        } else if (2 == currentWeapon || 3 == currentWeapon) {
            gun.style.right = 0;
            x2 = getRandom(-250, -150);
        }
        gun.classList.add("footer__gun");
        gun.setAttribute("src", "img/icons/gun.svg");
        document.querySelector(".footer__ninja").append(gun);
        let tl = gsap.timeline({
            defaults: {}
        });
        tl.to(gun, {
            x: x1,
            y: -y1,
            rotation: -45,
            duration: .25
        });
        tl.to(gun, {
            x: x2,
            y: -y1 - y2,
            rotation: 45,
            duration: .35
        });
        tl.to(gun, {
            x: x3,
            y: -y1 - y2 - y3,
            rotation: -70,
            duration: .5,
            opacity: .1,
            onComplete: function() {
                gun.remove();
            }
        });
    }
    function createWinText() {
        let text = document.createElement("div");
        text.textContent = "Level Completed";
        text.classList.add("win-text");
        return text;
    }
    function removeWinText() {
        if (document.querySelector(".win-text")) gsap.to(".win-text", {
            x: 100,
            opacity: 0,
            duration: .75,
            delay: .3,
            ease: "power3.in",
            onComplete: function() {
                document.querySelector(".win-text").remove();
            }
        });
    }
    function showWinText() {
        let text = createWinText();
        gsap.fromTo(text, {
            opacity: 0,
            x: -150
        }, {
            opacity: 1,
            x: 0,
            ease: "power3.in"
        });
        document.querySelector(".game").append(text);
    }
    function resetData() {
        config.currentWin = 0;
        configToy.currentHealth = startHealth;
        removeWinText();
        createToy();
        drawRandToy();
        document.querySelector(".fill").style.transform = `translateX(-537px) translateY(-61px) scale(3)`;
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".preloader__button")) setTimeout((() => {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
                document.querySelector(".main__body").classList.add("_active");
                writeStartWeapons();
                drawPrices();
                chekBoughtWeapons();
                checkCurrentWeapon();
                writeStartParamsWeapons();
            }
        }), 300);
        if (targetElement.closest(".header__params")) setTimeout((() => {
            document.querySelector(".main__body").classList.add("_params");
        }), 0);
        if (targetElement.closest(".header__store")) document.querySelector(".main__body").classList.add("_store");
        if (targetElement.closest(".main__weapons") && !targetElement.closest(".weapons__body")) document.querySelector(".main__body").classList.remove("_store");
        if ((targetElement.closest(".settings__icon-closes") || !targetElement.closest(".settings__body")) && document.querySelector(".main")) if (document.querySelector(".main__body").classList.contains("_params")) document.querySelector(".main__body").classList.remove("_params");
        if (targetElement.closest(".header-game__icon-params")) setTimeout((() => {
            document.querySelector(".game__body").classList.add("_params");
        }), 0);
        if ((targetElement.closest(".settings__icon-closes") || !targetElement.closest(".settings__body")) && document.querySelector(".game")) if (document.querySelector(".game__body").classList.contains("_params")) document.querySelector(".game__body").classList.remove("_params");
        if (targetElement.closest(".settings__button_sound")) changeStateSound();
        if (targetElement.closest(".settings__button_music")) changeStateMusic();
        if (targetElement.closest(".settings__button_vibro")) changeStateVibro();
        if (targetElement.closest(".settings__button_privacy")) {
            showPrivacy();
            document.querySelector(".main__body").classList.remove("_params");
        }
        if (targetElement.closest(".weapon__btn-buy")) buyWeapon(targetElement.closest(".weapon"));
        if (targetElement.closest('[data-btn="ammo"]')) clickUpgradeAmmoWeapon(targetElement.closest(".weapon").dataset.weapon);
        if (targetElement.closest('[data-btn="power"]')) clickUpgradePowerWeapon(targetElement.closest(".weapon").dataset.weapon);
        if (targetElement.closest(".weapon__body") && targetElement.closest(".weapon").classList.contains("_bought") && !targetElement.closest(".weapon__buttons")) {
            document.querySelectorAll(".weapon").forEach((item => item.classList.remove("_active")));
            let number = +targetElement.closest(".weapon").dataset.weapon;
            sessionStorage.setItem("current-weapon", number);
            targetElement.closest(".weapon").classList.add("_active");
        }
        if (targetElement.closest(".win__button")) {
            resetData();
            document.querySelector(".win").classList.remove("_active");
        }
        if (targetElement.closest(".toy__image img")) {
            let countGuns = +document.querySelector(".guns__count").textContent;
            if (countGuns > 0) shootToy(); else noMoney(".guns__count");
        }
        if (targetElement.closest(".weapon__btn")) gsap.to(targetElement.closest(".weapon__btn"), {
            y: 20,
            duration: .05,
            boxShadow: "0px 0px 0px #004a04",
            yoyo: true,
            repeat: 1
        });
        if (targetElement.closest(".header__params")) gsap.to(targetElement.closest(".header__params"), {
            rotation: -30,
            duration: .05,
            yoyo: true,
            repeat: 1
        });
        if (targetElement.closest(".header-game__icon-params")) gsap.to(targetElement.closest(".header-game__icon-params"), {
            rotation: -30,
            duration: .05,
            yoyo: true,
            repeat: 1
        });
        if (targetElement.closest(".header-game__btn-home")) gsap.to(targetElement.closest(".header-game__btn-home"), {
            rotation: -30,
            duration: .05,
            yoyo: true,
            repeat: 1
        });
        if (targetElement.closest(".header__store")) gsap.to(targetElement.closest(".header__store"), {
            rotation: 30,
            duration: .05,
            yoyo: true,
            repeat: 1
        });
        if (targetElement.closest(".settings__icon-closes")) gsap.to(targetElement.closest(".settings__icon-closes"), {
            y: "-50%",
            scale: .9,
            duration: .05,
            yoyo: true,
            repeat: 1
        });
        if (targetElement.closest(".preloader__button")) gsap.to(targetElement.closest(".preloader__button"), {
            y: 10,
            boxShadow: "0px 1px 0px #33104f",
            duration: .05,
            yoyo: true,
            repeat: 1
        });
        if (targetElement.closest(".button_blue")) gsap.to(targetElement.closest(".button_blue"), {
            y: 10,
            boxShadow: "0px 1px 0px #33104f",
            duration: .05,
            yoyo: true,
            repeat: 1
        });
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();