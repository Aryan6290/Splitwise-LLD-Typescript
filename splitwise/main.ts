import { getBalanceSheetData } from "./apis/retrieving_apis"
import { createExpense } from "./apis/splitting_apis"
import { InputType, SplitType } from "./constants/constants"
import { logger } from "./utils/logger"
import {simplifyDebts} from './apis/simplifying_apis'


export const parseUserInput =(message:string)=>{
    const rawInput = message.split(' ')
    const mainUser = Number(rawInput[1]);
    const response = rawInput[0];
    switch (response) {
        case InputType.EXPENSE:
            logger('EXPENSE_EVENT',mainUser.toString() )
            // Parsing amount,splittype (EXACT,EQUAL) and other group participants
            const amount = Number(rawInput[2]);
            const splitType : SplitType = rawInput[3] as SplitType
            const otherPayees = rawInput[4].split(',').map(Number)
            // If Splitting is EQUAL
            if(splitType==SplitType.EQUAL){
                createExpense(mainUser, otherPayees,amount, splitType)
            }else{
                // If Splitting is EXACT OR PERCENTAGE
                const amountArray = rawInput[5].split(',').map(Number)
                createExpense(mainUser, otherPayees,amount, splitType,amountArray)
            }
            break;
        case InputType.SHOW:
            logger('SHOW_EVENT', '==================')
            // show each user current's cash/debt amount
            getBalanceSheetData()
            break;
        case InputType.SIMPLIFY:
            logger('SIMPLIFY_EVENT',mainUser.toString() )
            // This function is incomplete, managed to find who owes/is in debt how much at the end. Yet to find who gives who what.
            simplifyDebts();
            break;
        default:
            logger("UNKNOWN COMMAND","Try EXPENSE OR SHOW")
            break;
    }


}