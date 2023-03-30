import { balanceSheet } from "../repository/ExpenseRepository"
import { logger } from "../utils/logger";

export const getBalanceSheetData =()=>{
    balanceSheet.forEach((amount: number, payee: number) => {
        logger(`For ${payee} the amount is`,amount.toString());
    });
}