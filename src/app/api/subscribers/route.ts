import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSubscribers, addSubscriber, deleteSubscriber } from "@/lib/store";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getSubscribers());
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Harus login dengan Google" }, { status: 401 });
  }

  const email = session.user.email;
  const name = session.user.name ?? null;

  const result = addSubscriber({
    email,
    name,
    subscribedAt: new Date().toISOString(),
  });

  return NextResponse.json({ status: result });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  const adminEmails = ["tokorowear@gmail.com", "sjhosua19@gmail.com"];
  if (!adminEmails.includes(session?.user?.email ?? "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { email } = await req.json();
  const ok = deleteSubscriber(email);
  return NextResponse.json({ ok });
}
