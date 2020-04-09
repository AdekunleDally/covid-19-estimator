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
  const elapsedTime = data.timeToElapse;
  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 1024;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 1024;
  if (data.period === 'days') {
    severeImpact.infecPerDay = severeImpact.currentlyInfected * 2 ** (elapsedTime);
    impact.infecPerDay = impact.currentlyInfected * 2 ** (elapsedTime);
    return (impact.infecPerDay, severeImpact.infecPerDay);
  } if (data.period === 'weeks') {
    severeImpact.infecPerWeek = severeImpact.infecPerDay * 7;
    impact.infecPerWeek = impact.infecPerDay * 7;
    return (impact.infecPerWeek, severeImpact.infecPerWeek);
  }
  return {
    data: input,
    impact: {
      currentlyInfected: impact.currentlyInfected,
      infectionsByRequestedTime: impact.infectionsByRequestedTime,
      infecPerDay: impact.infecPerDay,
      infecPerWeek: impact.infecPerWeek
    },
    severeImpact: {
      currentlyInfected: severeImpact.currentlyInfected,
      infectionsByRequestedTime: severeImpact.infectionsByRequestedTime,
      infecPerDay: severeImpact.infecPerDay,
      infecPerWeek: severeImpact.infecPerWeek
    }
  };
};
covid19ImpactEstimator(data);
export default covid19ImpactEstimator;
