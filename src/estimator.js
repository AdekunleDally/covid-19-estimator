const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
// eslint-disable-next-line no-shadow
const covid19ImpactEstimator = (data) => {
  const input = data;
  const elapsedTime = data.timeToElapse;
  let elapse;
  const impactCurrentlyInfected = input.reportedCases * 10;
  const severeImpactCurrentlyInfected = input.reportedCases * 50;
  // impact.infectionsByRequestedTime = impact.currentlyInfected * 1024;
  // severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 1024;
  switch (data.periodType) {
    case 'months':
      elapse = Math.trunc((elapsedTime / 3) * 30);
      break;
    case 'weeks':
      elapse = Math.trunc((elapsedTime / 3) * 7);
      break;
    default:
      elapse = Math.trunc(elapsedTime / 3);
      break;
  }
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** elapse);
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * (2 ** elapse);
  const severeInfectionsByTimeOne = 0.15 * impactInfectionsByRequestedTime;
  const severeInfectionsByTimeTwo = 0.15 * severeImpactInfectionsByRequestedTime;
  const hospitalBedsByA = Math.trunc((data.totalHospitalBeds * 0.35) - severeInfectionsByTimeOne);
  const hospitalBedsByB = Math.trunc((data.totalHospitalBeds * 0.35) - severeInfectionsByTimeTwo);
  return {
    data: input,
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestTime: severeInfectionsByTimeOne,
      hospitalBedsByRequestedTime: hospitalBedsByA
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestTime: severeInfectionsByTimeTwo,
      hospitalBedsByRequestedTime: hospitalBedsByB
    }
  };
};
covid19ImpactEstimator(data);
export default covid19ImpactEstimator;
