import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { cx } from "@emotion/css";

import ActionButton from "../../action-button";
import { useApp } from "../../application";
import { useI18n } from "../../i18n";
import { buildFilter, buildItemLabel } from "../utils";
import { ROUTES } from "../../../config";
import dashboardsCss from "../styles.css";

import css from "./styles.css";

function IndicatorItem({ item, query, count, countClasses, labelClasses }) {
  const i18n = useI18n();
  const { approvalsLabels } = useApp();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(push({ pathname: ROUTES.cases, search: buildFilter(query) }));
  };

  const defaultLabel = i18n.t(`dashboard.${item}`);

  const itemLabel = buildItemLabel(item, approvalsLabels, defaultLabel);

  const numberClasses = countClasses || cx({ [dashboardsCss.zero]: !count, [css.itemButtonNumber]: true });
  const textClasses = labelClasses || cx({ [dashboardsCss.zero]: !count, [css.itemButton]: true });

  return (
    <>
      <ActionButton
        id={`overview-${item}-number`}
        className={numberClasses}
        type="link"
        text={count}
        onClick={handleClick}
        noTranslate
      />
      <ActionButton
        id={`overview-${item}-text`}
        className={textClasses}
        type="link"
        text={itemLabel}
        onClick={handleClick}
        noTranslate
      />
    </>
  );
}

IndicatorItem.displayName = "IndicatorItem";

IndicatorItem.propTypes = {
  count: PropTypes.number,
  countClasses: PropTypes.object,
  item: PropTypes.object,
  labelClasses: PropTypes.object,
  query: PropTypes.object
};

export default IndicatorItem;
