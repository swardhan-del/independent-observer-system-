export function energyScenario(workloads: number, kwPerWorkload: number, pue: number) {
  if (
    ![workloads, kwPerWorkload, pue].every(Number.isFinite) ||
    !Number.isSafeInteger(workloads) ||
    workloads < 1 ||
    workloads > 1e9 ||
    kwPerWorkload <= 0 ||
    kwPerWorkload > 1e9 ||
    pue < 1 ||
    pue > 10
  )
    return null;
  const itMW = (workloads * kwPerWorkload) / 1000;
  return { itMW, facilityMWh: itMW * pue * 8760 };
}
