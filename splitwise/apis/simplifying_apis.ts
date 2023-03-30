import { debtGraph } from "../repository/ExpenseRepository"
import { logger } from "../utils/logger";
import { formatDebtMessage } from "../utils/splitting_utils";
const findtNetCashFlow=(adjList: number[][], n: number)=> {
    const inDegreeAmountArr: number[] = Array(n).fill(0);
    const outDegreeAmountArr: number[] = Array(n).fill(0);
 
    for (let i = 0; i < n; i++) {
        let indegree = 0;
        let outdegree = 0;
      
        for (let j = 0; j < n; j++) {
          if (adjList[j][i] !== 0) {
            indegree+= adjList[j][i];
          }
          if (adjList[i][j] !== 0) {
            outdegree+= adjList[i][j];
          }
          

        }
        inDegreeAmountArr[i]=indegree;
        outDegreeAmountArr[i]=outdegree;
    }
    for(let i=0;i<n;i++){
        const finalAmount = outDegreeAmountArr[i]- inDegreeAmountArr[i];
        const message = formatDebtMessage(finalAmount,i);
        logger(message);
    }
}
export const simplifyDebts = ()=>{
    const adjacencyArray : number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
    for (const [i, innerMap] of debtGraph.entries()) {
        for (const [j, val] of innerMap.entries()) {
          adjacencyArray[i-1][j-1]=val;
        //   adjacencyArray[j-1][i-1]=-val;
        }
      }
      findtNetCashFlow(adjacencyArray,4);
      logger(adjacencyArray);

    
}


// EXPENSE 4 500 EXACT 1,2,3 100,50,200
// EXPENSE 1 500 EXACT 3,2,4 100,50,200
// EXPENSE 3 500 EXACT 1,2,4 100,50,200
// EXPENSE 2 500 EXACT 1,3,4 100,50,200 