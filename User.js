class User {
    
    constructor(name){
        this.score = 0;
        this.name = name;
    }

    getScore(){
        return this.score;
    }

    incrementScore(num){
        this.score+= num;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

}

export default User;
