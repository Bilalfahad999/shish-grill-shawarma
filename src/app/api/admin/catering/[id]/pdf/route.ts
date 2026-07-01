import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/lib/auth";
import { getCateringRequest } from "@/lib/actions/catering";
import { CateringSummaryDocument } from "@/lib/pdf/CateringSummaryDocument";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const enquiry = await getCateringRequest(id);
  if (!enquiry) {
    return NextResponse.json({ error: "Catering request not found" }, { status: 404 });
  }

  const buffer = await renderToBuffer(CateringSummaryDocument({ enquiry }));

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="catering-${enquiry.id}.pdf"`,
    },
  });
}
