function updateCSSVForFontSize(varName, batch) {
    const root = document.documentElement;
    const computedStyles = window.getComputedStyle(root);
    const preV = computedStyles.getPropertyValue(varName).slice(0, -3);
    const newV = parseFloat(preV) + batch;
    if (newV < 0) return;
    root.style.setProperty(varName, `${newV}rem`);
}
document.addEventListener("alpine:init", () => {
    Alpine.store("app", {
        debugMode: false,
        fullScreenMode: false,
        cancelBeforeFireWork: null,
        title: "卡巴教育2023年终答谢会",
        delay: 3000,
        fireDelay: 10000,
        members: [1, 2, 3],
        rollTimerId: null,
        init() {
            this.members = [].concat(presetMembers);

            const startRollMemberList = this.startRollMemberList;
            const stopRollMemberListAndSetRandomOne = this.stopRollMemberListAndSetRandomOne;

            hotkeys("left,right,u,i,h,j,k,l", (event, handler) => {
                if (handler.key === "left") {
                    startRollMemberList.bind(this)();
                } else if (handler.key === "right") {
                    stopRollMemberListAndSetRandomOne.bind(this)();
                } else if (handler.key === "u") {
                    updateCSSVForFontSize("--list-item-font-size", 0.1);
                } else if (handler.key === "i") {
                    updateCSSVForFontSize("--list-item-font-size", -0.1);
                } else if (handler.key === "h") {
                    updateCSSVForFontSize("--exhibition-font-size", 0.5);
                } else if (handler.key === "j") {
                    updateCSSVForFontSize("--exhibition-font-size", -0.5);
                } else if (handler.key === "k") {
                    updateCSSVForFontSize("--title-font-size", 0.1);
                } else if (handler.key === "l") {
                    updateCSSVForFontSize("--title-font-size", -0.1);
                }
            });
        },
        toggleFullScreen() {
            const main = document.documentElement;
            if (main.requestFullscreen && document.exitFullscreen) {
                this.fullScreenMode = !this.fullScreenMode;
                if (this.fullScreenMode) {
                    main.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            }
        },
        nums() {
            let length = 10;
            this.members = Array.from({ length }, (_, i) => length - i);
        },
        clear() {
            this.members = [];
        },
        debug() {
            if (this.debugMode) {
                this.members = [].concat(presetMembers);
            } else {
                this.members = [].concat(presetMembers.slice(0, 4));
            }
            this.debugMode = !this.debugMode;
        },
        removeByName(name) {
            let index = this.members.indexOf(name);
            this.members.splice(index, 1);
        },
        addNewMember(name) {
            if (!name) return;
            if (this.members.indexOf(name) !== -1) {
                this.removeByName(name);
            }
            this.members.push(name);
        },
        getRandomMember() {
            let randomIndex = this.getRandomMemberIndex();
            return this.members[randomIndex];
        },
        getRandomMemberIndex() {
            return Math.floor(Math.random() * this.members.length);
        },
        startRollMemberList() {
            if (this.rollTimerId) return;
            if (this.members.length < 2) {
                alert("至少需要两名同学参与抽奖");
                return;
            }
            let travelIndex = this.getRandomMemberIndex();
            const luckyNameDiv = document.getElementById("winner");
            this.rollTimerId = setInterval(() => {
                travelIndex = (travelIndex + 1) % this.members.length;
                luckyNameDiv.innerHTML = `${this.members[travelIndex]}`;
            }, 100);
        },
        stopRollMemberListAndSetRandomOne() {
            if (!this.rollTimerId) return;
            const randomIndex = this.getRandomMemberIndex();
            const luckyNameDiv = document.getElementById("winner");
            clearInterval(this.rollTimerId);
            this.rollTimerId = null;
            const luckyName = this.members[randomIndex];
            this.removeByName(luckyName);
            luckyNameDiv.innerHTML = luckyName;

            console.log(this.cancelBeforeFireWork);

            if (this.cancelBeforeFireWork) {
                this.cancelBeforeFireWork();
            }
            this.cancelBeforeFireWork = happayFireWork();
        },
    });
});
