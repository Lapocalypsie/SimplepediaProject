/*
  IndexBar.js

  This component provides the section and title display that allows the user to 
  browse the available articles and select one for display. 

   props:
    collection - Array of articles in encyclopedia
    setCurrentArticle - Function to call set current article displayed
    currentArticle - The article to render
*/
import React, { useState, useEffect } from "react";
import SectionsView from "./SectionsView";
import TitlesView from "./TitlesView";
import ArticleShape from "./ArticleShape";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function IndexBar({
  collection,
  setCurrentArticle,
  currentArticle,
  children,
}) {
  const [selectedSection, setSelectedSection] = useState(null);
  const copyCollection = [...collection];

  function getFirstChar(stringc) {
    return stringc.charAt(0);
  }

  function filterArray(arr) {
    return arr.filter((stringc, index) => arr.indexOf(stringc) === index);
  }

  let firstLetter = copyCollection.map((article) =>
    getFirstChar(article.title)
  );

  firstLetter = filterArray(firstLetter);

  function changeSelectedSection(section) {
    setSelectedSection(section);
    setCurrentArticle(undefined);
  }

  useEffect(() => {
    if (currentArticle) {
      const compareletter = getFirstChar(currentArticle.title);
      if (compareletter !== selectedSection) {
        setSelectedSection(compareletter);
      }
    }
  }, [currentArticle, selectedSection]);

  {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <SectionsView
              sections={firstLetter}
              selectSection={changeSelectedSection}
              currentSection={selectedSection}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {selectedSection ? (
            <TitlesView
              articles={copyCollection.filter(
                (article) => article.title.charAt(0) === selectedSection
              )}
              setCurrentArticle={setCurrentArticle}
            />
          ) : (
            <p>Please select a section</p>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          {" "}
          {children}{" "}
        </Grid>
      </Grid>
    );
  }
}

IndexBar.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
  currentArticle: ArticleShape,
  children: PropTypes.node,
};
