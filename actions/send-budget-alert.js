"use server";

import { db } from "../lib/prisma";
import { sendEmail } from "./send-email";
import EmailTemplate from "../emails/template.server";
import { render } from "@react-email/render";

export async function sendBudgetAlertIfNeeded(userId) {
  const budget = await db.budget.findUnique({ where: { userId } });
  const user = await db.user.findUnique({ where: { id: userId } });

  if (!budget || !user) return;

  const totalExpensesAggregate = await db.transaction.aggregate({
    where: { userId, type: "EXPENSE" },
    _sum: { amount: true },
  });

  const totalExpenses = Number(totalExpensesAggregate._sum.amount || 0);
  const usedPercent = (totalExpenses / Number(budget.amount)) * 100;

  if (
    usedPercent >= 90 &&
    (!budget.lastAlertSent ||
      new Date(budget.lastAlertSent).toDateString() !== new Date().toDateString())
  ) {
    const html = render(
      <EmailTemplate
        type="budget-alert"
        userName={user.name || "User"}
        data={{
          percentageUsed: usedPercent,
          budgetAmount: Number(budget.amount),
          totalExpenses,
        }}
      />
    );

    const result = await sendEmail({
      to: user.email,
      subject: "Budget Alert",
      html,
    });

    console.log("sendBudgetAlertIfNeeded result:", result); // ✅ debug

    await db.budget.update({
      where: { userId },
      data: { lastAlertSent: new Date() },
    });
  }
}
