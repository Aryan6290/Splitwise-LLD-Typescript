
import { UserModel } from "../models/User";
import { balanceSheet, debtGraph, usersArray } from "../repository/ExpenseRepository";

export const registerUser =(user:UserModel)=>{
    usersArray.push(user)
    balanceSheet.set(user._id!!,0);
    debtGraph.set(user._id!!,new Map<number,number>())
    
}