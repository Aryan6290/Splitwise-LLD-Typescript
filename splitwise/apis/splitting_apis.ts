import { SplitType } from "../constants/constants"
import { Expense } from "../models/Expense"
import { balanceSheet, debtGraph, expenseArray } from "../repository/ExpenseRepository";
import { logger } from "../utils/logger";
import { getExactAmountforActualPayee, getPercentageAmountforActualPayee, getTotalOwedAmount } from "../utils/splitting_utils";

const equalSplit =(actualPayee: number,payeeList : number[], amount : number )=>{
    const eachamount = amount/(payeeList.length);
    var expenseMap : Map<number,number> = new Map<number,number>;
    payeeList.forEach((payee,i)=>{
        expenseMap.set(payee, eachamount);
    })

    return expenseMap;
}
const exactSplit=(actualPayee: number,payeeList : number[],amount: number, amountArray : number[] )=>{
    var expenseMap : Map<number,number> = new Map<number,number>;
    const actualPayeeAmount = getExactAmountforActualPayee(amount,amountArray);
    amountArray.push(actualPayeeAmount)
    payeeList.forEach((payee,i)=>{
        expenseMap.set(payee,amountArray[i]);
    })
    return expenseMap;
}

const percentageSplit=(actualPayee: number,payeeList : number[],amount:number,amountArray : number[])=>{
    var expenseMap : Map<number,number> = new Map<number,number>;
    const actualPayeePercentage = getPercentageAmountforActualPayee(amount,amountArray);
    amountArray.push(actualPayeePercentage)
    payeeList.forEach((payee,i)=>{
        expenseMap.set(payee,amount* (amountArray[i]/100));
    })

    return expenseMap;
}

export const updateBalanceSheet=(expenseMap :Map<number,number> ,actualPayee:number)=>{
    const owedAmount = getTotalOwedAmount(expenseMap,actualPayee)
    expenseMap.forEach((amount: number, payee: number) => {
        const finalAmount = payee===actualPayee? owedAmount : amount*-1;
        balanceSheet.set(payee,balanceSheet.get(payee)!!+ finalAmount);
    });
}

export const updateDebtGraph =(expenseMap :Map<number,number> ,actualPayee:number)=>{
    expenseMap.forEach((amount: number, payee: number) => {
        console.log(payee,actualPayee);
        if(payee!==actualPayee){
            if(debtGraph.get(actualPayee)?.has(payee)){
                debtGraph.get(actualPayee)?.set(payee,amount+ debtGraph.get(actualPayee)?.get(payee)!!)
            }else{
                debtGraph.get(actualPayee)?.set(payee,amount)
            }
            
        }
            
    });
    logger("DEBT_GRAPH_UPDATED",debtGraph)

}

export const createExpense=(actualPayee : number, payeeList : number[],amount : number, mode :SplitType, amountArray? : number[] )=>{
    const expense = new Expense(actualPayee,payeeList,amount,mode);
    payeeList.push(actualPayee)
    switch (mode) {
        case SplitType.EQUAL:
            expense.amountPayableforEach = equalSplit(actualPayee,payeeList,amount);
            break;
        case SplitType.EXACT:
            expense.amountPayableforEach = exactSplit(actualPayee,payeeList,amount,amountArray!!);
            break;
        case SplitType.PERCENTAGE:
            expense.amountPayableforEach = percentageSplit(actualPayee, payeeList,amount,amountArray!!)
        default:
            break;
    }
    logger(expense.amountPayableforEach)
    updateBalanceSheet(expense.amountPayableforEach,actualPayee);
    updateDebtGraph(expense.amountPayableforEach,actualPayee);
    expenseArray.push(expense);
    logger('EXPENSE_CREATED', expense.actualPayee.toString())

}