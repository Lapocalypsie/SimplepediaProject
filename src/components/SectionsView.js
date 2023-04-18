/*
  SectionsView.js

  This module displays the sections and reports when a user clicks on one.

  props:
    sections - an array of section names
    selectSection - a callback that expects a section as an argument

*/
import styles from "../styles/SectionsView.module.css";
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function SectionsView({
  sections,
  selectSection,
  currentSection,
}) {
  const copySections = [...sections].sort();

  const handleChange = (event, newSection) => {
    selectSection(newSection);
  };

  return (
    <div className={styles.sectionList}>
      <ToggleButtonGroup
        color="primary"
        exclusive
        onChange={handleChange}
        size="small"
        value={currentSection}
      >
        {copySections.map((section) => (
          <ToggleButton key={section} data-testid="section" value={section}>
            {section}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

SectionsView.propTypes = {
  sections: PropTypes.arrayOf(Object).isRequired,
  selectSection: PropTypes.func.isRequired,
  currentSection: PropTypes.string,
};
