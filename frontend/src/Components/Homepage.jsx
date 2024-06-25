import React, { useEffect, useState } from "react";
import { getWords, addWord } from "../services/apiServices";
import { WORDS_PAGE_SIZE } from "../constants";
import WordCard from "./WordCard";
import styles from "../Styles/Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from '@mui/material/Skeleton';
import AddWord from "./AddWord";

const Homepage = () => {
  const [currPage, setcurrPage] = useState(0);
  const [words, setWords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  useEffect(() => {
    if(!currPage) {
      fetchWords(true);
    }
  }, [currPage]);

  const fetchWords = (loader = false) => {
    getWords(currPage + 1, WORDS_PAGE_SIZE, loader).then((res) => {
      res = res.data;
      const newWords = res.data || [];
      const paginationInfo = res?.paginationInfo;
      setWords([...words, ...newWords]);
      setcurrPage(paginationInfo.pageNo);
      setTotalRecords(paginationInfo.totalRecords);
    });
  };

  const onAddWordClick = (wordData) => {
    addWord({name: wordData}).then((res) => {
      setcurrPage(0);
      setWords([]);
      setTotalRecords(0);
    })
  }

  return (
    <>
    <div className={styles.scrollContainer} id="infiniteScrollCont">
      <InfiniteScroll
        dataLength={words.length}
        next={fetchWords}
        hasMore={currPage * WORDS_PAGE_SIZE < totalRecords}
        loader={
          <div>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        style={{
          padding: "10px"
        }}
        scrollableTarget = "infiniteScrollCont"
        scrollThreshold={"200px"}
      >
        <div className={styles.cardContainer}>
          {words.length ? (
            words.map((word) => <WordCard data={word} />)
          ) : (
            <div>No Words Added yet</div>
          )}
        </div>
      </InfiniteScroll>
      <AddWord onAddWordClick={onAddWordClick}/>
    </div>
    </>
  );
};

export default Homepage;
