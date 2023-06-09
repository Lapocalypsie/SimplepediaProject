import { useRouter } from "next/router";
import Editor from "../../../components/Editor";
import ArticleShape from "../../../components/ArticleShape";
import styles from "../../../styles/Editor.module.css";
import PropTypes from "prop-types";

export default function SimplepediaEditor({
  collection,
  setCollection,
  setCurrentArticle,
  currentArticle,
}) {
  const router = useRouter();

  const complete = (newArticle) => {
    if (newArticle) {
      const newCollection = collection.map((article) => {
        if (article.id === currentArticle.id) {
          return newArticle;
        } else {
          return article;
        }
      });
      // Add new article to collection
      setCollection(newCollection);
      // Set the current article to the newly created one
      setCurrentArticle(newArticle);
      router.push(`/articles/${newArticle.id}`);
    } else {
      // User canceled, go back to previous page
      router.back();
    }
  };

  return (
    <div className={styles.Editor}>
      <Editor article={currentArticle} complete={complete} />
    </div>
  );
}

SimplepediaEditor.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCollection: PropTypes.func.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
  currentArticle: ArticleShape,
};
