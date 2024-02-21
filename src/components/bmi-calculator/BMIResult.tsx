import classNames from "classnames";
import { useContext, useMemo } from "react";
import GaugeChart from "react-gauge-chart";
import { Elements } from "react-profile-component";
import { AppContext } from "../../store/app/context";
import { findAndReplace } from "../../common/Utils";
import { IBMIRange, IWeightSuggestConfig } from "../../store/common/types";
import { getBMIRangePercentForGauge } from "../../pages/bmi-calculator/Utils";
import { BMIChart, BMIRangeInfo } from "../../pages/bmi-calculator/Elements";

const { FlexBox } = Elements;

interface IBMIResultProps {
  weightSuggestConfig: IWeightSuggestConfig;
  isValidBMI: boolean;
  currentBMIRange: IBMIRange;
  bmi: number;
}
const BMIResult = (props: IBMIResultProps) => {
  const { weightSuggestConfig, isValidBMI, currentBMIRange, bmi } = props;
  const {
    data: {
      bmiCalculatorForm: { label, bmiRanges },
      currentDevice: { isMobile },
    },
  } = useContext(AppContext);

  const formattedWeightSuggestLabel = useMemo(() => {
    const { weightDirection, diffToIdealWeight } = weightSuggestConfig;
    if (isValidBMI) {
      return weightDirection === label.ideal
        ? label.healthyBMI
        : findAndReplace(label.weightSuggest, [
            weightDirection,
            Math.abs(diffToIdealWeight),
          ]);
    } else {
      return "";
    }
  }, [
    isValidBMI,
    label.healthyBMI,
    label.ideal,
    label.weightSuggest,
    weightSuggestConfig,
  ]);

  const formattedIdealWeightRange = useMemo(() => {
    const { min, max } = weightSuggestConfig.idealWeightRanges;
    return isValidBMI ? findAndReplace(label.idealWeightRange, [min, max]) : "";
  }, [
    isValidBMI,
    label.idealWeightRange,
    weightSuggestConfig.idealWeightRanges,
  ]);

  const bmiRangePercent = useMemo(
    () =>
      currentBMIRange ? getBMIRangePercentForGauge(currentBMIRange, bmi) : 0,
    [currentBMIRange, bmi]
  );

  return (
    <>
      <p
        className={classNames(
          "weight-suggestion",
          weightSuggestConfig.weightDirection
        )}
        dangerouslySetInnerHTML={{
          __html: formattedWeightSuggestLabel,
        }}
      />
      <p
        className="ideal-weight-range"
        dangerouslySetInnerHTML={{
          __html: formattedIdealWeightRange,
        }}
      />
      <FlexBox
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        className="bmi-result-wrap"
      >
        <GaugeChart
          id="gauge-chart5"
          nrOfLevels={100}
          arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
          colors={["#3498db", "#3f9c35", "#ffba00", "#ee4b2b", "#ff0000"]}
          percent={bmiRangePercent}
          arcWidth={0.3}
          textColor="#000"
          needleColor="rgba(128,128,128,0.4)"
          needleBaseColor="#ccc"
          animDelay={0}
          formatTextValue={() => `${bmi}`}
          arcPadding={0}
          cornerRadius={0}
          className="range-gauge"
          style={{ maxHeight: "250px", maxWidth: "500px" }}
        />

        <BMIChart gridTemplateRows="1fr 1fr 1fr">
          {bmiRanges.map((item) => {
            const { min, max, label, color, id } = item;
            return (
              <BMIRangeInfo
                key={id}
                colorCode={color}
                gridTemplateColumns="0.7fr 1fr 2fr"
                justifyItems="center"
                className={classNames({
                  "is-current-bmi-range": id === currentBMIRange.id,
                })}
              >
                <span className="color" />
                <span className="range">
                  {min && max && (
                    <>
                      {min} - {max}
                    </>
                  )}
                  {min && !max && <>&#8805; {min}</>}
                  {!min && max && <>&#8804; {max}</>}
                </span>
                <label>{label}</label>
              </BMIRangeInfo>
            );
          })}
        </BMIChart>
      </FlexBox>
    </>
  );
};

export default BMIResult;
