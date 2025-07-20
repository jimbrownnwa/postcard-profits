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

  const costPerUnit = {
    standard: eddmVolume > 0 ? pricePerStandard / eddmVolume : 0,
    half: eddmVolume > 0 ? pricePerHalf / eddmVolume : 0,
    double: eddmVolume > 0 ? pricePerDouble / eddmVolume : 0
  };

  const breakEvenPrice = standardAds > 0 ? totalCost / standardAds : null;


  return {
    totalRevenue: revenue,
    postageCost,
    printCost,
    totalCost,
    profit,
    costPerUnit,
    breakEvenPrice
  };
};
