import printPricing from './printPriceTable.js';

export const calculateProfit = ({
  standardAds,
  halfAds,
  doubleAds,
  pricePerStandard,
  pricePerHalf,
  pricePerDouble,
  designCost,
  bundledCost,
  eddmVolume,
  eddmSize,
  deliveryOption
}) => {
  const revenue =
    (standardAds * pricePerStandard) +
    (halfAds * pricePerHalf) +
    (doubleAds * pricePerDouble);

  let printCost = 0;
  let postageCost = 0;
  let totalCost = 0;

  if (deliveryOption === 'bundled') {
    totalCost = bundledCost + designCost;
  } else {
    postageCost = eddmVolume * 0.247;

    const sizePricing = printPricing[eddmSize];
    printCost = sizePricing && sizePricing[eddmVolume] ? sizePricing[eddmVolume] : 0;

    totalCost = printCost + postageCost + designCost;
  }

  const profit = revenue - totalCost;
  const costPerUnit = eddmVolume > 0 ? revenue / eddmVolume : 0;

  return {
    totalRevenue: revenue,
    postageCost,
    printCost,
    totalCost,
    profit,
    costPerUnit
  };
};
