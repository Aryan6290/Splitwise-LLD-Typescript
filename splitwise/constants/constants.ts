export enum SplitType {
    EXACT = 'EXACT',
    EQUAL = 'EQUAL',
    PERCENTAGE = 'PERCENTAGE'
};

export enum ShowType{
    SHOW_BALANCE = 'SHOW_BALANCE',
    SHOW_SHEET = 'SHOW_'
}
export enum InputType {
    EXPENSE = 'EXPENSE',
    SHOW = 'SHOW',
    SIMPLIFY='SIMPLIFY',
}

export const startingMessage = "Start your expense tracking \n 1. Use EXPENSE to split your expense e.g. EXPENSE 1 1000 EQUAL 2,3,4 \n 2. Use SHOW to get balance of all users"