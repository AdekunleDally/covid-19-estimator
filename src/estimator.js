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
  if (data.period === 'weeks') {
    severeImpact.infecPerDay = elapsedTime * 7;
    impact.infecPerDay = elapsedTime * 7;
    return (impact.infecPerDay, severeImpact.infecPerDay);
  } /* else if (data.period === 'weeks') {
    const a = (severeImpact.currentlyInfected * 2 ** (Math.trunc(elapsedTime / 30)) * 7);
    severeImpact.infecPerWeek = a;
    impact.infecPerWeek = (impact.currentlyInfected * 2 ** (Math.trunc(elapsedTime / 30)) * 7);
    // return (impact.infecPerWeek, severeImpact.infecPerWeek);
  }
  */
  return {
    data: input,
    impact: {
      infecPerDay: impact.infecPerDay,
      infecPerWeek: impact.infecPerWeek,
      currentlyInfected: impact.currentlyInfected,
      infectionsByRequestedTime: impact.infectionsByRequestedTime
    },
    severeImpact: {
      infecPerDay: severeImpact.infecPerDay,
      infecPerWeek: severeImpact.infecPerWeek,
      currentlyInfected: severeImpact.currentlyInfected,
      infectionsByRequestedTime: severeImpact.infectionsByRequestedTime
    }
  };
};
covid19ImpactEstimator(data);
export default covid19ImpactEstimator;
