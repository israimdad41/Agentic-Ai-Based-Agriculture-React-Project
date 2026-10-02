import csvText from "../data/varieties.csv?raw";

export const varieties = csvText
  .trim()
  .split("\n")
  .slice(1)
  .map((row) => {
    const values = row.split(",");

    return {
      id: values[0],
      crop: values[1],
      variety: values[2],

      soilType: values[3],
      phMin: values[4],
      phMax: values[5],

      water: values[6],
      season: values[7],

      temperatureMin: values[8],
      temperatureMax: values[9],

      rainfallMin: values[10],
      rainfallMax: values[11],

      growingDays: values[12],
      region: values[13],
      yieldPotential: values[14],
    };
  });


// -------------------------------------
// Helper: check season
// -------------------------------------
function seasonScore(farmSeason, varietySeason) {
  if (!farmSeason || !varietySeason) return 0;

  return farmSeason.toLowerCase() === varietySeason.toLowerCase()
    ? 20
    : 0;
}


// -------------------------------------
// Helper: check water
// -------------------------------------
function waterScore(farmWater, varietyWater) {
  if (!farmWater || !varietyWater) return 0;

  const water = farmWater.toLowerCase();
  const requirement = varietyWater.toLowerCase();

  if (water === "high") {
    return 20;
  }

  if (water === "medium") {
    if (
      requirement.includes("5-6") ||
      requirement.includes("normal")
    ) {
      return 18;
    }

    return 15;
  }

  if (water === "low") {
    if (
      requirement.includes("4-5") ||
      requirement.includes("late")
    ) {
      return 12;
    }

    return 7;
  }

  return 0;
}


// -------------------------------------
// Helper: location score
// -------------------------------------
function locationScore(farmLocation, varietyRegion) {
  if (!farmLocation || !varietyRegion) return 0;

  const location = farmLocation.toLowerCase();
  const region = varietyRegion.toLowerCase();

  // All current varieties are documented for Sindh
  if (
    location.includes("sindh") &&
    region.includes("sindh")
  ) {
    return 10;
  }

  // Dubari-specific varieties
  if (
    location.includes("dubari") &&
    region.includes("dubari")
  ) {
    return 10;
  }

  // Sindh city/district entered by farmer
  const sindhLocations = [
    "nawabshah",
    "sakrand",
    "matiari",
    "tando jam",
    "qazi ahmed",
    "shahdadpur",
    "hyderabad",
    "karachi",
    "sukkur",
    "larkana",
    "mirpurkhas",
    "sanghar",
    "dadu",
    "naushahro feroze",
    "khairpur",
    "thatta",
    "badin",
    "jamshoro",
    "sindh",
  ];

  if (
    sindhLocations.some((place) =>
      location.includes(place)
    ) &&
    region.includes("sindh")
  ) {
    return 10;
  }

  return 3;
}


// -------------------------------------
// Helper: yield score
// -------------------------------------
function yieldScore(yieldValue, maxYield, minYield) {
  const yieldNumber = Number(yieldValue) || 0;

  if (maxYield === minYield) {
    return 15;
  }

  return (
    ((yieldNumber - minYield) /
      (maxYield - minYield)) *
    15
  );
}


// -------------------------------------
// Helper: growing duration
// -------------------------------------
function maturityScore(growingDays) {
  const days = Number(growingDays) || 0;

  if (!days) return 0;

  // Moderate growing duration gets a reasonable score
  if (days <= 120) {
    return 10;
  }

  if (days <= 125) {
    return 8;
  }

  if (days <= 130) {
    return 7;
  }

  return 5;
}


// -------------------------------------
// MAIN SMART RECOMMENDATION ENGINE
// -------------------------------------
export function getRankedVarieties(farmData) {

  const maxYield = Math.max(
    ...varieties.map(
      (v) => Number(v.yieldPotential) || 0
    )
  );

  const minYield = Math.min(
    ...varieties.map(
      (v) => Number(v.yieldPotential) || 0
    )
  );


  const scoredVarieties = varieties.map((variety) => {

    let score = 0;


    // 1. Season — 20 points
    score += seasonScore(
      farmData?.season,
      variety.season
    );


    // 2. Water — 20 points
    score += waterScore(
      farmData?.water,
      variety.water
    );


    // 3. Location — 10 points
    score += locationScore(
      farmData?.location,
      variety.region
    );


    // 4. Yield potential — 15 points
    score += yieldScore(
      variety.yieldPotential,
      maxYield,
      minYield
    );


    // 5. Growing duration — 10 points
    score += maturityScore(
      variety.growingDays
    );


    // ---------------------------------
    // Soil / pH / temperature / rainfall
    // ---------------------------------
    // These fields exist in the farmer form,
    // but variety-specific values are currently
    // missing from the CSV.
    //
    // Therefore we DO NOT invent scientific
    // values for these factors.
    // ---------------------------------


    // Base data completeness / confidence
    score += 25;


    return {
      ...variety,
      score: Math.round(
        Math.min(score, 100)
      ),
    };
  });


  return scoredVarieties.sort(
    (a, b) => b.score - a.score
  );
}


// -------------------------------------
// BEST VARIETY
// -------------------------------------
export function getBestVariety(farmData) {
  return getRankedVarieties(farmData)[0];
}