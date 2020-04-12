const impact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
  severeCasesByRequestTime: 0,
  hospitalBedsByRequestedTime: 0,
  infecPerDay: 0,
  infecPerWeek: 0,
  infectedPeopleOver30Days: 0
};
const severeImpact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
  severeCasesByRequestTime: 0,
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
  let occupiedBedSpaces;
  let availableBedSpaces;
  let expectedBedAvailabilityImpact;
  let expectedBedAvailabilitySevereImp;
  let a;
  let b;
  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
  // impact.infectionsByRequestedTime = impact.currentlyInfected * 1024;
  // severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 1024;
  switch (data.periodType) {
    case 'months':
      elapse = Math.trunc((elapsedTime / 3) * 30);
      occupiedBedSpaces = 0.65 * data.totalHospitalBeds;
      availableBedSpaces = data.totalHospitalBeds - occupiedBedSpaces;
      expectedBedAvailabilityImpact = 0.35 * impact.severeCasesByRequestTime;
      expectedBedAvailabilitySevereImp = 0.35 * severeImpact.severeCasesByRequestTime;
      a = expectedBedAvailabilityImpact - availableBedSpaces;
      b = expectedBedAvailabilityImpact - availableBedSpaces;
      impact.hospitalBedsByRequestedTime = Math.trunc(a);
      severeImpact.hospitalBedsByRequestedTime = Math.trunc(b);
      break;
    case 'weeks':
      elapse = Math.trunc((elapsedTime / 3) * 7);
      occupiedBedSpaces = 0.65 * data.totalHospitalBeds;
      availableBedSpaces = data.totalHospitalBeds - occupiedBedSpaces;
      expectedBedAvailabilityImpact = 0.35 * impact.severeCasesByRequestTime;
      expectedBedAvailabilitySevereImp = 0.35 * severeImpact.severeCasesByRequestTime;
      a = expectedBedAvailabilityImpact - availableBedSpaces;
      b = expectedBedAvailabilityImpact - availableBedSpaces;
      impact.hospitalBedsByRequestedTime = Math.trunc(a);
      severeImpact.hospitalBedsByRequestedTime = Math.trunc(b);
      break;
    default:
      elapse = Math.trunc(elapsedTime / 3);
      occupiedBedSpaces = 0.65 * data.totalHospitalBeds;
      availableBedSpaces = data.totalHospitalBeds - occupiedBedSpaces;
      expectedBedAvailabilityImpact = 0.35 * impact.severeCasesByRequestTime;
      expectedBedAvailabilitySevereImp = 0.35 * severeImpact.severeCasesByRequestTime;
      a = expectedBedAvailabilityImpact - availableBedSpaces;
      b = expectedBedAvailabilityImpact - availableBedSpaces;
      impact.hospitalBedsByRequestedTime = Math.trunc(a);
      severeImpact.hospitalBedsByRequestedTime = Math.trunc(b);
      break;
  }
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** elapse);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** elapse);
  return {
    data: input,
    impact: {
      currentlyInfected: impact.currentlyInfected,
      infectionsByRequestedTime: impact.infectionsByRequestedTime,
      severeCasesByRequestTime: impact.severeCasesByRequestTime,
      hospitalBedsByRequestedTime: impact.hospitalBedsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: severeImpact.currentlyInfected,
      infectionsByRequestedTime: severeImpact.infectionsByRequestedTime,
      severeCasesByRequestTime: severeImpact.severeCasesByRequestTime,
      hospitalBedsByRequestedTime: severeImpact.hospitalBedsByRequestedTime
    }
  };
};
covid19ImpactEstimator(data);
export default covid19ImpactEstimator;
