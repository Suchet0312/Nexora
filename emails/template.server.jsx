import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function EmailTemplateServer({ userName = "User", type = "monthly-report", data = {} }) {
  const safeData = data || {};
  if (type === "budget-alert") {
    const percentageUsed = safeData.percentageUsed || 0;
    const budgetAmount = safeData.budgetAmount || 0;
    const totalExpenses = safeData.totalExpenses || 0;

    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "-apple-system, sans-serif" }}>
          <Container style={{ backgroundColor: "#fff", margin: "0 auto", padding: "20px", borderRadius: "5px" }}>
            <Heading style={{ color: "#1f2937", fontSize: "24px" }}>Budget Alert</Heading>
            <Text>Hello {userName},</Text>
            <Text>
              You’ve used {percentageUsed.toFixed(1)}% of your monthly budget.
            </Text>
            <Section style={{ marginTop: "20px" }}>
              <Text>Budget Amount: ${budgetAmount}</Text>
              <Text>Spent So Far: ${totalExpenses}</Text>
              <Text>Remaining: ${budgetAmount - totalExpenses}</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  return <Html><Body><Text>Hello {userName}</Text></Body></Html>;
}
