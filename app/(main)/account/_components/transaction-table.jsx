"use client"
import React from 'react'
import { Table, TableHeader, TableCaption, TableHead, TableCell, TableRow, TableBody } from '../../../../components/ui/table'
import { Checkbox } from '../../../../components/ui/checkbox'
import { format } from "date-fns";
import { categoryColors } from '../../../../data/categories';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge';
import { Clock, RefreshCcw } from 'lucide-react';

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
    const filteredAndSortedTransactions = transactions
    const handlesort = () => {}

    return (
        <div className='space-y-4'>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox />
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handlesort("date")}>
                                <div className='flex items-center'>Date</div>
                            </TableHead>
                            <TableHead className="cursor-pointer">
                                Description
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handlesort("category")}>
                                <div className='flex items-center'>Category</div>
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handlesort("amount")}>
                                <div className='flex items-center justify-end'>Amount</div>
                            </TableHead>
                            <TableHead>
                                Recurring
                            </TableHead>
                            <TableHead>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedTransactions.length===0?(
                            <TableRow>
                                <TableCell colSpan={7} className='text-center '>
                                    No Transactions Found
                                </TableCell>
                            </TableRow>
                        ):(
                            filteredAndSortedTransactions.map((transaction)=>(   
                            <TableRow key={transaction.id}>
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell>{format(new Date(transaction.date),"PP")}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell className='capitalize'>
                                <span style={{
                                    background:categoryColors[transaction.category], 
                                }}
                                className='px-2 py-1 rounded text-white text-sm'
                                >
                                {transaction.category}
                                </span></TableCell>
                            <TableCell className="text-right font-medium"
                            style={{
                                color:transaction.type === "EXPENSE" ?"red" : "green",
                            }}
                            >
                                {transaction.type==="EXPENSE"? "-" : "+"}
                                ${transaction.amount.toFixed(2)}</TableCell>
                                <TableCell>{transaction.isRecurring?(
                                    <TooltipProvider>
                                        <Tooltip>
                        <TooltipTrigger>
                            <Badge variant="outline" className='gap-1'>
                            <RefreshCcw className='h-3 w-3'/>
                                {RECURRING_INTERVALS[transaction.reccuringInterval]}
                            </Badge>
                        </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
             </TooltipContent>
                    </Tooltip>
                                    </TooltipProvider>
                                    
                                ):<Badge className='bg-white text-black gap-1' variant='outline' >
                                    One-time</Badge>}</TableCell>
                        </TableRow>
                            ))
                        )}

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TransactionTable
