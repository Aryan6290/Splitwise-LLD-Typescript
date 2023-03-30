import { SplitType } from "../constants/constants";

export class Expense{
    actualPayee : number;
    otherPayees  : number[];
    amount : number;
    expenseCompleted : boolean;
    amountPayableforEach : Map<number,number>;
    mode? : SplitType;

    constructor(actualPayee: number , otherPayees: number[], amount: number, mode : SplitType){
        this.actualPayee = actualPayee;
        this.otherPayees = otherPayees;
        this.amount = amount;
        this.expenseCompleted = false;
        this.amountPayableforEach = new Map<number,number>;
        this.mode = mode;
    }
}