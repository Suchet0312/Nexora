import React from 'react'
import CreateAccountDrawer from '@/components/create-account-drawer';
import {Card,CardContent} from "@/components/ui/card"
import {Plus} from 'lucide-react'
import { getUserAccounts } from '../../../actions/dashboard';
import AccountCard from './_component/account-card';

const DashboardPage = async() => {

  const accounts = await getUserAccounts();
  // console.log(accounts);
  return (
    <div className="bg-black min-h-screen">
      {/* Add your dashboard content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <CreateAccountDrawer>
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-orange-500 bg-black text-orange-500"
    >
      <CardContent className="flex flex-col items-center justify-center py-6">
        <Plus className="h-10 w-10 mb-2 text-orange-500" />
        <p className="text-sm font-medium text-orange-500">Add New Account</p>
      </CardContent>
    </Card>
  </CreateAccountDrawer>
  {accounts.length>0 && accounts?.map((account)=>{
      return <AccountCard key={account.id} account = {account} />;
  })}
</div>

    </div>
  );
};

export default DashboardPage;
