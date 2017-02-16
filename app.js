new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            // var max = 10;
            // var min = 3; 
            // var damage = Math.max(Math.floor(Math.random() * max) +1,min);
            var damage = this.damage(12, 3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: '你攻击怪物，怪物掉了 ' + damage +  ' 滴血'
            })
            if (this.checkWin()) {
                return;
            }

            // max = 12;
            // min = 3; 
            // damage = Math.max(Math.floor(Math.random() * max) +1,min);
            // this.playerHealth -= this.damage(12, 3);
            // this.checkWin();
            // if(this.playerHealth <= 0){
            // 	alert("你输了");
            // 	this.playerHealth = 0;
            // 	this.gameIsRunning=false;
            // 	return false;
            // }
			this.monsterAttack();

        },
        specialAttack: function() {
            var damage = this.damage(10, 7);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: '你攻击怪物，怪物掉了 ' + damage +  ' 滴血'
            })
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();

        },
        heal: function() {

            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
                return;
            }

            this.turns.unshift({
                isPlayer: true,
                text: '玩家恢复了 10 滴血'
            })
        },
        giveUp: function() {
			this.gameIsRunning = false;
			this.turns.unshift({
                isPlayer: true,
                text: '玩家投降了'
            })
        },
        monsterAttack: function() {
            var damage = this.damage(12, 5);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: '怪物攻击了你，你掉了 ' + damage +  ' 滴血'
            })
        },
        damage: function(max, min) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {

            if (this.monsterHealth <= 0) {
                if (confirm("你赢了！要重新开始吗？")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.monsterHealth = 0;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("你输了！要重新开始吗？")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.playerHealth = 0;
                }
                return true;
            }

            return false;

        }
    }
});
