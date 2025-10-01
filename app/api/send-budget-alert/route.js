import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "../../../emails/template.server";
import { render } from "@react-email/render";

export async function POST(req) {
  const { userId, percentageUsed, budgetAmount, totalExpenses } = await req.json();

  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ success: false, error: "User not found" });

    const html = render(
      <EmailTemplate
        type="budget-alert"
        userName={user.name || "User"}
        data={{ percentageUsed, budgetAmount, totalExpenses }}
      />
    );

    const result = await sendEmail({
      to: user.email,
      subject: "Budget Alert: High Usage",
      html,
    });

    console.log("Email send result:", result); // ✅ debug

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("Error sending budget alert:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
