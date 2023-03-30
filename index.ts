import readline from "readline-sync";
import { startingMessage } from "./splitwise/constants/constants";
import {parseUserInput} from './splitwise/main'
import {UserModel} from './splitwise/models/User'
import { logger } from "./splitwise/utils/logger";
import { registerUser } from "./splitwise/utils/register";

const initialiseUserDB =()=>{
    for(let i=1;i<=4;i++){
        const user = new UserModel(i,`u${i}`)
        registerUser(user)
    }
}
const startSplitwiseServer =()=> {
    // initializing 4 hardcoded users
    initialiseUserDB()
    logger('\x1b[33mWelcome to Splitwise! \x1b[0m');
    logger(startingMessage)
    while (true) {
        const userInput = String(readline.question());
        parseUserInput(userInput);
    }
}
startSplitwiseServer()