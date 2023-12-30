function happayFireWork(ms = 3000) {
    var end = Date.now() + ms;
    var colors = ["#bb0000", "#ffffff"];
    var isCancel = false;
    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            if (isCancel) return;
            requestAnimationFrame(frame);
        }
    })();
    return () => {
        isCancel = true;
    };
}
