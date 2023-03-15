import PropTypes from "prop-types";
import IndexBar from "../../components/IndexBar";
import ArticleShape from "../../components/ArticleShape";

export default function Simplepedia({ collection, currentArticle, setCurrentArticle}) {
  return (
    <>
      <IndexBar collection={collection} />
      {currentArticle ? (
        <ArticleShape article = {currentArticle} setCurrentArticle = {setCurrentArticle} />
      ) : null 
    }
    </>
  );
}


Simplepedia.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  currentArticle: ArticleShape.isRequired,
  setCurrentArticle: PropTypes.func.isRequired
};