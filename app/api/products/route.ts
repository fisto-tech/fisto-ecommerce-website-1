import { NextResponse } from "next/server";
import { mockProducts } from "../../../mock/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();
  const category = searchParams.get("category")?.toLowerCase();

  let products = [...mockProducts];

  if (search) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  if (category && category !== "all") {
    products = products.filter((p) => p.categorySlug.toLowerCase() === category);
  }

  return NextResponse.json(products);
}
