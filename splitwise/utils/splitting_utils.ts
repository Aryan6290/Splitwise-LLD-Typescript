export const getExactAmountforActualPayee=(totalAmount:number,amountArray : number[] )=>{
    amountArray.forEach((amount,i)=>{
        totalAmount -= amount
    })
    return totalAmount;
}

export const getPercentageAmountforActualPayee=(totalAmount:number,amountArray : number[] )=>{
    var remainingPercent = 100;
    amountArray.forEach((amountPercent,i)=>{
        remainingPercent -= amountPercent
    })
    return remainingPercent;
}

export const getTotalOwedAmount=(expenseMap :Map<number,number>,actualPayee:number )=>{

    var owedAmount : number = 0
    expenseMap.forEach((amount: number, payee: number) => {
        if(payee !== actualPayee){
            owedAmount+=amount;
        }
    });
    return owedAmount;
}
export const formatDebtMessage=(amount: number, payee : number)=>{
    const message = `The user ${payee+1} has $${amount<0 ? -1*amount:amount} ${amount<0 ? 'debt':'balance'}`
    return message;
}