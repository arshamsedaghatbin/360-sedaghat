import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/organization">
      Organization
    </MenuItem>
    <MenuItem icon="asterisk" to="/department">
      Department
    </MenuItem>
    <MenuItem icon="asterisk" to="/employee">
      Employee
    </MenuItem>
    <MenuItem icon="asterisk" to="/group">
      Group
    </MenuItem>
    <MenuItem icon="asterisk" to="/question-group">
      Question Group
    </MenuItem>
    <MenuItem icon="asterisk" to="/question">
      Question
    </MenuItem>
    <MenuItem icon="asterisk" to="/resulte-question">
      Resulte Question
    </MenuItem>
    <MenuItem icon="asterisk" to="/final-result">
      Final Result
    </MenuItem>
    <MenuItem icon="asterisk" to="/final-question-group-result">
      Final Question Group Result
    </MenuItem>
    <MenuItem icon="asterisk" to="/period">
      Period
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
