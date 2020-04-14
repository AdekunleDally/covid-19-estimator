const form = document.querySelector('.covid-estimate-form');
const population = document.querySelector('#data-population');
const timeToElapse = document.querySelector('#data-time-to-elapse');
const reportedCases = document.querySelector('#data-reported-cases');
const totalHospitalBeds = document.querySelector('#data-total-hospital-beds');
const periodType = document.querySelector('#data-period-type');
// const button = document.querySelector('#data-go-estimate');
/* population.value, timeToElapse.value, reportedCases.value,
    totalHospitalBeds.value periodType.value */
/* console.log(population.value, timeToElapse.value, reportedCases.value,
   totalHospitalBeds.value)
*/
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
const covid19ImpactEstimator = () => {
  // Normalise the time in days, weeks and months
  // eslint-disable-next-line no-shadow
  const normalisedPeriod = (data) => {
    const period = data.periodType; // result[4]
    const timeElapsed = data.timeToElapse; // result[1]
    const elapsedTime = timeElapsed.toString().toLowerCase();// result[1]
    switch (period) {
      case 'days':
        return elapsedTime;
      case 'weeks':
        return elapsedTime * 7;
      case 'months':
        return elapsedTime * 30;
      default:
        break;
    }
    return data;
  };
  // Challenge One:
  const input = data;
  const period = normalisedPeriod(input);
  const infectedOne = input.reportedCases * 10; // reportedCases= result[2]
  const infectedTwo = input.reportedCases * 50; // reportedCases= result[2]
  const infectedBytimeOne = infectedOne * (2 ** Math.trunc(period / 3));
  const infectedBytimeTwo = infectedTwo * (2 ** Math.trunc(period / 3));

  // Challenge Two:
  const severeInfectionsBytimeOne = 0.15 * infectedBytimeOne;
  const severeInfectionsBytimeTwo = 0.15 * infectedBytimeTwo;
  const availableBedsOne = Math.trunc((input.totalHospitalBeds * 0.35) - severeInfectionsBytimeOne);
  const availableBedsTwo = Math.trunc((input.totalHospitalBeds * 0.35) - severeInfectionsBytimeTwo);
  // Challenge Three:
  // impact on ICUs
  const requireICUone = Math.trunc(0.05 * infectedBytimeOne);
  const requireICUtwo = Math.trunc(0.05 * infectedBytimeTwo);
  // Impact on Ventilators
  const requireVentilatorOne = Math.trunc(infectedBytimeOne * 0.02);
  const requireVentilatorTwo = Math.trunc(infectedBytimeTwo * 0.02);
  // Impact on the Economy
  // eslint-disable-next-line max-len
  const dollarsLostOne = Math.trunc((infectedBytimeOne * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD) / period);
  // eslint-disable-next-line max-len
  const dollarsLostTwo = Math.trunc((infectedBytimeTwo * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD) / period);

  const impact = {
    currentlyInfected: infectedOne,
    infectionsByRequestedTime: infectedBytimeOne,
    severeCasesByRequestedTime: severeInfectionsBytimeOne,
    hospitalBedsByRequestedTime: availableBedsOne,
    casesForICUByRequestedTime: requireICUone,
    casesForVentilatorsByRequestedTime: requireVentilatorOne,
    dollarsInFlight: dollarsLostOne
  };
  const severeImpact = {
    currentlyInfected: infectedTwo,
    infectionsByRequestedTime: infectedBytimeTwo,
    severeCasesByRequestedTime: severeInfectionsBytimeTwo,
    hospitalBedsByRequestedTime: availableBedsTwo,
    casesForICUByRequestedTime: requireICUtwo,
    casesForVentilatorsByRequestedTime: requireVentilatorTwo,
    dollarsInFlight: dollarsLostTwo
  };
  console.log(data, impact, severeImpact);
  return {
    data: input,
    impact,
    severeImpact
  };
};
covid19ImpactEstimator(data);
// export default covid19ImpactEstimator;
