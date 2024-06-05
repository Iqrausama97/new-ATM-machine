#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.inverse.bold.gray('Welcome to IQRA ATM Machine'));
//random number
const userBalance = Math.floor(Math.random() * 10000);
let myLoop = true;
while (myLoop) {
    const userInput = await inquirer.prompt([
        {
            name: 'userPin',
            type: 'password',
            message: 'Enter your pin:'
        },
        {
            name: 'accountType',
            type: 'list',
            message: 'Select your Account Type',
            choices: ['Current account', 'Saving account']
        },
        {
            name: 'transactionType',
            type: 'list',
            message: 'Select your Transaction Type',
            choices: ['Fast Cash', 'Cash Withdraw', 'Balance Inquiry']
        },
        {
            type: 'list',
            name: 'amount',
            message: 'Select your Amount',
            choices: [1000, 2000, 5000, 10000, 20000],
            when(userInput) {
                return userInput.transactionType === 'Fast Cash';
            }
        },
        {
            type: 'number',
            name: 'amount',
            message: 'Enter withdrawal amount',
            when(userInput) {
                return userInput.transactionType === 'Cash Withdraw';
            }
        }
    ]);
    const { userPin, transactionType, amount } = userInput;
    if (userPin && transactionType === "Balance Inquiry") {
        console.log(`Your current balance is Rs.${userBalance}`);
    }
    else if (userPin) {
        if (userBalance > amount) {
            console.log(`Your account has been debited with Rs.${amount} and your remaining balance is ${userBalance - amount}`);
        }
        else {
            console.log('Insufficient Funds');
        }
    }
    //more transaction
    let moreTransactions = await inquirer.prompt({
        type: 'confirm',
        name: 'more',
        message: 'Do you want more transactions?',
        default: false
    });
    if (!moreTransactions.more) {
        myLoop = false,
            console.log('Thank you for using ATM Machine.');
    }
}
;
