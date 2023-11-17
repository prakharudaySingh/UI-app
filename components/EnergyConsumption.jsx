import React, { useEffect } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime } from "../utils/reading";
import * as chartJs from "chart.js";
export const EnergyConsumption = ({ readings }) => {
  const containerId = "usageChart";
  useEffect(() => {
    renderChart(containerId, sortByTime(groupByDay(readings)).slice(-30));
  }, []);


  const renderCost=(readings) =>{
    chartJs.Chart.register.apply(
      null,
      Object.values(chartJs).filter((chartClass) => chartClass.id)
    );
    const values = readings.map(({ value }) => value);
    const sumOfArray = values.reduce((sum, element) =>sum + element );
    return sumOfArray;
  }

  useEffect(()=>{
    renderCost(readings.slice(-30));
  })


  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
      <section className="mb3">
        <button
          className="
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              bg-blue
              white
              bold
            "
        >
          Last 30 days
        </button>
      </section>
      <section className="chartHeight mb3">
        <canvas id={containerId} />
      </section>
      <section className="chartHeight mb3">
        <div className='cost-section shadow-2'> content</div>
        <div className='consumption-section shadow-2'>content</div>
        <div className='footprint-section shadow-2'>content</div>
      </section>
    </>
  );
};
