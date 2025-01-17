// Copyright (c) 2014 - 2023 UNICEF. All rights reserved.

import PropTypes from "prop-types";
import { forwardRef } from "react";

import MenuItem from "../menu-item";

const Component = forwardRef(({ actions = [], disabledCondition = () => {}, handleClose }, ref) => (
  <div>
    {actions.map(action => (
      <MenuItem
        key={action.name}
        action={action}
        disabledCondition={disabledCondition}
        handleClose={handleClose}
        ref={ref}
      />
    ))}
  </div>
));

Component.displayName = "MenuItems";

Component.propTypes = {
  actions: PropTypes.array,
  disabledCondition: PropTypes.func,
  handleClose: PropTypes.func.isRequired
};

export default Component;
