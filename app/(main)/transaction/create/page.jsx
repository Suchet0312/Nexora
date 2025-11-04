import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransactionPage({ searchParams }) {
  try {
    // Unwrap async searchParams (Next.js 15 dynamic API)
    const sp = await searchParams;

    // Read the "edit" query param safely
    // If Next ever provides arrays for repeated params, grab the first one.
    const editId =
      typeof sp?.edit === "string"
        ? sp.edit
        : Array.isArray(sp?.edit)
        ? sp.edit[0]
        : null;

    // Fetch accounts
    const accounts = await getUserAccounts();

    // If editing, fetch the transaction
    let initialData = null;
    if (editId) {
      const transaction = await getTransaction(editId);
      if (!transaction) {
        throw new Error("Transaction not found");
      }
      initialData = transaction;
    }

    return (
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex justify-center md:justify-normal mb-8">
          <h1 className="text-5xl gradient-title">
            {editId ? "Edit Transaction" : "Add Transaction"}
          </h1>
        </div>
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
          editMode={!!editId}
          initialData={initialData}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in AddTransactionPage:", error);
    return (
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-red-500">
          An error occurred while loading the transaction form. Please try again.
        </div>
      </div>
    );
  }
}
