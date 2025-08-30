"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "../../../hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export default function AccountCard({ account }){
  const { name, type, balance, id, isDefault } = account;

    const {
      loading: updateDefaultLoading,
      fn: updateDefaultFn,
      data: updatedAccount,
      error,
    } = useFetch(updateDefaultAccount);

    const handleDefaultChange = async (event) => {
      event.preventDefault(); // Prevent navigation

      if (isDefault) {
        toast.warning("You need atleast 1 default account");
        return; // Don't allow toggling off the default account
      }

      await updateDefaultFn(id);
    };

    useEffect(() => {
      if (updatedAccount?.success) {
        toast.success("Default account updated successfully");
      }
    }, [updatedAccount]);

    useEffect(() => {
      if (error) {
        toast.error(error.message || "Failed to update default account");
      }
    }, [error]);

  return (
    <Card className="bg-black border-2 border-orange-500 rounded-2xl shadow-lg hover:shadow-orange-500/40 transition-shadow duration-300 group relative overflow-hidden">
      <Link href={`/account/${id}`} className="block p-4">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold text-orange-500 capitalize">
            {name}
          </CardTitle>
          <Switch
            checked={isDefault}
            className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-300"
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>

        {/* Balance Section */}
        <CardContent className="pb-4">
          <div className="text-3xl font-extrabold text-white">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-between text-sm">
          <div className="flex items-center text-green-500 font-medium">
            <ArrowUpRight className="mr-1 h-5 w-5" />
            Income
          </div>
          <div className="flex items-center text-red-500 font-medium">
            <ArrowDownRight className="mr-1 h-5 w-5" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
