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

export default function IndexBar({
  collection,
  setCurrentArticle,
  currentArticle,
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
      // eslint-disable-next-line no-shadow
      const firstLetter = getFirstChar(currentArticle.title);
      if (firstLetter !== selectedSection) {
        setSelectedSection(firstLetter);
      }
    }
  }, [currentArticle, selectedSection]);

  {
    return (
      <>
        <SectionsView
          sections={firstLetter}
          selectSection={changeSelectedSection}
        />
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
      </>
    );
  }
}

IndexBar.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
  currentArticle: ArticleShape,
};
