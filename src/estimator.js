const impact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
  severeCasesByRequestedTime: 0,
  hospitalBedsByRequestedTime: 0,
  infecPerDay: 0,
  infecPerWeek: 0,
  infectedPeopleOver30Days: 0
};
const severeImpact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
  severeCasesByRequestedTime: 0,
  hospitalBedsByRequestedTime: 0,
  infecPerDay: 0,
  infecPerWeek: 0,
  infectedPeopleOver30Days: 0
};
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
  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
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
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** elapse);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** elapse);
  const impactSevereCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  const severeImpactSevereCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;
  const a = Math.trunc(impactSevereCasesByRequestedTime - (data.totalHospitalBeds * 0.35));
  const hospitalBedsByRequestedTimeA = a;
  const b = Math.trunc(severeImpactSevereCasesByRequestedTime - (data.totalHospitalBeds * 0.35));
  const hospitalBedsByRequestedTimeB = b;
  return {
    data: input,
    impact: {
      currentlyInfected: impact.currentlyInfected,
      infectionsByRequestedTime: impact.infectionsByRequestedTime,
      severeCasesByRequestTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeA
    },
    severeImpact: {
      currentlyInfected: severeImpact.currentlyInfected,
      infectionsByRequestedTime: severeImpact.infectionsByRequestedTime,
      severeCasesByRequestTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeB
    }
  };
};
covid19ImpactEstimator(data);
export default covid19ImpactEstimator;
