import { Expense } from "../models/Expense";
import { UserModel } from "../models/User";
export var expenseArray : Array<Expense> = []
export var balanceSheet : Map<number,number> = new Map<number,number>;
export var debtGraph : Map<number, Map<number,number>> = new Map<number,Map<number,number>>;
export var usersArray : UserModel[]= []


