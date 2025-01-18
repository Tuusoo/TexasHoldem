// 通过屏幕高宽比判断是不是移动端且竖屏
export const isMobile = window.screen.height / window.screen.width > 1;

// 将数字和扑克号码对应
export const cardNumMap = {
    "1": "A",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "11": "J",
    "12": "Q",
    "13": "K",
};

// 获取左手边右手边的玩家列表
export const getLeftRightPlayers = (players: playerInfo[], myId: string) => {
    const myIndex = players.findIndex(item => item.id === myId);
    // 从我开始逆时针方向玩家列表
    const anticlockwisePlayers = players
        .slice(myIndex + 1)
        .concat(players.slice(0, myIndex))
        .reverse();
    const rightHalfPlayers = anticlockwisePlayers
        .slice(0, Math.floor(anticlockwisePlayers.length / 2))
        .reverse();
    const leftHalfPlayers = anticlockwisePlayers.slice(
        Math.floor(anticlockwisePlayers.length / 2)
    );
    return [leftHalfPlayers, rightHalfPlayers];
};
