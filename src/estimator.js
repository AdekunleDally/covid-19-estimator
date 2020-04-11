const impact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
  infecPerDay: 0,
  infecPerWeek: 0,
  infectedPeopleOver30Days: 0
};
const severeImpact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
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
  // const elapsedTime = data.timeToElapse;
  let elapsedTime = data.timeToElapse;
  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 1024;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 1024;
  switch (data.periodType) {
    case 'months':
      elapsedTime = Math.trunc(elapsedTime / 3) * 30;
      break;
    case 'weeks':
      elapsedTime = Math.trunc(elapsedTime / 3) * 7;
      break;
    default:
      elapsedTime = Math.trunc(elapsedTime / 3);
      break;
  }
  if (data.periodType === 'days') {
    severeImpact.infecPerDay = elapsedTime / 30;
    impact.infecPerDay = elapsedTime / 30;
    return (impact.infecPerDay, severeImpact.infecPerDay);
  }
  return {
    data: input,
    impact: {
      currentlyInfected: impact.currentlyInfected,
      infectionsByRequestedTime: impact.infectionsByRequestedTime,
      infecPerDay: impact.infecPerDay,
      infecPerWeek: impact.infecPerWeek,
      infecPerMonth: impact.infecPerMonth
    },
    severeImpact: {
      currentlyInfected: severeImpact.currentlyInfected,
      infectionsByRequestedTime: severeImpact.infectionsByRequestedTime,
      infecPerDay: severeImpact.infecPerDay,
      infecPerWeek: severeImpact.infecPerWeek,
      infecPerMonth: severeImpact.infecPerMonth
    }
  };
};
covid19ImpactEstimator(data);
export default covid19ImpactEstimator;
