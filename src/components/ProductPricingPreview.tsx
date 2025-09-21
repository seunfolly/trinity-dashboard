"use client";
import { Tag, Percent } from "lucide-react";
import { SectionCard } from "./UISharedComponent";
import { Product } from "@/app/hooks/useAnalytics";

interface ProductPricingPreviewProps {
  products: Product[];
  mcdMultiplier: number;
  sampleRcdDiscount: number;
}

const ProductPricingPreview = ({
  products,
  mcdMultiplier,
  sampleRcdDiscount,
}: ProductPricingPreviewProps) => {
  const isPriceIncreased = mcdMultiplier > 1.0;
  const isDiscountApplied = sampleRcdDiscount > 0;

  return (
    <SectionCard
      title="Dynamic Product Pricing Preview"
      description="See how MCD and a sample RCD affect your product prices in real-time."
    >
      {/* Summary Bar */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-medium text-slate-600">MCD Multiplier:</span>
          <span
            className={`font-bold text-lg flex items-center gap-1 ${
              isPriceIncreased ? "text-blue-600" : "text-slate-800"
            }`}
          >
            {mcdMultiplier.toFixed(4)}x
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-medium text-slate-600">Sample RCD:</span>
          <span
            className={`font-bold text-lg flex items-center gap-1 ${
              isDiscountApplied ? "text-green-600" : "text-slate-800"
            }`}
          >
            {sampleRcdDiscount.toFixed(2)}
            <Percent className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 text-sm font-semibold text-slate-500 uppercase">
          <span className="col-span-1">Product</span>
          <span className="col-span-1 text-center">Base Price</span>
          <span className="col-span-1 text-center">MCD Price</span>
          <span className="col-span-1 text-center text-green-600">
            RCD Price
          </span>
        </div>

        {products.map((product) => {
          const mcdPrice = product.finalPrice || product.basePrice;
          const rcdPrice = mcdPrice * (1 - sampleRcdDiscount / 100);

          return (
            <div
              key={product.id}
              className="grid grid-cols-4 gap-4 items-center p-4 border rounded-lg border-slate-100 hover:bg-slate-50"
            >
              <div className="col-span-1 flex items-center">
                <Tag className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                <span className="font-medium text-slate-800">
                  {product.name}
                </span>
              </div>

              <div className="col-span-1 text-center">
                <span className="font-mono text-slate-500">
                  ${product.basePrice.toFixed(2)}
                </span>
              </div>

              <div className="col-span-1 text-center">
                <span
                  className={`font-mono font-semibold ${
                    isPriceIncreased ? "text-blue-600" : "text-slate-800"
                  }`}
                >
                  ${mcdPrice.toFixed(2)}
                </span>
              </div>

              {/* RCD Price */}
              <div className="col-span-1 text-center bg-green-50 p-2 rounded-md">
                <span className="font-mono font-bold text-green-700 flex items-center justify-center gap-1">
                  ${rcdPrice.toFixed(2)}
                  <Percent className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};

export default ProductPricingPreview;
